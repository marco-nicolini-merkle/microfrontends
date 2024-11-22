import {A, Code, Link, Page, Text} from '@vercel/examples-ui'

export default function AboutPage(): React.ReactNode {
    return (
        <Page>
            <Text variant="h1" className="mb-6">
                About
            </Text>
            <Text>
                This is the about page, defined in{' '}
                <Code>apps/main/app/about/page.tsx</Code>
            </Text>
            <Text className="mt-4">
                Navigations between <Link href="/">Home</Link> and{' '}
                <Link href="/about">About</Link> are client-side transitions because
                they&apos;re part of the same Next.js app, even if their source lives
                externally. Navigating to{' '}
                <a
                    className="text-link hover:text-link-light transition-colors"
                    href="/docs"
                >
                    Kiosk App (Main App Multi-Zones App)
                </a>{' '}
                requires a page refresh because it lives in a different Next.js app.
            </Text>

            <ul className="flex pt-10 justify-center">
                <li>
                    <Link href="/">Home (Main App)</Link>
                </li>
                <li className="ml-4">
                    <Link href="/about">About (Main App)</Link>
                </li>
                <li className="ml-4">
                    <A href="/docs">Kiosk App (Multi-Zones App)</A>
                </li>
            </ul>
        </Page>
    )
}
