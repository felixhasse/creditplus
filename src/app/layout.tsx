import './globals.css'
import StyledComponentsRegistry from "@/app/registry";
import {config} from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body><StyledComponentsRegistry>{children}</StyledComponentsRegistry></body>
        </html>
    )
}
