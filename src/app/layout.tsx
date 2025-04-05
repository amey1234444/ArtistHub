import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/contexts/AuthContext';
import { JobApplicationProvider } from '@/contexts/JobApplicationContext';
import '../index.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <JobApplicationProvider>
              <Navbar />
              <main>{children}</main>
              <Toaster />
            </JobApplicationProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}