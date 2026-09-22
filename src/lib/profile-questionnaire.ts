export type QuestionType = 'text' | 'email' | 'tel' | 'number' | 'date' | 'textarea' | 'select' | 'checkbox'

export type ProfileQuestion = {
  id: string
  label: string
  type?: QuestionType
  options?: string[]
  placeholder?: string
  help?: string
  required?: boolean
  sensitive?: boolean
}

export type ProfileSection = {
  id: string
  title: string
  description: string
  questions: ProfileQuestion[]
}

const yesNo = ['Yes', 'No']
const yesNoAsk = ['Yes', 'No', 'Ask me for each application']
const proficiency = ['Native or bilingual', 'Professional', 'Conversational', 'Basic']
const q = (id: string, label: string, extra: Omit<ProfileQuestion, 'id' | 'label'> = {}): ProfileQuestion => ({ id, label, ...extra })

export const profileSections: ProfileSection[] = [
  {
    id: 'identity',
    title: 'Identity and contact',
    description: 'Legal identity, contact details, and public professional profiles.',
    questions: [
      q('legalFirstName', 'Legal first name', { required: true }),
      q('legalMiddleName', 'Legal middle name'),
      q('legalLastName', 'Legal last name', { required: true }),
      q('preferredName', 'Preferred name'),
      q('pronouns', 'Pronouns', { type: 'select', options: ['He/him', 'She/her', 'They/them', 'Use my name', 'Prefer not to answer'] }),
      q('primaryEmail', 'Primary email', { type: 'email', required: true }),
      q('alternateEmail', 'Alternate email', { type: 'email' }),
      q('phone', 'Mobile phone', { type: 'tel', required: true }),
      q('phoneType', 'Phone type', { type: 'select', options: ['Mobile', 'Home', 'Work'] }),
      q('address1', 'Street address', { required: true }),
      q('address2', 'Apartment, suite, or unit'),
      q('city', 'City', { required: true }),
      q('state', 'State or province', { required: true }),
      q('postalCode', 'Postal code', { required: true }),
      q('country', 'Country', { required: true }),
      q('linkedInUrl', 'LinkedIn profile URL'),
      q('githubUrl', 'GitHub profile URL'),
      q('portfolioUrl', 'Portfolio or personal website'),
    ],
  },
  {
    id: 'authorization',
    title: 'Work authorization and federal eligibility',
    description: 'Answers commonly used for authorization, sponsorship, and government work.',
    questions: [
      q('authorizedUS', 'Are you legally authorized to work in the United States?', { type: 'select', options: yesNo, required: true, sensitive: true }),
      q('citizenship', 'Citizenship status', { type: 'select', options: ['U.S. citizen', 'Dual citizen including U.S.', 'Permanent resident', 'Employment authorization document', 'Visa holder', 'Other', 'Prefer not to answer'], required: true, sensitive: true }),
      q('otherCitizenships', 'Other citizenships, if applicable', { sensitive: true }),
      q('sponsorshipNow', 'Will you now require employment visa sponsorship?', { type: 'select', options: yesNo, required: true, sensitive: true }),
      q('sponsorshipFuture', 'Will you require employment visa sponsorship in the future?', { type: 'select', options: yesNo, required: true, sensitive: true }),
      q('visaStatus', 'Current visa or work authorization type', { sensitive: true }),
      q('visaExpiration', 'Work authorization expiration date', { type: 'date', sensitive: true }),
      q('over18', 'Are you at least 18 years old?', { type: 'select', options: yesNo, required: true, sensitive: true }),
      q('publicTrustEligible', 'Are you eligible to obtain a U.S. Public Trust?', { type: 'select', options: ['Yes', 'No', 'Unsure'], sensitive: true }),
      q('clearance', 'Current security clearance', { type: 'select', options: ['None', 'Public Trust', 'Confidential', 'Secret', 'Top Secret', 'Top Secret/SCI', 'Other'], sensitive: true }),
      q('clearanceActive', 'Is the clearance currently active?', { type: 'select', options: ['Yes', 'No', 'Not applicable'], sensitive: true }),
      q('backgroundCheck', 'Are you willing to complete a background check?', { type: 'select', options: yesNoAsk, sensitive: true }),
      q('drugScreen', 'Are you willing to complete a drug screening when lawful and required?', { type: 'select', options: yesNoAsk, sensitive: true }),
      q('governmentEmployee', 'Are you currently or were you recently a government employee?', { type: 'select', options: yesNo, sensitive: true }),
      q('governmentRestrictions', 'Describe any post-government employment restrictions', { type: 'textarea', sensitive: true }),
    ],
  },
  {
    id: 'preferences',
    title: 'Job and location preferences',
    description: 'Default preferences that can be overridden for a specific opportunity.',
    questions: [
      q('desiredTitles', 'Desired job titles', { type: 'textarea', placeholder: 'One title per line' }),
      q('desiredLocations', 'Preferred work locations', { type: 'textarea', placeholder: 'Cities, states, or regions' }),
      q('remotePreference', 'Remote work preference', { type: 'select', options: ['Remote only', 'Remote preferred', 'Hybrid preferred', 'On-site preferred', 'Flexible'] }),
      q('onsiteAvailable', 'Are you available for on-site work?', { type: 'select', options: yesNoAsk }),
      q('relocate', 'Are you willing to relocate?', { type: 'select', options: yesNoAsk }),
      q('relocationSupport', 'Would relocation require employer assistance?', { type: 'select', options: yesNoAsk }),
      q('commuteMiles', 'Maximum one-way commute in miles', { type: 'number' }),
      q('travel', 'Maximum travel', { type: 'select', options: ['None', 'Up to 10%', 'Up to 25%', 'Up to 50%', 'Up to 75%', 'Up to 100%'] }),
      q('employmentTypes', 'Accepted employment types', { type: 'textarea', placeholder: 'Full-time, contract, contract-to-hire, part-time' }),
      q('fullTime', 'Are you available for full-time work?', { type: 'select', options: yesNo }),
      q('schedule', 'Schedule availability', { type: 'textarea', placeholder: 'Weekdays, shifts, time zones, or constraints' }),
      q('overtime', 'Are you available for occasional overtime?', { type: 'select', options: yesNoAsk }),
      q('startDate', 'Earliest available start date', { type: 'date' }),
      q('noticePeriod', 'Notice period'),
      q('minimumSalary', 'Minimum acceptable annual base salary', { type: 'number' }),
      q('targetSalary', 'Target annual base salary', { type: 'number' }),
      q('hourlyRate', 'Target hourly rate for contract roles', { type: 'number' }),
      q('salaryResponse', 'Default response when compensation is requested', { type: 'select', options: ['Provide target', 'Open to the posted range', 'Discuss with recruiter', 'Ask me for each application'] }),
    ],
  },
  {
    id: 'experience',
    title: 'Employment and experience',
    description: 'Current work, total experience, and frequently requested years of experience.',
    questions: [
      q('currentTitle', 'Current or most recent title'),
      q('currentEmployer', 'Current or most recent employer'),
      q('currentlyEmployed', 'Are you currently employed?', { type: 'select', options: yesNo }),
      q('currentStartDate', 'Current role start date', { type: 'date' }),
      q('reasonForLeaving', 'Reason for considering a change', { type: 'textarea' }),
      q('totalExperience', 'Total years of professional experience', { type: 'number', required: true }),
      q('managementExperience', 'Years of people management experience', { type: 'number' }),
      q('mlExperience', 'Years of machine learning or AI experience', { type: 'number' }),
      q('llmExperience', 'Years of LLM, NLP, or generative AI experience', { type: 'number' }),
      q('dataEngineeringExperience', 'Years of data engineering experience', { type: 'number' }),
      q('pythonExperience', 'Years using Python professionally', { type: 'number' }),
      q('javaExperience', 'Years using Java professionally', { type: 'number' }),
      q('csharpExperience', 'Years using C#/.NET professionally', { type: 'number' }),
      q('sqlExperience', 'Years using SQL professionally', { type: 'number' }),
      q('awsExperience', 'Years using AWS professionally', { type: 'number' }),
      q('azureExperience', 'Years using Azure professionally', { type: 'number' }),
      q('gcpExperience', 'Years using Google Cloud professionally', { type: 'number' }),
      q('industries', 'Industry experience', { type: 'textarea', placeholder: 'Healthcare, finance, government, retail, etc.' }),
      q('employmentHistory', 'Employment history', { type: 'textarea', placeholder: 'Employer, title, location, dates, and reason for leaving' }),
      q('employmentGaps', 'Explain employment gaps if an application requires it', { type: 'textarea', sensitive: true }),
      q('nonCompete', 'Are you subject to a non-compete or other work restriction?', { type: 'select', options: yesNoAsk, sensitive: true }),
      q('workedHereBefore', 'Have you worked for this employer before?', { type: 'select', options: ['Ask me for each application', 'Yes', 'No'] }),
    ],
  },
  {
    id: 'education',
    title: 'Education, credentials, and languages',
    description: 'Education and credentials that employers commonly request in structured forms.',
    questions: [
      q('highestDegree', 'Highest degree earned', { type: 'select', options: ['High school or GED', 'Associate', "Bachelor's", "Master's", 'Doctorate', 'Professional degree', 'Other'] }),
      q('degreeField', 'Primary field of study'),
      q('school', 'School or university'),
      q('graduationDate', 'Graduation date', { type: 'date' }),
      q('additionalEducation', 'Additional education', { type: 'textarea', placeholder: 'Degree, field, school, and graduation date' }),
      q('gpa', 'GPA, only when you want it provided'),
      q('certifications', 'Professional certifications', { type: 'textarea', placeholder: 'Certification, issuer, date, and credential ID' }),
      q('licenses', 'Professional licenses', { type: 'textarea' }),
      q('primaryLanguage', 'Primary language'),
      q('englishProficiency', 'English proficiency', { type: 'select', options: proficiency }),
      q('otherLanguages', 'Other languages and proficiency', { type: 'textarea' }),
      q('publications', 'Publications, patents, or conference presentations', { type: 'textarea' }),
    ],
  },
  {
    id: 'skills',
    title: 'Skills and tools',
    description: 'Searchable evidence used to match jobs and answer skills screening questions.',
    questions: [
      q('coreSkills', 'Core professional skills', { type: 'textarea' }),
      q('programmingLanguages', 'Programming languages', { type: 'textarea', placeholder: 'Language and years used' }),
      q('aiMlTools', 'AI and machine learning tools', { type: 'textarea' }),
      q('llmNlpTools', 'LLM, NLP, and document AI tools', { type: 'textarea' }),
      q('dataTools', 'Data engineering and ETL tools', { type: 'textarea' }),
      q('databases', 'Databases and warehouses', { type: 'textarea' }),
      q('awsServices', 'AWS services', { type: 'textarea', placeholder: 'Bedrock, SageMaker, Lambda, S3, Glue, etc.' }),
      q('azureServices', 'Azure services', { type: 'textarea' }),
      q('gcpServices', 'Google Cloud services', { type: 'textarea' }),
      q('devOps', 'DevOps, CI/CD, and version control tools', { type: 'textarea' }),
      q('infrastructureAsCode', 'Infrastructure as Code tools', { type: 'textarea' }),
      q('containers', 'Containers and orchestration', { type: 'textarea' }),
      q('frontend', 'Front-end frameworks', { type: 'textarea' }),
      q('analytics', 'Analytics and productivity tools', { type: 'textarea' }),
      q('deliveryMethods', 'Agile and delivery methods', { type: 'textarea' }),
    ],
  },
  {
    id: 'disclosures',
    title: 'Voluntary self-identification',
    description: 'Optional demographic, veteran, disability, and accommodation answers.',
    questions: [
      q('gender', 'Gender', { type: 'select', options: ['Male', 'Female', 'Non-binary', 'Another identity', 'Prefer not to answer'], sensitive: true }),
      q('hispanicLatino', 'Are you Hispanic or Latino?', { type: 'select', options: ['Yes', 'No', 'Prefer not to answer'], sensitive: true }),
      q('raceEthnicity', 'Race or ethnicity', { type: 'select', options: ['American Indian or Alaska Native', 'Asian', 'Black or African American', 'Native Hawaiian or Other Pacific Islander', 'White', 'Two or more races', 'Prefer not to answer'], sensitive: true }),
      q('veteranStatus', 'Protected veteran status', { type: 'select', options: ['I am a protected veteran', 'I am not a protected veteran', 'Prefer not to answer'], sensitive: true }),
      q('veteranCategory', 'Protected veteran category, when applicable', { type: 'select', options: ['Disabled veteran', 'Recently separated veteran', 'Active duty wartime or campaign badge veteran', 'Armed Forces service medal veteran', 'More than one category', 'Not applicable', 'Prefer not to answer'], sensitive: true }),
      q('disabilityStatus', 'Voluntary disability self-identification', { type: 'select', options: ['Yes, I have a disability or had one in the past', 'No, I do not have a disability and have not had one in the past', 'I do not wish to answer'], help: 'Use only the exact answer supplied by the candidate. Never infer this answer from a medical condition.', sensitive: true }),
      q('accommodationNeeded', 'Do you want to request an interview accommodation?', { type: 'select', options: ['Yes', 'No', 'Ask me for each application'], sensitive: true }),
      q('accommodationDetails', 'Accommodation details to provide when you approve them', { type: 'textarea', sensitive: true }),
    ],
  },
  {
    id: 'screening',
    title: 'Common application questions',
    description: 'Reusable defaults for referrals, conflicts, contact, and submission review.',
    questions: [
      q('source', 'How did you hear about the opportunity?', { type: 'select', options: ['LinkedIn', 'Company careers site', 'Recruiter', 'Employee referral', 'Job board', 'Professional network', 'Other', 'Ask me for each application'] }),
      q('referral', 'Employee referral name or details'),
      q('relativesAtEmployer', 'Do relatives or household members work for the employer?', { type: 'select', options: ['Ask me for each application', 'Yes', 'No'] }),
      q('conflictOfInterest', 'Could this employment create a conflict of interest?', { type: 'select', options: ['Ask me for each application', 'Yes', 'No'], sensitive: true }),
      q('clientRestriction', 'Are you currently employed by a client or affiliate that may restrict hiring?', { type: 'select', options: ['Ask me for each application', 'Yes', 'No'], sensitive: true }),
      q('debarment', 'Are you excluded, suspended, or debarred from government contracting?', { type: 'select', options: ['Yes', 'No', 'Unsure'], sensitive: true }),
      q('references', 'Professional references', { type: 'textarea', placeholder: 'Name, title, relationship, email, phone, and permission status', sensitive: true }),
      q('interviewAvailability', 'Interview availability', { type: 'textarea' }),
      q('contactPreference', 'Preferred contact method', { type: 'select', options: ['Email', 'Phone', 'Text message', 'LinkedIn message'] }),
      q('coverLetterPreference', 'Cover letter preference', { type: 'select', options: ['Create when optional', 'Create only when required', 'Ask me for each application'] }),
      q('portfolioPermission', 'May public portfolio links be included?', { type: 'select', options: yesNoAsk }),
      q('finalReviewRequired', 'Require my review before every final submission', { type: 'checkbox', required: true }),
      q('truthAttestation', 'I confirm that saved profile answers are accurate and may be used to prepare applications', { type: 'checkbox', required: true }),
      q('saveNewAnswers', 'Save newly approved employer questions for future applications', { type: 'checkbox' }),
    ],
  },
]

export type ProfileAnswers = Record<string, string | boolean>

export const defaultProfile: ProfileAnswers = {
  legalFirstName: 'Erol',
  legalLastName: 'Akarsu',
  preferredName: 'Erol',
  primaryEmail: 'eakarsu@gmail.com',
  city: 'Richmond',
  state: 'VA',
  country: 'United States',
  linkedInUrl: 'https://www.linkedin.com/in/erol-akarsu',
  githubUrl: 'https://github.com/eakarsu',
  authorizedUS: 'Yes',
  citizenship: 'U.S. citizen',
  sponsorshipNow: 'No',
  sponsorshipFuture: 'No',
  publicTrustEligible: 'Yes',
  clearance: 'None',
  totalExperience: '25',
  highestDegree: 'Doctorate',
  primaryLanguage: 'English',
  englishProficiency: 'Professional',
  veteranStatus: 'I am not a protected veteran',
  disabilityStatus: 'I do not wish to answer',
  finalReviewRequired: true,
  truthAttestation: false,
  saveNewAnswers: true,
}
