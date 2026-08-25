import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { GroupLogo } from '@/design-system/components/brand/GroupLogo.jsx';
import { Card } from '@/design-system/components/core/Card.jsx';
import { Link } from '@/design-system/components/core/Link.jsx';
import { ReceiptForm } from '../../ReceiptForm';
import { ReceiptCard } from '../../ReceiptCard';

export default async function MyReceiptsPage({ params }) {
  const { slug, profileId } = await params;
  const supabase = createServerClient();

  const { data: event } = await supabase.from('events').select('*').eq('slug', slug).single();
  if (!event) notFound();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', profileId)
    .eq('event_id', event.id)
    .single();
  if (!profile) notFound();

  const { data: receipts } = await supabase
    .from('receipts')
    .select('*, receipt_files(*)')
    .eq('profile_id', profileId)
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
          fontSize: 'var(--text-h2)',
          fontWeight: 'var(--weight-black)',
          lineHeight: 'var(--leading-tight)',
          marginTop: 'var(--space-5)',
          marginBottom: 'var(--space-1)',
        }}
      >
        {event.name}
      </h1>
      <p style={{ color: 'var(--text-muted)', fontWeight: 'var(--weight-light)', marginBottom: 'var(--space-4)' }}>
        Hi, {profile.name}
      </p>

      <Card tone="teal" padding={20} style={{ marginBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <div>
            <div style={{ fontSize: 'var(--text-caption)', fontWeight: 'var(--weight-black)', letterSpacing: 'var(--tracking-wide)', opacity: 0.85 }}>
              YOUR RECEIPTS
            </div>
            <div style={{ fontSize: 'var(--text-h1)', fontWeight: 'var(--weight-black)' }}>£{total.toFixed(2)}</div>
          </div>
          <div style={{ fontWeight: 'var(--weight-regular)' }}>
            {receiptsWithUrls.length} receipt{receiptsWithUrls.length === 1 ? '' : 's'}
          </div>
        </div>
      </Card>

      <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Link href={`/event/${slug}/all`} bold>
          View everyone&apos;s receipts
        </Link>
        <Link href={`/event/${slug}`}>Not {profile.name}? Switch profile</Link>
      </div>

      <ReceiptForm profileId={profile.id} eventSlug={slug} />

      <h2 style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--weight-black)', marginBottom: 'var(--space-4)' }}>
        Your receipts
      </h2>

      {receiptsWithUrls.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>You haven&apos;t added any receipts yet.</p>
      ) : (
        receiptsWithUrls.map((r) => <ReceiptCard key={r.id} receipt={r} eventSlug={slug} showName={false} />)
      )}
    </main>
  );
}
