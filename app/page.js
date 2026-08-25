import { GroupLogo } from "@/design-system/components/brand/GroupLogo.jsx";
import { Button } from "@/design-system/components/core/Button.jsx";

export default function Home() {
  return (
    <main
      style={{
        maxWidth: "var(--container-narrow)",
        margin: "0 auto",
        padding: "var(--space-6) var(--page-pad)",
      }}
    >
      <GroupLogo tone="purple" height={72} src="/logo/8th-sutton-purple.png" />
      <h1
        style={{
          fontSize: "var(--text-h1)",
          fontWeight: "var(--weight-black)",
          lineHeight: "var(--leading-tight)",
          marginTop: "var(--space-6)",
          marginBottom: "var(--space-2)",
        }}
      >
        Event expenses
      </h1>
      <p
        style={{
          fontSize: "var(--text-lead)",
          fontWeight: "var(--weight-light)",
          color: "var(--text-muted)",
        }}
      >
        Upload receipts and claim back expenses for your event.
      </p>
      <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-6)" }}>
        <Button variant="primary" size="lg" href="/new">
          Create an event
        </Button>
        <Button variant="outline" size="lg" href="/join">
          Join an event
        </Button>
      </div>
    </main>
  );
}
