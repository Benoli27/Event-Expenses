import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { GroupLogo } from '@/design-system/components/brand/GroupLogo.jsx';
import { Card } from '@/design-system/components/core/Card.jsx';
import { Link } from '@/design-system/components/core/Link.jsx';
import { ReceiptForm } from './ReceiptForm';
import { ReceiptCard } from './ReceiptCard';

export default async function EventPage({ params }) {
  const { slug } = await params;
  const supabase = createServerClient();

  const { data: event } = await supabase.from('events').select('*').eq('slug', slug).single();
  if (!event) notFound();

  const { data: receipts } = await supabase
    .from('receipts')
    .select('*, receipt_files(*)')
    .eq('event_id', event.id)
    .order('created_at', { ascending: false });

  const receiptsWithUrls = (receipts || []).map((r) => ({
    ...r,
    receipt_files: (r.receipt_files || []).map((f) => ({
      ...f,
      publicUrl: supabase.storage.from('receipts').getPublicUrl(f.storage_path).data.publicUrl,
    })),
  }));

  const total = receiptsWithUrls.reduce((sum, r) => sum + Number(r.amount), 0);

  return (
    <main
      style={{
        maxWidth: 'var(--container-narrow)',
        margin: '0 auto',
        padding: 'var(--space-6) var(--page-pad)',
      }}
    >
      <GroupLogo tone="purple" height={56} src="/logo/8th-sutton-purple.png" />
      <h1
        style={{
          fontSize: 'var(--text-h1)',
          fontWeight: 'var(--weight-black)',
          lineHeight: 'var(--leading-tight)',
          marginTop: 'var(--space-5)',
          marginBottom: 'var(--space-4)',
        }}
      >
        {event.name}
      </h1>

      <Card tone="purple" padding={20} style={{ marginBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <div>
            <div style={{ fontSize: 'var(--text-caption)', fontWeight: 'var(--weight-black)', letterSpacing: 'var(--tracking-wide)', opacity: 0.85 }}>
              CLAIMED SO FAR
            </div>
            <div style={{ fontSize: 'var(--text-h1)', fontWeight: 'var(--weight-black)' }}>£{total.toFixed(2)}</div>
          </div>
          <div style={{ fontWeight: 'var(--weight-regular)' }}>
            {receiptsWithUrls.length} receipt{receiptsWithUrls.length === 1 ? '' : 's'}
          </div>
        </div>
      </Card>

      <div style={{ marginBottom: 'var(--space-6)' }}>
        <Link href={`/api/event/${slug}/export`} bold>
          Download all receipts (zip + spreadsheet)
        </Link>
      </div>

      <ReceiptForm eventId={event.id} eventSlug={slug} />

      <h2 style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--weight-black)', marginBottom: 'var(--space-4)' }}>
        Receipts
      </h2>

      {receiptsWithUrls.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>No receipts submitted yet.</p>
      ) : (
        receiptsWithUrls.map((r) => <ReceiptCard key={r.id} receipt={r} eventSlug={slug} />)
      )}
    </main>
  );
}
