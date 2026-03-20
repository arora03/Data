import { motion } from "framer-motion";
import AppShell from "@/components/AppShell";
import { useStaticData } from "@/hooks/useNexusData";
import { ArrowUpRight, TrendingUp, Flame } from "lucide-react";

const categoryColors: Record<string, string> = {
  AI: "text-accent",
  Geopolitics: "text-destructive",
  Economy: "text-primary",
  Technology: "text-primary",
  Energy: "text-warning",
  Startups: "text-success",
};

const TrendingPage = () => {
  const { trendingTopics } = useStaticData();
  
  return (
    <AppShell>
      <div className="section-trending p-6 lg:p-8 max-w-[1000px] mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center gap-2 mb-1.5">
            <Flame className="w-4 h-4 text-section-trending" />
            <h1 className="text-xl font-semibold tracking-tight">Trending Topics</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Topics gaining rapid global attention based on volume and velocity.
          </p>
          <div className="section-divider" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trendingTopics.map((topic, i) => (
            <motion.div
              key={topic.name}
              className="surface-card p-5 cursor-pointer group relative overflow-hidden"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
            >
              <div className="accent-line-top bg-gradient-to-r from-section-trending/25 via-transparent to-transparent" />
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${categoryColors[topic.category] || "text-muted-foreground"}`}>
                  {topic.category}
                </span>
                <span className="text-[11px] text-section-trending flex items-center gap-0.5 font-mono">
                  <ArrowUpRight className="w-3 h-3" />
                  +{topic.change}%
                </span>
              </div>
              <h3 className="text-base font-medium mb-3 group-hover:text-section-trending transition-colors duration-250">{topic.name}</h3>
              
              <div className="mb-3">
                <div className="h-1 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="heat-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(topic.change / 3.5, 100)}%` }}
                    transition={{ delay: 0.2 + i * 0.04, duration: 0.5 }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="font-mono text-[11px] text-muted-foreground">{topic.count.toLocaleString()} mentions</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppShell>
  );
};

export default TrendingPage;
