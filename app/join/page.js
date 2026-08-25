import { GroupLogo } from '@/design-system/components/brand/GroupLogo.jsx';
import { JoinForm } from './JoinForm';

export const metadata = { title: 'Join an event — Event Expenses' };

export default function JoinPage() {
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
          marginTop: 'var(--space-5)',
          marginBottom: 'var(--space-2)',
        }}
      >
        Join an event
      </h1>
      <p
        style={{
          color: 'var(--text-muted)',
          fontWeight: 'var(--weight-light)',
          marginBottom: 'var(--space-6)',
        }}
      >
        Usually you&apos;ll just open the link a leader shared with you — this is only here as a
        fallback if that link got mangled.
      </p>
      <JoinForm />
    </main>
  );
}
