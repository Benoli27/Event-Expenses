import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { GroupLogo } from '@/design-system/components/brand/GroupLogo.jsx';
import { ShareButton } from './ShareButton';
import { ProfilePicker } from './ProfilePicker';
import { AllReceiptsSection } from './AllReceiptsSection';

export default async function EventHomePage({ params }) {
  const { slug } = await params;
  const supabase = createServerClient();

  const { data: event } = await supabase.from('events').select('*').eq('slug', slug).single();
  if (!event) notFound();

  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .eq('event_id', event.id)
    .order('name', { ascending: true });

  return (
    <main
      style={{
        maxWidth: 'var(--container-narrow)',
        margin: '0 auto',
        padding: 'var(--space-6) var(--page-pad)',
      }}
    >
      <GroupLogo tone="purple" height={88} src="/logo/8th-sutton-purple.png" style={{ margin: '0 auto' }} />
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

      <div style={{ marginBottom: 'var(--space-6)' }}>
        <ShareButton />
      </div>

      <h2 style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--weight-black)', marginBottom: 'var(--space-3)' }}>
        Who are you?
      </h2>
      <ProfilePicker eventId={event.id} eventSlug={slug} profiles={profiles || []} />

      <div style={{ marginTop: 'var(--space-8)' }}>
        <AllReceiptsSection eventId={event.id} eventSlug={slug} />
      </div>
    </main>
  );
}
