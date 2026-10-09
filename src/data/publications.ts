export type PubKind = 'conference' | 'journal' | 'preprint';

export interface Publication {
  title: string;
  authors: string; // "Jiho Shin" is highlighted automatically
  venue: string;
  year: number;
  kind: PubKind;
  href?: string;
  note?: string; // e.g. "Distinguished Paper"
}

export const publications: Publication[] = [
  // Conference
  { kind: 'conference', year: 2026, title: 'Retrieval-Augmented Test Generation: How Far Are We?', authors: 'Jiho Shin, N.S. Harzevili, R. Aleithan, H. Hemmati, S. Wang', venue: 'ICSE 2026', note: 'to appear', href: 'https://arxiv.org/abs/2409.12682' },
  { kind: 'conference', year: 2025, title: 'Pre-trained Models for Bytecode Instructions', authors: 'D.G. Kim, T.M. Kim, Jiho Shin, S. Wang, H.Y. Choi, J.C. Nam', venue: 'ICST 2025', note: 'short paper', href: 'https://ieeexplore.ieee.org/abstract/document/10989012' },
  { kind: 'conference', year: 2025, title: 'Prompt Engineering or Fine-Tuning: An Empirical Assessment of LLMs for Code', authors: 'Jiho Shin, C. Tang, T. Mohati, M. Nayebi, S. Wang, H. Hemmati', venue: 'MSR 2025', href: 'https://doi.org/10.1145/3650212.3680354' },
  { kind: 'conference', year: 2024, title: 'Domain Adaptation for Code Model-based Unit Test Case Generation', authors: 'Jiho Shin, S. Hashtroudi, H. Hemmati, S. Wang', venue: 'ISSTA 2024', href: 'https://ieeexplore.ieee.org/abstract/document/10479376' },
  { kind: 'conference', year: 2023, title: 'An Empirical Study on the Stability of Explainable Software Defect Prediction', authors: 'Jiho Shin, R. Aleithan, J.C. Nam, J.J. Wang, N.S. Harzevili, S. Wang', venue: 'APSEC 2023', note: 'Distinguished Paper', href: 'https://ieeexplore.ieee.org/abstract/document/10301254' },
  { kind: 'conference', year: 2023, title: 'Automatic Static Vulnerability Detection for Machine Learning Libraries: Are We There Yet?', authors: 'N.S. Harzevili, Jiho Shin, J.J. Wang, S. Wang, N. Nagappan', venue: 'ISSRE 2023', href: 'https://ieeexplore.ieee.org/abstract/document/10173858' },
  { kind: 'conference', year: 2023, title: 'Characterizing and Understanding Software Security Vulnerabilities in Machine Learning Libraries', authors: 'N.S. Harzevili, Jiho Shin, J.J. Wang, S. Wang, N. Nagappan', venue: 'MSR 2023', href: 'https://dl.acm.org/doi/abs/10.1145/3540250.3549124' },
  { kind: 'conference', year: 2022, title: 'API Recommendation for Machine Learning Libraries: How Far Are We?', authors: 'M.S. Wei, Y.C. Huang, J.J. Wang, Jiho Shin, N.S. Harzevili, S. Wang', venue: 'ESEC/FSE 2022' },
  { kind: 'conference', year: 2020, title: 'Similar Patch Recommendation for Actionable Defect Prediction', authors: 'Jiho Shin, J.C. Nam', venue: 'KCSE 2020', note: 'Distinguished Paper', href: 'http://sigsoft.or.kr/kcse2020/' },
  // Journal
  { kind: 'journal', year: 2024, title: 'Assessing Evaluation Metrics for Neural Test Oracle Generation', authors: 'Jiho Shin, H. Hemmati, M.S. Wei, S. Wang', venue: 'TSE 2024', note: 'ICSE-JF’25', href: 'https://ieeexplore.ieee.org/abstract/document/10609742' },
  { kind: 'journal', year: 2023, title: 'The Good, the Bad, and the Missing: Neural Code Generation for Machine Learning Tasks', authors: 'Jiho Shin, M.S. Wei, J.J. Wang, L. Shi, S. Wang', venue: 'TOSEM 2023', href: 'https://doi.org/10.1145/3630009' },
  { kind: 'journal', year: 2021, title: 'A Survey of Automatic Code Generation from Natural Language', authors: 'Jiho Shin, J.C. Nam', venue: 'JIPS 2021', href: 'http://xml.jips-k.org/full-text/view?doi=10.3745/JIPS.04.0216' },
  // Preprints
  { kind: 'preprint', year: 2025, title: 'BloomAPR: A Bloom’s Taxonomy-based Framework for Assessing LLM-Powered APR Solutions', authors: 'Y. Ma, Jiho Shin, L.D. Silva, Z.M. Jiang, S. Wang, F. Khomh, S.H. Tan', venue: 'arXiv 2025', note: 'under review', href: 'https://arxiv.org/abs/2509.25465' },
  { kind: 'preprint', year: 2025, title: 'Toward Automated Validation of Language Model Synthesized Test Cases using Semantic Entropy', authors: 'H. Taherkhani, Jiho Shin, M.A. Tahir, M.R.H. Misu, V.S. Gattani, H. Hemmati', venue: 'arXiv 2025', note: 'under review', href: 'https://arxiv.org/abs/2411.08254' },
  { kind: 'preprint', year: 2025, title: 'Surveying the Benchmarking Landscape of Large Language Models in Code Intelligence', authors: 'M. Abdollahi, R. Zhang, N.S. Harzevili, Jiho Shin, S. Wang, H. Hemmati', venue: 'HAL 2025', note: 'under review', href: 'https://hal.science/hal-05183398' },
  { kind: 'preprint', year: 2025, title: 'StaAgent: An Agentic Framework for Testing Static Analyzers', authors: 'E. Nnorom, M.B.U. Ahmed, Jiho Shin, H.V. Pham, S. Wang', venue: 'arXiv 2025', note: 'under review', href: 'https://arxiv.org/abs/2507.15892' },
  { kind: 'preprint', year: 2025, title: 'SecVulEval: Benchmarking LLMs for Real-World C/C++ Vulnerability Detection', authors: 'M.B.U. Ahmed, N.S. Harzevili, Jiho Shin, H.V. Pham, S. Wang', venue: 'arXiv 2025', note: 'under review', href: 'https://arxiv.org/abs/2505.19828' },
  { kind: 'preprint', year: 2024, title: 'Checker Bug Detection and Repair in Deep Learning Libraries', authors: 'N.S. Harzevili, M. Mohajer, Jiho Shin, M.S. Wei, M. Uddin, Y. Yang, S. Wang, W. Wang, Z.M. Jiang, N. Nagappan', venue: 'arXiv 2024', note: 'under review', href: 'https://arxiv.org/abs/2410.06440' },
];

export const selected = publications.filter((p) =>
  [
    'Retrieval-Augmented Test Generation: How Far Are We?',
    'Prompt Engineering or Fine-Tuning: An Empirical Assessment of LLMs for Code',
    'Assessing Evaluation Metrics for Neural Test Oracle Generation',
    'Domain Adaptation for Code Model-based Unit Test Case Generation',
  ].includes(p.title),
);
