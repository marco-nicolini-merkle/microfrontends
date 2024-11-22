import type {Metadata} from 'next'
import {PrefetchCrossZoneLinks} from '@acme/components/prefetch'
import '@vercel/examples-ui/globals.css'
import Image from "next/image";

export const metadata: Metadata = {
    title: 'Microfrontends - Docs',
    description: 'Example demonstrating vertical microfrontends on Vercel',
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html>
        <body>
        <div className="text-center mt-5">
            <Image src="/images/merkle-logo.svg" alt="Merkle Inc." width={200} height={100} className="mx-auto"/>
            <h1 className="text-3xl text-bold my-5">Microfrontends POC (Kiosk App)</h1>
            <h2 className="text-xl text-center mb-5">Tech Stack: Vercel > Next.js with Multi-Zones</h2>
            <hr/>
        </div>
        {children}
        <PrefetchCrossZoneLinks hrefs={['/', '/about']}/>
        </body>
        </html>
    )
}
