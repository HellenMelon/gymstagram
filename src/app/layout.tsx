import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { TRPCReactProvider } from "~/trpc/react";
import ClientProviders from "./providers";
import Head from "next/head";
import { DM_Sans } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export const metadata = {
  title: "Gymstagram",
  description: "gymmmmmmmmm",
  icons: [{ rel: "icon", url: "/logo.png" }],
};

const hellensFav = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={hellensFav.className}>
      <body>
        <Theme>
          <ClientProviders>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </ClientProviders>
        </Theme>
      </body>
    </html>
  );
}
