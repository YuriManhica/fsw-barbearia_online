import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./_components/footer";
import { ThemeProvider } from "./_components/theme-provider";
import { Toaster } from "./_components/ui/sonner";
import AuthProvider from "./_providers/auth";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Barbearia Online",
  description: "Agende os melhores cortes na nossa barbearia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${inter.className} 
        `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
            <div className="mt-16 z-50">
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
