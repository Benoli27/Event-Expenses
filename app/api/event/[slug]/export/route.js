import { ZipArchive } from 'archiver';
import ExcelJS from 'exceljs';
import { createServerClient } from '@/lib/supabase/server';

function safeSegment(s) {
  return (s || '').replace(/[^a-zA-Z0-9.\-_ ]/g, '_').trim() || 'unnamed';
}

export async function GET(request, { params }) {
  const { slug } = await params;
  const supabase = createServerClient();

  const { data: event } = await supabase.from('events').select('*').eq('slug', slug).single();
  if (!event) {
    return new Response('Event not found', { status: 404 });
  }

  const { data: receipts } = await supabase
    .from('receipts')
    .select('*, profiles(name), receipt_files(*)')
    .eq('event_id', event.id)
    .order('created_at', { ascending: true });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Receipts');
  sheet.columns = [
    { key: 'name', width: 24 },
    { key: 'description', width: 50 },
    { key: 'comment', width: 50 },
    { key: 'amount', width: 14, style: { numFmt: '£#,##0.00' } },
    { key: 'paid', width: 10 },
    { key: 'files', width: 50 },
  ];

  sheet.mergeCells('A1:F1');
  const titleCell = sheet.getCell('A1');
  titleCell.value = event.name;
  titleCell.font = { bold: true, size: 18, color: { argb: 'FF7413DC' } };
  titleCell.alignment = { vertical: 'middle' };
  sheet.getRow(1).height = 28;

  const headerRow = sheet.getRow(2);
  headerRow.values = ['Submitted by', 'Receipt Description', 'Comment', 'Amount (£)', 'Paid', 'Files (in zip)'];
  headerRow.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF7413DC' } };
    cell.alignment = { vertical: 'middle' };
  });
  headerRow.height = 20;
  sheet.views = [{ state: 'frozen', ySplit: 2 }];

  const zipEntries = [];

  const groups = new Map();
  (receipts || []).forEach((r) => {
    const key = r.profile_id || 'unknown';
    if (!groups.has(key)) {
      groups.set(key, { name: r.profiles?.name || 'Unknown', receipts: [] });
    }
    groups.get(key).receipts.push(r);
  });
  const sortedGroups = Array.from(groups.values()).sort((a, b) => a.name.localeCompare(b.name));

  let fileCounter = 0;

  sortedGroups.forEach((group) => {
    group.receipts.forEach((r) => {
      fileCounter += 1;
      const folder = `files/${fileCounter}-${safeSegment(group.name)}`;
      const fileNames = (r.receipt_files || []).map((f) => f.original_filename || 'file');

      const row = sheet.addRow({
        name: group.name,
        description: r.description,
        comment: r.comment,
        amount: Number(r.amount),
        paid: r.paid ? 'Paid' : '',
        files: fileNames.join(', '),
      });
      row.eachCell((cell) => {
        cell.border = { bottom: { style: 'thin', color: { argb: 'FFE3D0F8' } } };
      });

      (r.receipt_files || []).forEach((f) => {
        zipEntries.push({ path: `${folder}/${f.original_filename || 'file'}`, storagePath: f.storage_path });
      });
    });

    const subtotal = group.receipts.reduce((sum, r) => sum + Number(r.amount), 0);
    const subtotalRow = sheet.addRow({
      name: group.name,
      description: 'Subtotal',
      comment: '',
      amount: subtotal,
      paid: '',
      files: '',
    });
    subtotalRow.eachCell({ includeEmpty: true }, (cell) => {
      cell.font = { bold: true };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEBECEE' } };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFD5D7DB' } },
        bottom: { style: 'thin', color: { argb: 'FFD5D7DB' } },
      };
    });

    sheet.addRow({}).height = 8;
  });

  const totalRow = sheet.addRow({ name: '', description: '', comment: '', amount: '', paid: '', files: '' });
  totalRow.height = 4;

  const summaryRow = sheet.addRow({
    name: '',
    description: 'Total',
    comment: '',
    amount: (receipts || []).reduce((sum, r) => sum + Number(r.amount), 0),
    paid: '',
    files: '',
  });
  summaryRow.eachCell({ includeEmpty: true }, (cell) => {
    cell.font = { bold: true };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD5D7DB' } };
    cell.border = { top: { style: 'thin', color: { argb: 'FF7413DC' } } };
  });

  const xlsxBuffer = await workbook.xlsx.writeBuffer();

  const archive = new ZipArchive({ zlib: { level: 9 } });
  const chunks = [];
  archive.on('data', (chunk) => chunks.push(chunk));
  const archiveDone = new Promise((resolve, reject) => {
    archive.on('end', resolve);
    archive.on('error', reject);
  });

  archive.append(Buffer.from(xlsxBuffer), { name: `${slug}-receipts.xlsx` });

  for (const entry of zipEntries) {
    const { data, error } = await supabase.storage.from('receipts').download(entry.storagePath);
    if (!error && data) {
      const arrayBuffer = await data.arrayBuffer();
      archive.append(Buffer.from(arrayBuffer), { name: entry.path });
    }
  }

  archive.finalize();
  await archiveDone;

  const zipBuffer = Buffer.concat(chunks);

  return new Response(zipBuffer, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${slug}-receipts.zip"`,
    },
  });
}
