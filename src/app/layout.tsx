import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/contexts/AuthContext';
import { JobApplicationProvider } from '@/contexts/JobApplicationContext';
import '../index.css';
import ChatBot from '@/components/ChatBot';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <JobApplicationProvider>
            <ThemeProvider attribute="class">
              <Navbar />
              {children}
              <Toaster />
              <ChatBot />
            </ThemeProvider>
          </JobApplicationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}