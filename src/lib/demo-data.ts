export type Job = {
  id: string; title: string; company: string; location: string; source: string;
  postedDays: number; match: number; salary: string; workMode: string;
  requirements: string[]; preferred: string[]; status: string;
}

export const jobs: Job[] = [
  { id:'afs-net-azure', title:'Senior .NET Azure AI Developer', company:'Accenture Federal Services', location:'Baltimore, MD', source:'LinkedIn', postedDays:1, match:92, salary:'$100,200 - $203,400', workMode:'On-site', status:'Resume ready', requirements:['C# and .NET','Microsoft Azure','REST APIs','SQL','Azure DevOps','Docker'], preferred:['Python or Node.js','React or Angular','Kubernetes','Terraform'] },
  { id:'mckesson-data', title:'Data Engineer, Finance Solutions - GCP', company:'McKesson', location:'Richmond, VA', source:'Company site', postedDays:2, match:89, salary:'$106,500 - $177,500', workMode:'Hybrid', status:'Review', requirements:['Google Cloud Platform','Python','SQL','ETL/ELT','Data warehousing'], preferred:['PySpark','Financial data','SOX controls','GitHub Actions'] },
  { id:'capital-ai', title:'Lead AI Engineer', company:'Capital One', location:'McLean, VA', source:'Dice', postedDays:3, match:86, salary:'$175,000 - $220,000', workMode:'Hybrid', status:'Discovered', requirements:['Python','Machine learning','Cloud platforms','API design'], preferred:['LLM applications','RAG','Kubernetes','Technical leadership'] },
  { id:'gdit-cloud', title:'Cloud Engineering Technical Lead', company:'GDIT', location:'Falls Church, VA', source:'Monster', postedDays:5, match:84, salary:'$140,000 - $190,000', workMode:'Hybrid', status:'Discovered', requirements:['Cloud architecture','Terraform','Kubernetes','CI/CD'], preferred:['Federal programs','Team leadership','Security controls'] },
  { id:'caci-architect', title:'AI Enterprise Architect', company:'CACI', location:'Reston, VA', source:'Company site', postedDays:7, match:81, salary:'$145,000 - $210,000', workMode:'On-site', status:'Discovered', requirements:['Enterprise architecture','AI/ML','Cloud','Stakeholder leadership'], preferred:['Public Trust','Federal consulting','Governance'] },
]

export const applications = [
  { id:'APP-1042', job:'Senior .NET Azure AI Developer', company:'Accenture Federal Services', status:'Resume Ready', updated:'Today, 1:42 PM', completed:3, total:7, next:'Review tailored resume' },
  { id:'APP-1041', job:'Data Engineer, Finance Solutions - GCP', company:'McKesson', status:'Waiting for User', updated:'Today, 11:18 AM', completed:5, total:8, next:'Confirm onsite availability' },
  { id:'APP-1039', job:'Lead AI Engineer', company:'Capital One', status:'Applying', updated:'Yesterday', completed:4, total:9, next:'Complete employer questions' },
  { id:'APP-1034', job:'Principal Software Engineer', company:'CoStar Group', status:'Submitted', updated:'Sep 20, 2026', completed:8, total:8, next:'Track employer response' },
]

export const applicationSteps = [
  'Job requirements captured', 'Eligibility checked', 'Tailored resume generated',
  'Contact and employment history', 'Employer questions', 'Voluntary disclosures',
  'Legal attestation and signature', 'Final review', 'Submission confirmation',
]
