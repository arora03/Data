export interface StoryCluster {
  id: string;
  title: string;
  summary: string;
  entities: string[];
  articleCount: number;
  sentiment: "positive" | "negative" | "neutral" | "mixed";
  narrativeCount: number;
  contradictions: number;
  updatedAt: string;
  category: string;
  importance: number;
  trend: "up" | "down" | "stable";
  sources: string[];
}

export interface Narrative {
  id: string;
  storyId: string;
  title: string;
  summary: string;
  sources: string[];
  sentiment: "positive" | "negative" | "neutral";
  confidence: number;
  articleCount: number;
}

export interface Contradiction {
  id: string;
  storyId: string;
  score: number;
  explanation: string;
  claimA: { text: string; sources: string[]; confidence: number };
  claimB: { text: string; sources: string[]; confidence: number };
}

export interface Article {
  id: string;
  storyId: string;
  headline: string;
  source: string;
  timestamp: string;
  sentiment: "positive" | "negative" | "neutral";
  summary: string;
}

export interface TimelinePoint {
  date: string;
  articles: number;
  stories: number;
  contradictions: number;
  label?: string;
}

export interface TrendingTopic {
  name: string;
  count: number;
  change: number;
  category: string;
}

export interface ImpactData {
  whyItMatters: string;
  whoIsAffected: string;
  futureOutlook: string;
}

export const storyClusters: StoryCluster[] = [
  {
    id: "s1", title: "US-China AI Chip Export Controls",
    summary: "The US tightens restrictions on AI chip exports to China, reshaping the global semiconductor landscape and sparking a new phase of tech decoupling.",
    entities: ["Nvidia", "TSMC", "US Government", "China", "ASML"],
    articleCount: 847, sentiment: "mixed", narrativeCount: 5, contradictions: 3,
    updatedAt: "2 min ago", category: "Geopolitics", importance: 9, trend: "up",
    sources: ["Reuters", "Bloomberg", "SCMP", "FT"],
  },
  {
    id: "s2", title: "European Central Bank Rate Decision",
    summary: "ECB holds rates steady amid conflicting signals on inflation and economic growth across the Eurozone, markets divided on next move.",
    entities: ["ECB", "Christine Lagarde", "Eurozone", "Deutsche Bank"],
    articleCount: 523, sentiment: "neutral", narrativeCount: 3, contradictions: 2,
    updatedAt: "15 min ago", category: "Economy", importance: 7, trend: "stable",
    sources: ["FT", "Bloomberg", "Reuters"],
  },
  {
    id: "s3", title: "OpenAI GPT-5 Launch & Safety Debate",
    summary: "OpenAI unveils GPT-5 with unprecedented capabilities while facing scrutiny from safety researchers and regulatory bodies worldwide.",
    entities: ["OpenAI", "Sam Altman", "EU AI Act", "Google DeepMind"],
    articleCount: 1243, sentiment: "mixed", narrativeCount: 6, contradictions: 4,
    updatedAt: "5 min ago", category: "AI", importance: 10, trend: "up",
    sources: ["TechCrunch", "MIT Tech Review", "Wired", "Bloomberg"],
  },
  {
    id: "s4", title: "Global Renewable Energy Record",
    summary: "Record renewable energy deployments in 2025 clash with continued fossil fuel investments, creating complex transition dynamics.",
    entities: ["IEA", "OPEC", "Tesla", "Saudi Aramco"],
    articleCount: 389, sentiment: "positive", narrativeCount: 4, contradictions: 2,
    updatedAt: "30 min ago", category: "Energy", importance: 8, trend: "up",
    sources: ["Reuters", "IEA", "Bloomberg Green"],
  },
  {
    id: "s5", title: "Southeast Asian Startup Boom",
    summary: "VC investment surges in Southeast Asia as investors pivot from China, driving record valuations across fintech and e-commerce.",
    entities: ["Grab", "GoTo", "Sequoia Capital", "Temasek"],
    articleCount: 215, sentiment: "positive", narrativeCount: 3, contradictions: 1,
    updatedAt: "1 hr ago", category: "Startups", importance: 6, trend: "up",
    sources: ["TechCrunch", "Nikkei Asia", "Bloomberg"],
  },
  {
    id: "s6", title: "Quantum Computing Milestone",
    summary: "Google achieves quantum error correction breakthrough, bringing practical quantum computing closer to reality.",
    entities: ["Google", "IBM", "Microsoft", "IonQ"],
    articleCount: 178, sentiment: "positive", narrativeCount: 2, contradictions: 1,
    updatedAt: "2 hr ago", category: "Technology", importance: 7, trend: "up",
    sources: ["Nature", "Wired", "Ars Technica"],
  },
];

