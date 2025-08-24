export const metadata = { title: 'SocialEcho', description: 'A tiny social app with moderation' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container py-8">
          <header className="mb-6">
            <h1 className="text-3xl font-bold">SocialEcho</h1>
            <p className="text-sm text-gray-500">Next.js + Mongo + Flask moderation</p>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
