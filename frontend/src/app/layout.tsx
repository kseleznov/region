import type { Metadata } from "next";
import { inter } from "./fonts";
import "./globals.css";
import { Providers } from "./providers";
import { Dock } from "@/widgets/dock";
import { dictionaries } from "@/shared/i18n";
import { getServerLocale } from "@/shared/i18n/getServerLocale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const { metadata } = dictionaries[locale];
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();

  return (
    <html lang={locale} className={`${inter.variable} h-full antialiased`}>
      <body className="h-full">
        <Providers initialLocale={locale}>
          <div className="pb-28">{children}</div>
          <Dock />
        </Providers>
      </body>
    </html>
  );
}