export const narratives: Record<string, Narrative[]> = {
  s3: [
    { id: "n1", storyId: "s3", title: "GPT-5 represents a leap in AI capability", summary: "Proponents highlight unprecedented reasoning, coding, and multimodal abilities that could transform industries.", sources: ["TechCrunch", "The Verge", "Wired"], sentiment: "positive", confidence: 0.89, articleCount: 412 },
    { id: "n2", storyId: "s3", title: "Safety risks remain unaddressed", summary: "Researchers warn alignment and safety testing are insufficient for GPT-5's expanded capabilities.", sources: ["MIT Tech Review", "Nature", "The Guardian"], sentiment: "negative", confidence: 0.82, articleCount: 287 },
    { id: "n3", storyId: "s3", title: "Regulatory frameworks are inadequate", summary: "Policymakers struggle to keep pace with rapid AI development, leaving governance gaps.", sources: ["Reuters", "Financial Times", "Politico"], sentiment: "negative", confidence: 0.76, articleCount: 198 },
    { id: "n4", storyId: "s3", title: "Commercial opportunity is massive", summary: "Enterprise adoption signals trillion-dollar market potential for advanced AI systems.", sources: ["Bloomberg", "Forbes", "WSJ"], sentiment: "positive", confidence: 0.91, articleCount: 156 },
    { id: "n5", storyId: "s3", title: "Open-source alternatives closing gap", summary: "Meta's Llama and Mistral narrow the gap, challenging OpenAI's competitive moat.", sources: ["Ars Technica", "VentureBeat"], sentiment: "neutral", confidence: 0.72, articleCount: 112 },
    { id: "n6", storyId: "s3", title: "Job displacement fears intensify", summary: "Studies suggest AI could automate 30% of knowledge work tasks within 3 years.", sources: ["BBC", "The Economist"], sentiment: "negative", confidence: 0.68, articleCount: 78 },
  ],
  s1: [
    { id: "n7", storyId: "s1", title: "Export controls protect national security", summary: "US officials argue restrictions prevent adversarial AI advancement.", sources: ["Washington Post", "Politico"], sentiment: "positive", confidence: 0.85, articleCount: 312 },
    { id: "n8", storyId: "s1", title: "Controls harm US tech competitiveness", summary: "Industry leaders warn restrictions push innovation overseas.", sources: ["Bloomberg", "CNBC"], sentiment: "negative", confidence: 0.79, articleCount: 245 },
    { id: "n9", storyId: "s1", title: "China accelerates self-sufficiency", summary: "Chinese firms fast-track domestic chip development in response.", sources: ["SCMP", "Nikkei Asia"], sentiment: "neutral", confidence: 0.88, articleCount: 190 },
  ],
};

