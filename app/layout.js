import "@/design-system/styles.css";

export const metadata = {
  title: "Event Expenses — 8th Sutton Scouts",
  description: "Upload receipts and claim back expenses for your event.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "var(--surface-page)",
          color: "var(--text-body)",
          fontFamily: "var(--font-brand)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
