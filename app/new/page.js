import { GroupLogo } from '@/design-system/components/brand/GroupLogo.jsx';
import { NewEventForm } from './NewEventForm';

export const metadata = { title: 'Create an event — Event Expenses' };

export default function NewEventPage() {
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
        Create an event
      </h1>
      <p
        style={{
          color: 'var(--text-muted)',
          fontWeight: 'var(--weight-light)',
          marginBottom: 'var(--space-6)',
        }}
      >
        Only leaders with the admin passcode can create a new event. Once created, share the
        event link with anyone who needs to submit a receipt.
      </p>
      <NewEventForm />
    </main>
  );
}
