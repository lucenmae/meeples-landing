import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import SessionProvider from '@/components/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LSU Meeples',
  description: 'LSU Meeples - Tabletop Gaming Community',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