export const contradictions: Record<string, Contradiction[]> = {
  s3: [
    { id: "c1", storyId: "s3", score: 87, explanation: "These claims directly conflict on the safety evaluation of GPT-5. OpenAI's internal testing shows positive results, while independent researchers found critical alignment failures.", claimA: { text: "GPT-5 demonstrates safe and aligned behavior in extensive testing", sources: ["OpenAI Blog", "TechCrunch"], confidence: 0.78 }, claimB: { text: "Independent testing reveals significant alignment failures in edge cases", sources: ["MIT Tech Review", "Nature"], confidence: 0.84 } },
    { id: "c2", storyId: "s3", score: 74, explanation: "A fundamental tension between innovation speed and regulatory oversight. Each side presents valid economic and safety arguments.", claimA: { text: "AI regulation would stifle innovation and US competitiveness", sources: ["Forbes", "WSJ"], confidence: 0.73 }, claimB: { text: "Regulation is essential to prevent catastrophic AI risks", sources: ["The Guardian", "Nature"], confidence: 0.81 } },
    { id: "c3", storyId: "s3", score: 69, explanation: "Conflicting economic projections about AI's labor market impact. Historical data shows mixed patterns with previous automation waves.", claimA: { text: "GPT-5 will create more jobs than it eliminates", sources: ["Bloomberg", "McKinsey"], confidence: 0.65 }, claimB: { text: "AI automation threatens 30% of knowledge worker tasks", sources: ["BBC", "The Economist"], confidence: 0.77 } },
  ],
  s1: [
    { id: "c5", storyId: "s1", score: 82, explanation: "Core disagreement on the effectiveness of export controls. Evidence suggests partial circumvention through third-party channels.", claimA: { text: "Export controls effectively limit China's AI capabilities", sources: ["Washington Post", "Defense One"], confidence: 0.72 }, claimB: { text: "China is successfully circumventing export restrictions", sources: ["SCMP", "Reuters"], confidence: 0.78 } },
  ],
};

export const articles: Record<string, Article[]> = {
  s3: [
    { id: "a1", storyId: "s3", headline: "OpenAI Unveils GPT-5 with Unprecedented Reasoning Capabilities", source: "TechCrunch", timestamp: "2h ago", sentiment: "positive", summary: "GPT-5 demonstrates breakthrough performance across reasoning, coding, and multimodal tasks." },
    { id: "a2", storyId: "s3", headline: "Safety Researchers Raise Alarm Over GPT-5 Deployment Timeline", source: "MIT Tech Review", timestamp: "3h ago", sentiment: "negative", summary: "Leading safety researchers express deep concern over the rapid deployment schedule." },
    { id: "a3", storyId: "s3", headline: "Enterprise AI Spending Expected to Double Following GPT-5", source: "Bloomberg", timestamp: "4h ago", sentiment: "positive", summary: "Corporate AI budgets surge as enterprises race to integrate GPT-5 capabilities." },
    { id: "a4", storyId: "s3", headline: "EU Fast-Tracks AI Act Implementation Amid GPT-5 Concerns", source: "Reuters", timestamp: "5h ago", sentiment: "neutral", summary: "European regulators accelerate AI governance frameworks." },
    { id: "a5", storyId: "s3", headline: "Meta's Llama 4 Benchmarks Challenge OpenAI's Lead", source: "Ars Technica", timestamp: "6h ago", sentiment: "neutral", summary: "Open-source model shows competitive results on key benchmarks." },
    { id: "a6", storyId: "s3", headline: "Labor Unions Call for AI Displacement Protections", source: "BBC", timestamp: "7h ago", sentiment: "negative", summary: "Major unions demand policy safeguards against AI job losses." },
  ],
  s1: [
    { id: "a7", storyId: "s1", headline: "US Expands AI Chip Export Restrictions to New Categories", source: "Washington Post", timestamp: "30m ago", sentiment: "neutral", summary: "New regulations extend to additional chip architectures and equipment." },
    { id: "a8", storyId: "s1", headline: "Nvidia Reports Revenue Impact from China Export Controls", source: "Bloomberg", timestamp: "1h ago", sentiment: "negative", summary: "Quarterly results show significant China revenue decline." },
    { id: "a9", storyId: "s1", headline: "Huawei Unveils Domestic AI Chip to Counter US Restrictions", source: "SCMP", timestamp: "2h ago", sentiment: "neutral", summary: "Chinese tech giant accelerates alternative chip development." },
  ],
};

