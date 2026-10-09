export type PubKind = 'conference' | 'journal' | 'preprint';

export interface Publication {
  title: string;
  authors: string; // "Jiho Shin" is highlighted automatically
  venue: string; // short label shown as a tag
  venueFull?: string;
  year: number;
  kind: PubKind;
  href?: string;
  note?: string; // e.g. "to appear"
  award?: string; // e.g. "Distinguished Paper Award"
}

export const publications: Publication[] = [
  // ---------- Conference ----------
  { kind: 'conference', year: 2026, title: 'Demystifying Checker Bugs in Deep Learning Libraries', authors: 'Nima Shiri Harzevili, Mohammad Mahdi Mohajer, Jiho Shin, Moshi Wei, Gias Uddin, Jinqiu Yang, Junjie Wang, Song Wang, Zhen Ming (Jack) Jiang, Nachiappan Nagappan', venue: 'ICSME 2026', venueFull: '42nd IEEE International Conference on Software Maintenance and Evolution', note: 'to appear', href: 'https://arxiv.org/abs/2410.06440' },
  { kind: 'conference', year: 2026, title: 'SecVulEval: Benchmarking LLMs for Real-World C/C++ Vulnerability Detection', authors: 'Md Basim Uddin Ahmed, Nima Shiri Harzevili, Jiho Shin, Hung Viet Pham, Song Wang', venue: 'AIware 2026', venueFull: '3rd ACM International Conference on AI-powered Software, Benchmarks & Datasets track', award: 'Best Benchmark & Dataset Award', href: 'https://dl.acm.org/doi/abs/10.1145/3805760.3814932' },
  { kind: 'conference', year: 2026, title: 'Retrieval-Augmented Test Generation: How Far Are We?', authors: 'Jiho Shin, Nima Shiri Harzevili, Reem Aleithan, Hadi Hemmati, Song Wang', venue: 'ICSE 2026', venueFull: '48th IEEE/ACM International Conference on Software Engineering', href: 'https://dl.acm.org/doi/full/10.1145/3744916.3773163' },
  { kind: 'conference', year: 2025, title: 'Pre-trained Models for Bytecode Instructions', authors: 'Donggyu Kim, Taemin Kim, Jiho Shin, Song Wang, Heeyoul Choi, Jaechang Nam', venue: 'ICST 2025', venueFull: '18th IEEE International Conference on Software Testing, Verification and Validation (short paper)', note: 'short paper', href: 'https://ieeexplore.ieee.org/abstract/document/10989012' },
  { kind: 'conference', year: 2025, title: 'Prompt Engineering or Fine-Tuning: An Empirical Assessment of LLMs for Code', authors: 'Jiho Shin, Clark Tang, Tahmineh Mohati, Maleknaz Nayebi, Song Wang, Hadi Hemmati', venue: 'MSR 2025', venueFull: '22nd IEEE/ACM International Conference on Mining Software Repositories', href: 'https://ieeexplore.ieee.org/document/11025620' },
  { kind: 'conference', year: 2024, title: 'Domain Adaptation for Code Model-Based Unit Test Case Generation', authors: 'Jiho Shin, Sepehr Hashtroudi, Hadi Hemmati, Song Wang', venue: 'ISSTA 2024', venueFull: '33rd ACM SIGSOFT International Symposium on Software Testing and Analysis', href: 'https://dl.acm.org/doi/abs/10.1145/3650212.3680354' },
  { kind: 'conference', year: 2023, title: 'An Empirical Study on the Stability of Explainable Software Defect Prediction', authors: 'Jiho Shin, Reem Aleithan, Jaechang Nam, Junjie Wang, Nima Shiri Harzevili, Song Wang', venue: 'APSEC 2023', venueFull: '30th Asia-Pacific Software Engineering Conference', award: 'Distinguished Paper Award', href: 'https://ieeexplore.ieee.org/abstract/document/10479376' },
  { kind: 'conference', year: 2023, title: 'Automatic Static Vulnerability Detection for Machine Learning Libraries: Are We There Yet?', authors: 'Nima Shiri Harzevili, Jiho Shin, Junjie Wang, Song Wang, Nachiappan Nagappan', venue: 'ISSRE 2023', venueFull: '34th IEEE International Symposium on Software Reliability Engineering', href: 'https://ieeexplore.ieee.org/abstract/document/10301254/' },
  { kind: 'conference', year: 2023, title: 'Characterizing and Understanding Software Security Vulnerabilities in Machine Learning Libraries', authors: 'Nima Shiri Harzevili, Jiho Shin, Junjie Wang, Song Wang, Nachiappan Nagappan', venue: 'MSR 2023', venueFull: '20th IEEE/ACM International Conference on Mining Software Repositories', href: 'https://ieeexplore.ieee.org/abstract/document/10173858/' },
  { kind: 'conference', year: 2022, title: 'API Recommendation for Machine Learning Libraries: How Far Are We?', authors: 'Moshi Wei, Yuchao Huang, Junjie Wang, Jiho Shin, Nima Shiri Harzevili, Song Wang', venue: 'ESEC/FSE 2022', venueFull: '30th ACM Joint European Software Engineering Conference and Symposium on the Foundations of Software Engineering', href: 'https://dl.acm.org/doi/abs/10.1145/3540250.3549124' },
  { kind: 'conference', year: 2020, title: 'Similar Patch Recommendation for Actionable Defect Prediction', authors: 'Jiho Shin, Jaechang Nam', venue: 'KCSE 2020', venueFull: '22nd Korea Conference on Software Engineering', award: 'Distinguished Paper Award', href: 'http://sigsoft.or.kr/wp-content/plugins/uploadingdownloading-non-latin-filename/download.php?id=2506' },

  // ---------- Journal ----------
  { kind: 'journal', year: 2026, title: 'StaAgent: An Agentic Framework for Testing Static Analyzers', authors: 'Elijah Nnorom, Md Basim Uddin Ahmed, Jiho Shin, Hung Viet Pham, Song Wang', venue: 'TOSEM 2026', venueFull: 'ACM Transactions on Software Engineering and Methodology', note: 'to appear', href: 'https://arxiv.org/abs/2507.15892' },
  { kind: 'journal', year: 2026, title: 'From Cool Demos to Production-Ready FMware: Core Challenges and a Technology Roadmap', authors: 'Gopi Krishnan Rajbahadur, Gustavo A. Oliva, Dayi Lin, Jiho Shin, Ahmed E. Hassan', venue: 'TOSEM 2026', venueFull: 'ACM Transactions on Software Engineering and Methodology', href: 'https://dl.acm.org/doi/abs/10.1145/3814604' },
  { kind: 'journal', year: 2026, title: 'Surveying the Benchmarking Landscape of Large Language Models in Code Intelligence', authors: 'Mohammad Abdollahi, Ruixin Zhang, Nima Shiri Harzevili, Jiho Shin, Song Wang, Hadi Hemmati', venue: 'TOSEM 2026', venueFull: 'ACM Transactions on Software Engineering and Methodology', href: 'https://dl.acm.org/doi/10.1145/3800957' },
  { kind: 'journal', year: 2026, title: 'Toward Automated Validation of Language Model Synthesized Test Cases using Semantic Entropy', authors: 'Hamed Taherkhani, Jiho Shin, Muhammad Ammar Tahir, Md Rakib Hossain Misu, Vineet Sunil Gattani, Hadi Hemmati', venue: 'TSE 2026', venueFull: 'IEEE Transactions on Software Engineering', href: 'https://ieeexplore.ieee.org/abstract/document/11395655' },
  { kind: 'journal', year: 2024, title: 'Assessing Evaluation Metrics for Neural Test Oracle Generation', authors: 'Jiho Shin, Hadi Hemmati, Moshi Wei, Song Wang', venue: 'TSE 2024', venueFull: 'IEEE Transactions on Software Engineering (also ICSE 2025 Journal First)', note: 'ICSE-JF 2025', href: 'https://ieeexplore.ieee.org/abstract/document/10609742' },
  { kind: 'journal', year: 2023, title: 'The Good, the Bad, and the Missing: Neural Code Generation for Machine Learning Tasks', authors: 'Jiho Shin, Moshi Wei, Junjie Wang, Lin Shi, Song Wang', venue: 'TOSEM 2023', venueFull: 'ACM Transactions on Software Engineering and Methodology', href: 'https://dl.acm.org/doi/10.1145/3630009' },
  { kind: 'journal', year: 2021, title: 'A Survey of Automatic Code Generation from Natural Language', authors: 'Jiho Shin, Jaechang Nam', venue: 'JIPS 2021', venueFull: 'Journal of Information Processing Systems', href: 'http://xml.jips-k.org/full-text/view?doi=10.3745/JIPS.04.0216' },

  // ---------- Preprints ----------
  { kind: 'preprint', year: 2026, title: 'Trajectory-Aware Benchmark Subset Selection for Cost-Efficient Software Engineering Agent Regression Testing', authors: 'Mahmoud Ayyad, Zehao Wang, Jiho Shin, Ying Zou, Bram Adams', venue: 'arXiv 2026', note: 'under review', href: 'https://arxiv.org/abs/2609.24928' },
  { kind: 'preprint', year: 2026, title: 'NeuroTestGen: Neuro-Symbolic Guided Test Generation with Large Language Models', authors: 'Ruixin Zhang, Jiho Shin, Hung Viet Pham, Song Wang', venue: 'arXiv 2026', note: 'under review', href: 'https://arxiv.org/abs/2609.30178' },
  { kind: 'preprint', year: 2026, title: 'A Large-Scale Empirical Study of Quality Assurance Practices and Gaps in AI Agents', authors: 'Wuyang Dai, Moses Openja, Jiho Shin, Hung Viet Pham, Song Wang', venue: 'arXiv 2026', note: 'under review', href: 'https://arxiv.org/abs/2609.17698' },
  { kind: 'preprint', year: 2026, title: 'Testing Large Vision-Language Models: A Systematic Review', authors: 'Moses Openja, Wuyang Dai, Jiho Shin, Nikta Akbarpour, Claire Davies, Alvine Boaye Belle, Hung Viet Pham, Gias Uddin, Song Wang', venue: 'HAL 2026', note: 'under review', href: 'https://hal.science/hal-05743141/' },
  { kind: 'preprint', year: 2025, title: 'BloomAPR: A Bloom’s Taxonomy-based Framework for Assessing the Capabilities of LLM-Powered APR Solutions', authors: 'Yinghang Ma, Jiho Shin, Leuson Da Silva, Zhen Ming (Jack) Jiang, Song Wang, Foutse Khomh, Shin Hwei Tan', venue: 'arXiv 2025', note: 'under review', href: 'https://arxiv.org/abs/2509.25465' },
];

const selectedTitles = [
  'Retrieval-Augmented Test Generation: How Far Are We?',
  'SecVulEval: Benchmarking LLMs for Real-World C/C++ Vulnerability Detection',
  'StaAgent: An Agentic Framework for Testing Static Analyzers',
  'Assessing Evaluation Metrics for Neural Test Oracle Generation',
];
export const selected = selectedTitles.map((t) => publications.find((p) => p.title === t)!);

export const counts = {
  all: publications.length,
  conference: publications.filter((p) => p.kind === 'conference').length,
  journal: publications.filter((p) => p.kind === 'journal').length,
  preprint: publications.filter((p) => p.kind === 'preprint').length,
  peerReviewed: publications.filter((p) => p.kind !== 'preprint').length,
  awards: publications.filter((p) => p.award).length,
};
