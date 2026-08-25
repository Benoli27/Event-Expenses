import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { GroupLogo } from '@/design-system/components/brand/GroupLogo.jsx';
import { Card } from '@/design-system/components/core/Card.jsx';
import { Link } from '@/design-system/components/core/Link.jsx';
import { ReceiptCard } from '../ReceiptCard';

export default async function AllReceiptsPage({ params }) {
  const { slug } = await params;
  const supabase = createServerClient();

  const { data: event } = await supabase.from('events').select('*').eq('slug', slug).single();
  if (!event) notFound();

  const { data: receipts } = await supabase
    .from('receipts')
    .select('*, profiles(name), receipt_files(*)')
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

  const groupsByProfile = new Map();
  for (const r of receiptsWithUrls) {
    const key = r.profile_id;
    if (!groupsByProfile.has(key)) {
      groupsByProfile.set(key, { profileId: key, name: r.profiles?.name || 'Unknown', receipts: [], subtotal: 0 });
    }
    const group = groupsByProfile.get(key);
    group.receipts.push(r);
    group.subtotal += Number(r.amount);
  }
  const groups = Array.from(groupsByProfile.values()).sort((a, b) => a.name.localeCompare(b.name));

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

      <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Link href={`/api/event/${slug}/export`} bold>
          Download all receipts (zip + spreadsheet)
        </Link>
        <Link href={`/event/${slug}`}>Back to event</Link>
      </div>

      <h2 style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--weight-black)', marginBottom: 'var(--space-4)' }}>
        Receipts
      </h2>

      {groups.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>No receipts submitted yet.</p>
      ) : (
        groups.map((group) => (
          <div key={group.profileId} style={{ marginBottom: 'var(--space-6)' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 'var(--space-3)',
                paddingBottom: 'var(--space-2)',
                borderBottom: 'var(--border-width) solid var(--border-subtle)',
              }}
            >
              <h3 style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--weight-black)' }}>{group.name}</h3>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'var(--weight-black)', fontSize: 'var(--text-h4)' }}>
                  £{group.subtotal.toFixed(2)}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  {group.receipts.length} receipt{group.receipts.length === 1 ? '' : 's'}
                </div>
              </div>
            </div>
            {group.receipts.map((r) => (
              <ReceiptCard key={r.id} receipt={r} eventSlug={slug} showName={false} />
            ))}
          </div>
        ))
      )}
    </main>
  );
}