export const timelineData: TimelinePoint[] = [
  { date: "Mar 1", articles: 120, stories: 8, contradictions: 3 },
  { date: "Mar 3", articles: 145, stories: 9, contradictions: 4 },
  { date: "Mar 5", articles: 89, stories: 6, contradictions: 2 },
  { date: "Mar 7", articles: 210, stories: 14, contradictions: 7, label: "GPT-5 Leak" },
  { date: "Mar 9", articles: 178, stories: 11, contradictions: 5 },
  { date: "Mar 11", articles: 312, stories: 18, contradictions: 9, label: "Chip Ban Update" },
  { date: "Mar 13", articles: 267, stories: 15, contradictions: 8 },
  { date: "Mar 15", articles: 198, stories: 12, contradictions: 6 },
  { date: "Mar 17", articles: 445, stories: 22, contradictions: 12, label: "GPT-5 Launch" },
  { date: "Mar 19", articles: 389, stories: 19, contradictions: 10 },
  { date: "Mar 21", articles: 523, stories: 25, contradictions: 14, label: "Safety Report" },
  { date: "Mar 22", articles: 478, stories: 23, contradictions: 11 },
];

export const trendingTopics: TrendingTopic[] = [
  { name: "GPT-5 Launch", count: 1243, change: 340, category: "AI" },
  { name: "Chip Export Controls", count: 847, change: 120, category: "Geopolitics" },
  { name: "ECB Rate Decision", count: 523, change: 45, category: "Economy" },
  { name: "Renewable Energy", count: 389, change: 67, category: "Energy" },
  { name: "Quantum Computing", count: 178, change: 89, category: "Technology" },
  { name: "SE Asia Startups", count: 215, change: 156, category: "Startups" },
];

export const impactAnalysis: Record<string, ImpactData> = {
  s3: {
    whyItMatters: "GPT-5 represents a paradigm shift in AI capability that will reshape every knowledge-intensive industry. The tension between rapid deployment and safety testing could set precedents for how transformative technologies are governed globally.",
    whoIsAffected: "Knowledge workers across legal, finance, consulting, and creative industries face the most immediate impact. Enterprises investing in AI integration will see early advantages, while smaller firms risk falling behind. Regulators and policymakers must adapt frameworks in real-time.",
    futureOutlook: "Expect rapid iteration toward GPT-6 within 12–18 months. Key inflection points include: autonomous agent capabilities, the first major AI-caused incident triggering regulatory action, and potential market consolidation as smaller AI labs struggle to compete.",
  },
  s1: {
    whyItMatters: "The semiconductor supply chain is undergoing its most significant restructuring since the Cold War. This creates new strategic dependencies, reshapes technology alliances, and may permanently alter the global innovation landscape.",
    whoIsAffected: "US chip companies face $12B+ annual revenue loss. Asian manufacturers see mixed impacts—TSMC benefits from nearshoring while Chinese firms accelerate self-sufficiency. Allied nations face difficult choices between economic interests and security alignment.",
    futureOutlook: "China's domestic chip capabilities will reach 7nm within 2–3 years. The US faces diminishing leverage as alternatives emerge. Expect escalation cycles, potential negotiation windows, and growing pressure on allied nations to choose sides.",
  },
};

export const heatmapData = [
  { region: "North America", x: 180, y: 140, intensity: 0.9, articles: 1420 },
  { region: "Europe", x: 380, y: 120, intensity: 0.75, articles: 980 },
  { region: "East Asia", x: 540, y: 150, intensity: 0.85, articles: 1180 },
  { region: "South Asia", x: 480, y: 190, intensity: 0.5, articles: 420 },
  { region: "Middle East", x: 420, y: 175, intensity: 0.6, articles: 560 },
  { region: "Africa", x: 370, y: 230, intensity: 0.3, articles: 180 },
  { region: "South America", x: 230, y: 260, intensity: 0.35, articles: 210 },
  { region: "Oceania", x: 580, y: 280, intensity: 0.25, articles: 120 },
];
