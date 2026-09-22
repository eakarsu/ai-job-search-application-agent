'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { HomeIcon, MagnifyingGlassIcon, IdentificationIcon, DocumentTextIcon, ClipboardDocumentCheckIcon, QuestionMarkCircleIcon, Cog6ToothIcon, Bars3Icon, XMarkIcon, BriefcaseIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name:'Dashboard', href:'/dashboard', icon:HomeIcon },
  { name:'Find Jobs', href:'/dashboard/jobs', icon:MagnifyingGlassIcon },
  { name:'Applications', href:'/dashboard/applications', icon:ClipboardDocumentCheckIcon },
  { name:'Resumes', href:'/dashboard/resumes', icon:DocumentTextIcon },
  { name:'Candidate Profile', href:'/dashboard/profile', icon:IdentificationIcon },
  { name:'Questions', href:'/dashboard/questions', icon:QuestionMarkCircleIcon },
  { name:'Settings', href:'/dashboard/settings', icon:Cog6ToothIcon },
]

export default function Sidebar() {
  const pathname=usePathname(); const [open,setOpen]=useState(false)
  return <>
    <button aria-label="Open navigation" onClick={()=>setOpen(true)} className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"><Bars3Icon className="w-6 h-6"/></button>
    {open && <button aria-label="Close navigation backdrop" className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={()=>setOpen(false)}/>} 
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform lg:translate-x-0 ${open?'translate-x-0':'-translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center gap-2"><span className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center"><BriefcaseIcon className="w-5 h-5 text-white"/></span><span className="font-bold text-xl">CareerFlow AI</span></Link>
          <button aria-label="Close navigation" onClick={()=>setOpen(false)} className="lg:hidden"><XMarkIcon className="w-5 h-5"/></button>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">{navigation.map(item=>{const active=pathname===item.href||(item.href!='/dashboard'&&pathname.startsWith(item.href));return <Link key={item.name} href={item.href} onClick={()=>setOpen(false)} className={`sidebar-link ${active?'active':''}`}><item.icon className="w-5 h-5"/><span>{item.name}</span>{item.name==='Questions'&&<span className="ml-auto badge badge-warning">2</span>}</Link>})}</nav>
        <div className="border-t border-gray-200 p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-semibold">EA</div><div><p className="text-sm font-medium">Erol Akarsu</p><p className="text-xs text-gray-500">Candidate profile</p></div></div></div>
      </div>
    </aside>
  </>
}
