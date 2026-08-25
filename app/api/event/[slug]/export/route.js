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
    { header: 'Submitted by', key: 'name', width: 24 },
    { header: 'Comment', key: 'comment', width: 50 },
    { header: 'Amount (£)', key: 'amount', width: 14 },
    { header: 'Date', key: 'date', width: 14 },
    { header: 'Files (in zip)', key: 'files', width: 50 },
  ];
  sheet.getRow(1).font = { bold: true };

  const zipEntries = [];

  (receipts || []).forEach((r, i) => {
    const submitterName = r.profiles?.name || 'Unknown';
    const folder = `files/${i + 1}-${safeSegment(submitterName)}`;
    const fileNames = (r.receipt_files || []).map((f) => f.original_filename || 'file');

    sheet.addRow({
      name: submitterName,
      comment: r.comment,
      amount: Number(r.amount),
      date: new Date(r.created_at).toLocaleDateString('en-GB'),
      files: fileNames.map((n) => `${folder}/${n}`).join(', '),
    });

    (r.receipt_files || []).forEach((f) => {
      zipEntries.push({ path: `${folder}/${f.original_filename || 'file'}`, storagePath: f.storage_path });
    });
  });

  const totalRow = sheet.addRow({ name: '', comment: '', amount: '', date: '', files: '' });
  sheet.addRow({
    name: '',
    comment: 'Total',
    amount: (receipts || []).reduce((sum, r) => sum + Number(r.amount), 0),
  }).font = { bold: true };
  totalRow.height = 4;

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
