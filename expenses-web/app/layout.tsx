import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: '💰 Expense Tracker | Manage Your Money Smartly',
  description:
    'A simple and smart expense tracking app to help you record your income, monitor your spending, and gain better financial control every day.',
  keywords: [
    'expense tracker',
    'budget planner',
    'income tracking',
    'personal finance',
    'money management',
    'savings tracker'
  ],
  authors: [{ name: 'Expense Tracker Team' }],
  openGraph: {
    title: '💰 Expense Tracker – Manage Your Money Smartly',
    description:
      'Track your income, control your expenses, and take charge of your financial life effortlessly.',
    url: 'http://localhost:3000',
    siteName: 'Expense Tracker',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Expense Tracker Dashboard'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: '💰 Expense Tracker | Smart Budget App',
    description:
      'Keep your finances on track with real-time expense and income management.',
    creator: '@expense_tracker_app'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased bg-gray-50 text-gray-900`}
      >
        <main className="max-w-2xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6 text-center">💰 Expense Tracker</h1>
          {children}
        </main>
      </body>
    </html>
  );
}
