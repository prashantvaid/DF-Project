import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair"
});
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plant Disease Classifier - AI-Powered Plant Health Diagnosis",
  description: "Advanced machine learning model that identifies plant diseases with high accuracy, providing instant diagnosis and confidence scores.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${playfair.variable}`}>{children}</body>
    </html>
  );
}
