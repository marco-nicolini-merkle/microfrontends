import Image from 'next/image';

export function Header({appName}: { appName?: String }) {
    return (
        <div className="text-center mt-5">
            <Image src="/images/merkle-logo.svg" alt="Merkle Inc." width={250} height={32} className="mx-auto"/>
            <h1 className="text-3xl text-bold my-5">Microfrontends POC ({appName} App)</h1>
            <h2 className="text-xl text-center mb-5">Tech Stack: Vercel &gt; Next.js with Multi-Zones</h2>
            <hr/>
        </div>
    )
}
