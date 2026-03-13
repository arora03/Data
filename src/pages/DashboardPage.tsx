import { motion } from "framer-motion";
import AppShell from "@/components/AppShell";
import { useStoryClusters, useStaticData } from "@/hooks/useNexusData";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight, ArrowDownRight, Minus, AlertTriangle,
  Newspaper, Activity, TrendingUp
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const trendIcon = (t: string) =>
  t === "up" ? <ArrowUpRight className="w-3 h-3 text-success" /> :
    t === "down" ? <ArrowDownRight className="w-3 h-3 text-destructive" /> :
      <Minus className="w-3 h-3 text-muted-foreground" />;

const sentimentBadge = (s: string) => {
  const map: Record<string, string> = {
    positive: "badge-positive", negative: "badge-negative",
    neutral: "badge-neutral", mixed: "badge-warning",
  };
  return map[s] || "badge-neutral";
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const fadeUp = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

const DashboardPage = () => {
  const navigate = useNavigate();
  const { data: storyClusters = [], isLoading } = useStoryClusters();
  const { trendingTopics, timelineData, heatmapData } = useStaticData();

  const totalArticles = storyClusters.reduce((a: number, s: any) => a + s.articleCount, 0);

  if (isLoading) {
    return (
      <AppShell>
        <div className="section-dashboard p-6 lg:p-8 space-y-8 max-w-[1400px] mx-auto min-h-[50vh] flex flex-col items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" />
          <div className="text-muted-foreground animate-pulse text-sm">Loading real-time API insights...</div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="section-dashboard p-6 lg:p-8 space-y-8 max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center gap-3 mb-1.5">
            <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="live-dot" />
              <span className="ml-1.5 uppercase tracking-wider font-medium">Live</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            A real-time overview of global narratives and emerging signals.
          </p>
          <div className="section-divider" />
        </motion.div>

        {/* Stats Row */}
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" variants={stagger} initial="hidden" animate="show">
          {[
            { label: "Total Articles", value: totalArticles.toLocaleString(), icon: Newspaper, change: "+12.4%" },
            { label: "Active Stories", value: storyClusters.length.toString(), icon: Activity, change: "+3" },
            { label: "Contradictions", value: storyClusters.reduce((a, s) => a + s.contradictions, 0).toString(), icon: AlertTriangle, change: "+5" },
            { label: "Trending Topics", value: trendingTopics.length.toString(), icon: TrendingUp, change: "+2" },
          ].map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="surface-card p-4 relative overflow-hidden">
              <div className="accent-line-top bg-gradient-to-r from-transparent via-section-dashboard/20 to-transparent" />
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-[11px] text-success font-medium font-mono">{stat.change}</span>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="text-[11px] text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Top Stories */}
        <motion.div variants={stagger} initial="hidden" animate="show">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Top Stories</h2>
            <button className="text-[11px] text-primary hover:underline">View all</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {storyClusters.map((story) => (
              <motion.div
                key={story.id}
                variants={fadeUp}
                className="surface-card p-5 cursor-pointer group relative overflow-hidden"
                onClick={() => navigate(`/story/${story.id}`)}
              >
                <div className="accent-line-top bg-gradient-to-r from-section-dashboard/25 via-transparent to-transparent" />
                <div className="flex items-center justify-between mb-3">
                  <span className={sentimentBadge(story.sentiment)}>{story.sentiment}</span>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    {trendIcon(story.trend)}
                    <span>{story.updatedAt}</span>
                  </div>
                </div>
                <h3 className="font-medium text-sm mb-2 group-hover:text-primary transition-colors duration-250 leading-snug">
                  {story.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{story.summary}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {story.sources.slice(0, 3).map((s) => (
                    <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{s}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/30 text-[11px] text-muted-foreground">
                  <span className="font-mono">{story.articleCount} articles</span>
                  <span>{story.narrativeCount} narratives</span>
                  {story.contradictions > 0 && (
                    <span className="flex items-center gap-1 text-destructive">
                      <AlertTriangle className="w-3 h-3" />
                      {story.contradictions}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Two Column: Trending + Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trending Topics */}
          <motion.div className="surface-card p-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.3 }}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Trending Topics</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
              {trendingTopics.map((topic, i) => (
                <motion.div
                  key={topic.name}
                  className="surface-card min-w-[150px] p-3.5 shrink-0 cursor-pointer"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.04, duration: 0.25 }}
                >
                  <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">{topic.category}</div>
                  <div className="font-medium text-sm mb-2">{topic.name}</div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-muted-foreground">{topic.count}</span>
                    <span className="text-success flex items-center gap-0.5">
                      <ArrowUpRight className="w-3 h-3" />
                      +{topic.change}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Activity Timeline */}
          <motion.div className="surface-card p-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.3 }}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">News Activity</h2>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="fillDashboard" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(228 60% 71%)" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="hsl(228 60% 71%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(216 14% 14%)" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(216 10% 46%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(216 10% 46%)" }} axisLine={false} tickLine={false} width={30} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(216 24% 10%)",
                    border: "1px solid hsl(216 14% 14%)",
                    borderRadius: "6px",
                    fontSize: "11px",
                    color: "hsl(216 16% 93%)",
                    boxShadow: "0 4px 16px -4px rgba(0,0,0,0.3)",
                  }}
                />
                <Area type="monotone" dataKey="articles" stroke="hsl(228 60% 71%)" fill="url(#fillDashboard)" strokeWidth={1.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Global Activity Heatmap */}
        <motion.div className="surface-card p-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.3 }}>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">Global Activity</h2>
          <p className="text-[11px] text-muted-foreground mb-5">News intensity by region</p>
          <svg viewBox="0 0 700 340" className="w-full h-[260px]">
            <rect x="0" y="0" width="700" height="340" fill="transparent" />
            {heatmapData.map((region, i) => (
              <g key={region.region}>
                <motion.circle
                  cx={region.x} cy={region.y}
                  r={25 + region.intensity * 16}
                  fill="hsl(228 60% 71%)"
                  opacity={region.intensity * 0.06}
                  initial={{ r: 0, opacity: 0 }}
                  animate={{ r: 25 + region.intensity * 16, opacity: region.intensity * 0.06 }}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.5 }}
                />
                <motion.circle
                  cx={region.x} cy={region.y}
                  r={3 + region.intensity * 3}
                  fill="hsl(228 60% 71%)"
                  opacity={0.5}
                  initial={{ r: 0 }}
                  animate={{ r: 3 + region.intensity * 3 }}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
                  className="cursor-pointer"
                />
                <text
                  x={region.x} y={region.y - 12 - region.intensity * 6}
                  textAnchor="middle" fill="hsl(216 16% 93%)" fontSize="10" fontWeight="500"
                  className="pointer-events-none select-none" opacity="0.6"
                >{region.region}</text>
                <text
                  x={region.x} y={region.y - region.intensity * 6}
                  textAnchor="middle" fill="hsl(216 10% 46%)" fontSize="9"
                  className="pointer-events-none select-none font-mono"
                >{region.articles} articles</text>
              </g>
            ))}
          </svg>
        </motion.div>
      </div>
    </AppShell>
  );
};

export default DashboardPage;

// [Stage 25% | Commit 11 | 2026-03-24 23:33]

// [Stage 50% | Commit 17 | 2026-03-24 23:33]

// [Stage 75% | Commit 22 | 2026-03-24 23:33]

// [Stage 100% | Commit 33 | 2026-03-24 23:34]
