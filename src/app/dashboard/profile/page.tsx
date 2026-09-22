'use client'

import { useEffect, useMemo, useState } from 'react'
import { CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon, ExclamationTriangleIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { defaultProfile, ProfileAnswers, ProfileQuestion, profileSections } from '@/lib/profile-questionnaire'

const storageKey = 'careerflow-profile'
const sensitiveStorageKey = 'careerflow-profile-sensitive'
const sensitiveQuestionIds = new Set(profileSections.flatMap((section) => section.questions.filter((question) => question.sensitive).map((question) => question.id)))

function hasAnswer(question: ProfileQuestion, answers: ProfileAnswers) {
  const value = answers[question.id]
  if (question.type === 'checkbox') return question.required ? value === true : typeof value === 'boolean'
  return typeof value === 'string' && value.trim().length > 0
}

function Field({ question, value, onChange }: {
  question: ProfileQuestion
  value: string | boolean | undefined
  onChange: (value: string | boolean) => void
}) {
  if (question.type === 'checkbox') {
    return <label className="md:col-span-2 flex items-start gap-3 rounded-lg border border-gray-200 p-4 hover:border-primary-300">
      <input className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" type="checkbox" checked={value === true} onChange={(event) => onChange(event.target.checked)} />
      <span><span className="text-sm font-medium text-gray-800">{question.label}{question.required && <span className="text-red-600"> *</span>}</span>{question.help && <span className="mt-1 block text-xs text-gray-500">{question.help}</span>}</span>
    </label>
  }

  const shared = {
    id: question.id,
    value: typeof value === 'string' ? value : '',
    required: question.required,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => onChange(event.target.value),
    className: 'input',
  }

  return <label htmlFor={question.id} className={question.type === 'textarea' ? 'md:col-span-2' : ''}>
    <span className="label flex items-center gap-2">{question.label}{question.required && <span className="text-red-600">*</span>}{question.sensitive && <span className="badge badge-warning">Sensitive</span>}</span>
    {question.type === 'select'
      ? <select {...shared}><option value="">Select an answer</option>{question.options?.map((option) => <option key={option}>{option}</option>)}</select>
      : question.type === 'textarea'
        ? <textarea {...shared} rows={4} placeholder={question.placeholder} />
        : <input {...shared} type={question.type || 'text'} placeholder={question.placeholder} />}
    {question.help && <span className="mt-1 block text-xs text-gray-500">{question.help}</span>}
  </label>
}

export default function ProfilePage() {
  const [answers, setAnswers] = useState<ProfileAnswers>(defaultProfile)
  const [sectionIndex, setSectionIndex] = useState(0)
  const [status, setStatus] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem(storageKey)
    if (!stored) return
    try {
      const parsed = JSON.parse(stored) as ProfileAnswers & Record<string, string>
      const sensitive = JSON.parse(localStorage.getItem(sensitiveStorageKey) || '{}') as ProfileAnswers
      const migrated: ProfileAnswers = {
        ...parsed,
        legalFirstName: parsed.legalFirstName || parsed.firstName || '',
        legalLastName: parsed.legalLastName || parsed.lastName || '',
        primaryEmail: parsed.primaryEmail || parsed.email || '',
        authorizedUS: parsed.authorizedUS || (parsed.citizenship === 'U.S. Citizen' ? 'Yes' : ''),
        citizenship: parsed.citizenship === 'U.S. Citizen' ? 'U.S. citizen' : parsed.citizenship,
      }
      setAnswers({ ...defaultProfile, ...migrated, ...sensitive })
    } catch { setAnswers(defaultProfile) }
  }, [])

  const allQuestions = useMemo(() => profileSections.flatMap((item) => item.questions), [])
  const answeredCount = allQuestions.filter((question) => hasAnswer(question, answers)).length
  const completion = Math.round((answeredCount / allQuestions.length) * 100)
  const missingRequired = allQuestions.filter((question) => question.required && !hasAnswer(question, answers))
  const section = profileSections[sectionIndex]

  function update(id: string, value: string | boolean) {
    setAnswers((current) => ({ ...current, [id]: value }))
    setStatus('')
  }

  function persist() {
    const general: ProfileAnswers = {}
    const sensitive: ProfileAnswers = {}
    Object.entries(answers).forEach(([id, value]) => {
      if (sensitiveQuestionIds.has(id)) sensitive[id] = value
      else general[id] = value
    })
    localStorage.setItem(storageKey, JSON.stringify(general))
    localStorage.setItem(sensitiveStorageKey, JSON.stringify(sensitive))
  }

  function save() {
    persist()
    setStatus(`Saved ${section.title}.`)
  }

  function changeSection(index: number) {
    setSectionIndex(index)
    setStatus('')
    window.setTimeout(() => document.getElementById('profile-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0)
  }

  function next() {
    persist()
    if (sectionIndex < profileSections.length - 1) {
      const nextIndex = sectionIndex + 1
      setSectionIndex(nextIndex)
      setStatus(`Saved. Continue with ${profileSections[nextIndex].title}.`)
      window.setTimeout(() => document.getElementById('profile-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0)
    } else {
      setStatus('Questionnaire saved. Your approved answers are ready for application workflows.')
    }
  }

  return <div className="space-y-6">
    <div className="page-header"><div><h1 className="page-title">Candidate profile questionnaire</h1><p className="mt-1 text-gray-600">Create one verified answer bank for job-specific, multistep applications.</p></div><button type="button" className="btn-primary" onClick={save}>Save profile</button></div>

    <section className="card"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-medium text-gray-500">Profile readiness</p><p className="mt-1 text-2xl font-bold">{completion}% complete</p><p className="mt-1 text-sm text-gray-500">{answeredCount} of {allQuestions.length} reusable questions answered</p></div><div className="w-full sm:w-64"><div className="h-3 overflow-hidden rounded-full bg-gray-200"><div className="h-full rounded-full bg-primary-600 transition-all" style={{ width: `${completion}%` }} /></div><p className={`mt-2 text-xs ${missingRequired.length ? 'text-amber-700' : 'text-green-700'}`}>{missingRequired.length ? `${missingRequired.length} required answers remain` : 'All required answers are complete'}</p></div></div></section>

    {status && <div role="status" aria-live="polite" className="flex items-center gap-2 rounded-lg bg-green-50 p-4 text-green-800"><CheckCircleIcon className="h-5 w-5 shrink-0" />{status}</div>}

    <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <nav className="card h-fit p-3" aria-label="Profile sections">
        {profileSections.map((item, index) => {
          const complete = item.questions.filter((question) => hasAnswer(question, answers)).length
          return <button key={item.id} type="button" onClick={() => changeSection(index)} className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left ${index === sectionIndex ? 'bg-primary-50 text-primary-800' : 'hover:bg-gray-50'}`}><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${index === sectionIndex ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{index + 1}</span><span className="min-w-0 flex-1"><span className="block text-sm font-medium">{item.title}</span><span className="block text-xs text-gray-500">{complete}/{item.questions.length} answered</span></span></button>
        })}
      </nav>

      <section id="profile-form" className="card scroll-mt-20" data-testid={`profile-section-${section.id}`}>
        <div className="mb-6 border-b border-gray-100 pb-5"><p className="text-sm font-medium text-primary-700">Step {sectionIndex + 1} of {profileSections.length}</p><h2 className="mt-1 text-xl font-semibold text-gray-900">{section.title}</h2><p className="mt-1 text-sm text-gray-600">{section.description}</p></div>

        {section.id === 'disclosures' && <div className="mb-6 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><LockClosedIcon className="h-5 w-5 shrink-0" /><p>These answers are voluntary and stay separate from qualifications. The platform uses only your exact selection and never infers veteran, disability, gender, race, or ethnicity.</p></div>}
        {section.id === 'screening' && <div className="mb-6 flex gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900"><ExclamationTriangleIcon className="h-5 w-5 shrink-0" /><p>Employers can add custom questions. New or ambiguous questions pause the application for your answer and can then be added to this reusable bank.</p></div>}

        <div className="grid gap-5 md:grid-cols-2">{section.questions.map((question) => <Field key={question.id} question={question} value={answers[question.id]} onChange={(value) => update(question.id, value)} />)}</div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between"><button type="button" className="btn-ghost" disabled={sectionIndex === 0} onClick={() => changeSection(sectionIndex - 1)}><ChevronLeftIcon className="h-4 w-4" />Previous</button><div className="flex flex-col gap-3 sm:flex-row"><button type="button" className="btn-secondary" onClick={save}>Save progress</button><button type="button" className="btn-primary" onClick={next}>{sectionIndex === profileSections.length - 1 ? 'Save questionnaire' : 'Save and continue'}{sectionIndex < profileSections.length - 1 && <ChevronRightIcon className="h-4 w-4" />}</button></div></div>
      </section>
    </div>
  </div>
}
