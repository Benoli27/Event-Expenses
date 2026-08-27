'use client';

import { adminLogout } from '@/lib/actions';
import { Button } from '@/design-system/components/core/Button.jsx';

export function LogoutButton() {
  return (
    <form action={adminLogout} style={{ flexShrink: 0 }}>
      <Button type="submit" variant="primary" size="sm" style={{ whiteSpace: 'nowrap' }}>
        Log out
      </Button>
    </form>
  );
}
