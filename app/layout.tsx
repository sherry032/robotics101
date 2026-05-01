import type { Metadata } from "next";
import { Roboto, Audiowide, Anonymous_Pro } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const roboto = Roboto({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const audiowide = Audiowide({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const anonymousPro = Anonymous_Pro({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Robotics 101 — Learn Robotics From Scratch",
  description:
    "A beginner-friendly robotics education website. Learn how sensors, motors, and code work together through lessons, projects, and real build logs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${audiowide.variable} ${anonymousPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
