export interface TimelineEntry {
  period: string;
  location: string;
  role: string;
  org: string;
  orgLinks?: { label: string; href: string }[];
  bullets: string[];
  subrole?: { title: string; period?: string; bullets: string[] };
}

export const experience: TimelineEntry[] = [
  {
    period: 'May 2026 – present',
    location: 'Toronto, ON',
    role: 'Postdoctoral Research Fellow',
    org: 'York University — Lassonde School of Engineering',
    bullets: [
      'Researching agentic software engineering: how humans interact with agents, and how agents and tools collaborate on complex SE tasks.',
    ],
  },
  {
    period: 'Sep 2025 – Apr 2026',
    location: 'Kingston, ON',
    role: 'Postdoctoral Research Fellow',
    org: 'Queen’s University',
    orgLinks: [
      { label: 'SAIL', href: 'https://sail.cs.queensu.ca/' },
      { label: 'MCIS', href: 'https://mcis.cs.queensu.ca/' },
    ],
    bullets: ['Conducted and advised graduate researchers on agentic SE studies.'],
  },
  {
    period: 'Jan 2024 – May 2025',
    location: 'Remote · Palo Alto, CA',
    role: 'RLEF / CodeGenAgent Lead',
    org: 'Turing',
    bullets: [
      'Synthesized chain-of-thought code data for reinforcement learning with execution feedback (RLEF).',
      'Improved code generation agents by reinforcing soundness and completeness in test generation.',
    ],
  },
  {
    period: 'Oct 2024 – Feb 2025',
    location: 'Remote · Charlottetown, PE',
    role: 'Applied AI Engineering Intern',
    org: 'HGS (Hinduja Group Companies)',
    bullets: [
      'Built a Copilot Studio chatbot for the job application process.',
      'Enhanced the homepage chatbot to guide prospective clients with lead and sales details.',
    ],
  },
  {
    period: 'Sep 2021 – Aug 2025',
    location: 'Toronto, ON',
    role: 'Graduate Research Assistant',
    org: 'York University',
    bullets: [
      'AI for SE: built agents and LLM frameworks to automate testing, generate code, and repair programs using mined software data.',
      'SE for AI: engineered reliable, secure, interpretable AI systems by testing, validating, and benchmarking LLMs and ML/DL libraries.',
    ],
    subrole: {
      title: 'Teaching Assistant',
      period: 'Sep 2021 – Apr 2025',
      bullets: ['Coordinated graders, office hours, and lab materials for Software Design, Software Engineering Testing, and Software Tools.'],
    },
  },
  {
    period: 'Mar 2019 – Feb 2021',
    location: 'Pohang, South Korea',
    role: 'Graduate Research Assistant',
    org: 'Handong Global University',
    bullets: [
      'Proposed an actionable defect prediction framework improving F1 by 22% over baseline ML models.',
      'Conducted a survey of 32 papers on generating source code from natural language descriptions.',
    ],
    subrole: {
      title: 'Teaching Assistant',
      period: 'Sep 2018 – Dec 2020',
      bullets: ['Supported courses in Computer Vision, Data Structures, C Programming, and Software Engineering.'],
    },
  },
  {
    period: 'Feb 2014 – Jan 2016',
    location: 'Gyeonggi, South Korea',
    role: 'Military Interpreter (KOR/ENG)',
    org: 'Republic of Korea Navy',
    bullets: [
      'Provided on-site interpretation for naval operations, training, and joint exercises.',
      'Facilitated multilingual communication between units and visiting delegations.',
    ],
  },
];

export const education: TimelineEntry[] = [
  {
    period: '2021 – 2025',
    location: 'Toronto, Canada',
    role: 'Ph.D., Electrical Engineering & Computer Science',
    org: 'York University',
    bullets: [
      'Research: AI/ML for SE, code generation, automated software testing, LLM for SE.',
      'Supervisors: <a href="https://scholar.google.com/citations?hl=en&user=gzyZhcgAAAAJ" target="_blank" rel="noreferrer">Dr. Song Wang</a> and <a href="https://scholar.google.com/citations?user=TznXpSIAAAAJ&hl=en" target="_blank" rel="noreferrer">Dr. Hadi Hemmati</a>.',
      'Thesis: <a href="https://yorkspace.library.yorku.ca/items/68255a60-14ab-4b02-a50b-74ab7dd3da6b" target="_blank" rel="noreferrer">Investigating the Effectiveness of Large Language Models in Automated Software Engineering ↗</a> — EECS Outstanding Thesis Award (2026).',
    ],
  },
  {
    period: '2019 – 2021',
    location: 'Pohang, South Korea',
    role: 'M.Sc., Computer Science & Electrical Engineering',
    org: 'Handong Global University',
    bullets: [
      'Research: code generation; actionable and explainable defect prediction.',
      'Supervisor: <a href="https://scholar.google.com/citations?user=BYm7qHAAAAAJ" target="_blank" rel="noreferrer">Dr. Jaechang Nam</a>.',
      'Thesis: <a href="https://handong.dcollection.net/srch/srchDetail/200000379792?localeParam=en" target="_blank" rel="noreferrer">Actionable Defect Prediction ↗</a>',
    ],
  },
  {
    period: '2012 – 2019',
    location: 'Pohang, South Korea',
    role: 'B.Sc., Computer Science & Electrical Engineering',
    org: 'Handong Global University',
    bullets: ['Specializations: web applications, human-computer interaction, computer vision.'],
  },
];
