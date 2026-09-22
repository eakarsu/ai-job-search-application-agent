'use client'

import { useState } from 'react'
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

type PendingQuestion = { id: number; job: string; question: string; options: string[] }
const initial: PendingQuestion[] = []

type SavedAnswer = { question: string; answer: string; sourceJob: string; savedAt: string }

export default function QuestionsPage() {
  const [items, setItems] = useState(initial)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [remember, setRemember] = useState<Record<number, boolean>>({})

  function save(id: number) {
    if (!answers[id]) return
    const item = items.find((value) => value.id === id)
    if (item && remember[id]) {
      const stored = JSON.parse(localStorage.getItem('careerflow-custom-answers') || '[]') as SavedAnswer[]
      const updated = stored.filter((value) => value.question !== item.question)
      updated.push({ question: item.question, answer: answers[id], sourceJob: item.job, savedAt: new Date().toISOString() })
      localStorage.setItem('careerflow-custom-answers', JSON.stringify(updated))
    }
    setItems((current) => current.filter((value) => value.id !== id))
  }

  return <div className="space-y-6">
    <div><h1 className="page-title">Questions requiring your answer</h1><p className="mt-1 text-gray-600">New, ambiguous, sensitive, and legal questions pause the application here. Approved answers can be reused when the exact question appears again.</p></div>
    {items.length === 0
      ? <section className="card py-12 text-center"><CheckCircleIcon className="mx-auto h-12 w-12 text-green-600" /><h2 className="mt-3 text-xl font-semibold">No job-specific questions waiting</h2><p className="mx-auto mt-1 max-w-xl text-gray-600">Questions appear here only when an actual employer application asks something that is missing or ambiguous in the candidate profile.</p></section>
      : items.map((item) => <section className="card" key={item.id}><div className="flex gap-3"><ExclamationTriangleIcon className="h-6 w-6 shrink-0 text-amber-500" /><div className="flex-1"><p className="text-sm text-gray-500">{item.job}</p><h2 className="mt-1 text-lg font-semibold">{item.question}</h2><div className="mt-4 flex flex-col gap-3 sm:flex-row"><select className="input" value={answers[item.id] || ''} onChange={(event) => setAnswers((current) => ({ ...current, [item.id]: event.target.value }))}><option value="">Select your answer</option>{item.options.map((option) => <option key={option}>{option}</option>)}</select><button type="button" className="btn-primary whitespace-nowrap" disabled={!answers[item.id]} onClick={() => save(item.id)}>Save and continue</button></div><label className="mt-3 flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" checked={remember[item.id] || false} onChange={(event) => setRemember((current) => ({ ...current, [item.id]: event.target.checked }))} />Reuse this exact answer when the same question appears</label></div></div></section>)}
  </div>
}
