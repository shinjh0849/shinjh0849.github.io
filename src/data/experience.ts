export interface TimelineEntry {
  period: string;
  location: string;
  role: string;
  org: string;
  orgLinks?: { label: string; href: string }[];
  bullets: string[];
  subrole?: { title: string; bullets: string[] };
}

export const experience: TimelineEntry[] = [
  {
    period: 'Sep 2025 – present',
    location: 'Kingston, ON',
    role: 'Postdoctoral Research Fellow',
    org: 'Queen’s University',
    orgLinks: [
      { label: 'SAIL', href: 'https://sail.cs.queensu.ca/' },
      { label: 'MCIS', href: 'https://mcis.cs.queensu.ca/' },
    ],
    bullets: ['Conducting and advising graduate researchers on Agentic SE studies.'],
  },
  {
    period: 'Jan 2025 – May 2025',
    location: 'Remote · Palo Alto, CA',
    role: 'RLEF / CodeGenAgent Lead',
    org: 'Turing',
    bullets: [
      'Synthesized Chain-of-Thought code data for reinforcement learning with execution feedback (RLEF).',
      'Improved code generation agents by reinforcing soundness and completeness in test generation.',
    ],
  },
  {
    period: 'Oct 2024 – Feb 2025',
    location: 'Remote · Charlottetown, PE',
    role: 'Applied AI Engineering Intern',
    org: 'HGS (Hinduja Group Companies)',
    bullets: [
      'Built a Copilot Studio ChatBot for the job application process.',
      'Enhanced the homepage ChatBot to guide prospective clients with lead and sales details.',
    ],
  },
  {
    period: 'Sep 2021 – present',
    location: 'Toronto, ON',
    role: 'AI4SE & SE4AI Researcher',
    org: 'York University',
    bullets: [
      'AI for SE: Built agents and LLM frameworks to automate testing, generate code, and repair using mined software data.',
      'SE for AI: Engineered reliable, secure, interpretable AI systems by testing, validating, and benchmarking LLMs and ML/DL libraries.',
    ],
    subrole: {
      title: 'Teaching Assistant',
      bullets: [
        'Coordinated graders, office hours, and lab materials for Software Design, Software Engineering Testing, and Software Tools.',
      ],
    },
  },
  {
    period: 'Mar 2019 – Feb 2021',
    location: 'Pohang, South Korea',
    role: 'Software Engineering Researcher',
    org: 'Handong Global University',
    bullets: [
      'Proposed an actionable defect prediction framework improving F1 by 22% over baseline ML models.',
      'Conducted a survey on 32 papers generating source code from natural language descriptions.',
    ],
    subrole: {
      title: 'Teaching Assistant',
      bullets: ['Supported courses in Computer Vision, Data Structures, C Programming, and Software Engineering.'],
    },
  },
  {
    period: 'Feb 2014 – Jan 2016',
    location: 'Gyeonggi, South Korea',
    role: 'Military Interpreter',
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
      'Supervisors: Dr. Song Wang, Dr. Hadi Hemmati.',
      'Thesis: Investigating the Effectiveness of Large Language Models in Automated Software Engineering. <a href="https://yorkspace.library.yorku.ca/items/68255a60-14ab-4b02-a50b-74ab7dd3da6b" target="_blank" rel="noreferrer">Draft ↗</a>',
    ],
  },
  {
    period: '2019 – 2021',
    location: 'Pohang, South Korea',
    role: 'M.Sc., Computer Science & Electrical Engineering',
    org: 'Handong Global University',
    bullets: [
      'Research: Code generation; actionable and explainable defect prediction.',
      'Supervisor: Dr. Jaechang Nam.',
      'Thesis: Actionable Defect Prediction. <a href="https://handong.dcollection.net/srch/srchDetail/200000379792?localeParam=en" target="_blank" rel="noreferrer">PDF ↗</a>',
    ],
  },
  {
    period: '2012 – 2019',
    location: 'Pohang, South Korea',
    role: 'B.Sc., Computer Science & Electrical Engineering',
    org: 'Handong Global University',
    bullets: ['Specializations: Web applications, human-computer interaction, computer vision.'],
  },
];
