import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CareerFlow AI',
  description: 'Job discovery, tailored resumes, and resumable application workflows.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
