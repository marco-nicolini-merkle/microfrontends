import {A, Link, Page, Text} from '@vercel/examples-ui'

export default function Home(): React.ReactNode {
    return (
        <Page>
            <Text variant="h1" className="mb-6">
                Home
            </Text>
            <Text>
                The first two links below go to pages in the main app. The third link goes to the Docs app.
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
