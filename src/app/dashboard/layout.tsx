import Link from 'next/link'
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({children}:{children:React.ReactNode}) {
  return <div className="min-h-screen"><Sidebar/><main className="lg:pl-64"><header className="sticky top-0 z-30 flex items-center justify-end gap-4 border-b border-gray-200 bg-white px-6 py-3"><span className="badge badge-success">Profile secured locally</span><Link href="/" className="text-sm font-medium text-gray-700 hover:text-primary-600">View website</Link></header><div className="p-6 lg:p-8">{children}</div></main></div>
}
