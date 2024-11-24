import type {Metadata} from 'next'
import {PrefetchCrossZoneLinks} from '@acme/components/prefetch'
import '@vercel/examples-ui/globals.css'
import Image from "next/image";

export const metadata: Metadata = {
    title: 'Microfrontends - Main',
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
            <Image src="/images/merkle-logo.svg" alt="Merkle Inc." width={250} height={32} className="mx-auto"/>
            <h1 className="text-3xl text-bold my-5">Microfrontends POC (Main App)</h1>
            <h2 className="text-xl text-center mb-5">Tech Stack: Vercel &gt; Next.js with Multi-Zones</h2>
            <hr/>
        </div>
        {children}
        <PrefetchCrossZoneLinks hrefs={['/docs', '/docs/about']}/>
        </body>
        </html>
    )
}
