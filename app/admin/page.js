import { cookies } from 'next/headers';
import { createServerClient } from '@/lib/supabase/server';
import { ADMIN_COOKIE, passcodeMatches } from '@/lib/admin';
import { GroupLogo } from '@/design-system/components/brand/GroupLogo.jsx';
import { AdminLoginForm } from './AdminLoginForm';
import { LogoutButton } from './LogoutButton';
import { EventRow } from './EventRow';

export const metadata = { title: 'Admin — Event Expenses' };

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthed = passcodeMatches(cookieStore.get(ADMIN_COOKIE)?.value);

  if (!isAuthed) {
    return (
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 'var(--container-narrow)',
          margin: '0 auto',
          padding: 'var(--space-6) var(--page-pad)',
        }}
      >
        <GroupLogo tone="purple" height={88} src="/logo/8th-sutton-purple.png" />
        <h1
          style={{
            fontSize: 'var(--text-h2)',
            fontWeight: 'var(--weight-black)',
            marginTop: 'var(--space-5)',
            marginBottom: 'var(--space-2)',
            textAlign: 'center',
          }}
        >
          Admin
        </h1>
        <p
          style={{
            color: 'var(--text-muted)',
            fontWeight: 'var(--weight-light)',
            marginBottom: 'var(--space-6)',
            textAlign: 'center',
          }}
        >
          Enter the admin passcode to see all events.
        </p>
        <AdminLoginForm />
      </main>
    );
  }

  const supabase = createServerClient();
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main
      style={{
        maxWidth: 'var(--container-narrow)',
        margin: '0 auto',
        padding: 'var(--space-6) var(--page-pad)',
      }}
    >
      <GroupLogo
        tone="purple"
        height={88}
        src="/logo/8th-sutton-purple.png"
        style={{ margin: '0 auto var(--space-5)' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
        <h1
          style={{
            fontSize: 'clamp(1.75rem, 7vw, var(--text-h1))',
            fontWeight: 'var(--weight-black)',
            lineHeight: 'var(--leading-tight)',
            minWidth: 0,
          }}
        >
          All events
        </h1>
        <LogoutButton />
      </div>

      {events && events.length > 0 ? (
        events.map((event) => <EventRow key={event.id} event={event} />)
      ) : (
        <p style={{ color: 'var(--text-muted)' }}>No events created yet.</p>
      )}
    </main>
  );
}
