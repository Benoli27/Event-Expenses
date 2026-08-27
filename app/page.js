import { GroupLogo } from "@/design-system/components/brand/GroupLogo.jsx";
import { NewEventForm } from "./NewEventForm";

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
        justifyContent: "flex-start",
        alignItems: "center",
        maxWidth: "var(--container-narrow)",
        margin: "0 auto",
        padding: "var(--space-6) var(--page-pad)",
      }}
    >
      <GroupLogo tone="purple" height={88} src="/logo/8th-sutton-purple.png" />
      <h1
        style={{
          fontSize: "var(--text-h1)",
          fontWeight: "var(--weight-black)",
          lineHeight: "var(--leading-tight)",
          marginTop: "var(--space-6)",
          marginBottom: "var(--space-2)",
          textAlign: "center",
        }}
      >
        Event expenses
      </h1>
      <p
        style={{
          fontSize: "var(--text-lead)",
          fontWeight: "var(--weight-light)",
          color: "var(--text-muted)",
          textAlign: "center",
          marginBottom: "var(--space-6)",
        }}
      >
        Only leaders with the admin passcode can create a new event. Once created, share the
        event link with anyone who needs to submit a receipt.
      </p>
      <NewEventForm />
    </main>
  );
}
