import {A, Code, Link, Page, Text} from '@vercel/examples-ui'

export default function AboutPage() {
    return (
        <Page>
            <Text variant="h1" className="mb-6">
                About Kiosk App
            </Text>
            <Text className="mb-4">
                This is the about page in the Kiosk app (
                <Code>apps/docs/app/docs/about/page.tsx</Code>).
            </Text>
            <Text>
                Navigations between <Link href="/docs">Home Kiosk</Link> and{' '}
                <Link href="/docs/about">About Kiosk</Link> are client-side transitions
                because they&apos;re part of the same Next.js app. Navigating to{' '}
                <a
                    className="text-link hover:text-link-light transition-colors"
                    href="/"
                >
                    Home (Main App Multi-Zones)
                </a>{' '}
                requires a page refresh because it lives in a different Next.js app.
            </Text>

            <ul className="flex pt-10 justify-center">
                <li>
                    <A href="/">Home (Main App Multi-Zones)</A>
                </li>
                <li className="ml-4">
                    <Link href="/docs">Kiosk</Link>
                </li>
                <li className="ml-4">
                    <Link href="/docs/about">About Kiosk</Link>
                </li>
            </ul>
        </Page>
        
    )
}
