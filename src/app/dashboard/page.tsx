import Link from 'next/link'
import { applications, jobs } from '@/lib/demo-data'
import { BriefcaseIcon, CheckCircleIcon, ClockIcon, DocumentTextIcon, ExclamationTriangleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function DashboardPage(){
  const stats=[
    {name:'Fresh matches',value:jobs.length,icon:MagnifyingGlassIcon,color:'bg-blue-500',href:'/dashboard/jobs'},
    {name:'Resume ready',value:applications.filter(x=>x.status==='Resume Ready').length,icon:DocumentTextIcon,color:'bg-purple-500',href:'/dashboard/resumes'},
    {name:'In progress',value:applications.filter(x=>['Applying','Waiting for User'].includes(x.status)).length,icon:ClockIcon,color:'bg-yellow-500',href:'/dashboard/applications'},
    {name:'Submitted',value:applications.filter(x=>x.status==='Submitted').length,icon:CheckCircleIcon,color:'bg-green-500',href:'/dashboard/applications'},
  ]
  return <div className="space-y-6"><div className="page-header"><div><h1 className="page-title">Candidate dashboard</h1><p className="text-gray-600 mt-1">Recent job matches and resumable application work.</p></div><Link href="/dashboard/jobs" className="btn-primary">Find recent jobs</Link></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">{stats.map(s=><Link key={s.name} href={s.href} className="stat-card hover:shadow-md transition-shadow"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">{s.name}</p><p className="text-3xl font-bold mt-1">{s.value}</p></div><span className={`${s.color} p-3 rounded-lg`}><s.icon className="w-6 h-6 text-white"/></span></div></Link>)}</div>
    <div className="grid lg:grid-cols-2 gap-6"><section className="card"><div className="flex items-center justify-between mb-4"><h2 className="section-title mb-0">Top job matches</h2><Link href="/dashboard/jobs" className="text-sm text-primary-600">View all</Link></div><div className="space-y-3">{jobs.slice(0,4).map(job=><Link href="/dashboard/jobs" key={job.id} className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg"><div><p className="font-medium">{job.title}</p><p className="text-sm text-gray-600">{job.company} · {job.location}</p></div><span className="badge badge-success">{job.match}%</span></Link>)}</div></section>
      <section className="card"><div className="flex items-center justify-between mb-4"><h2 className="section-title mb-0">Applications needing attention</h2><ExclamationTriangleIcon className="w-5 h-5 text-amber-500"/></div><div className="space-y-3">{applications.slice(0,3).map(app=><Link href="/dashboard/applications" key={app.id} className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg"><div className="flex justify-between gap-3"><div><p className="font-medium">{app.job}</p><p className="text-sm text-gray-600">{app.company}</p></div><span className={`badge ${app.status==='Waiting for User'?'badge-warning':'badge-info'}`}>{app.status}</span></div><p className="text-sm text-gray-600 mt-2">Next: {app.next}</p></Link>)}</div></section></div>
    <section className="card"><h2 className="section-title">Quick actions</h2><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3"><Link className="btn-secondary" href="/dashboard/profile">Complete profile</Link><Link className="btn-secondary" href="/dashboard/resumes">Review resumes</Link><Link className="btn-secondary" href="/dashboard/questions">Answer questions</Link><Link className="btn-secondary" href="/dashboard/applications">Resume application</Link></div></section>
  </div>
}
