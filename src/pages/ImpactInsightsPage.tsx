import { motion } from "framer-motion";
import AppShell from "@/components/AppShell";
import { useStoryClusters } from "@/hooks/useNexusData";
import { Globe, DollarSign, Eye, Sparkles } from "lucide-react";

const ImpactInsightsPage = () => {
  const { data: storyClusters = [] } = useStoryClusters();
  
  const storyImpacts = storyClusters.map((story: any) => ({
    story,
    impact: {
      whyItMatters: "This fundamentally alters the landscape: " + story.summary.slice(0, 60) + "..., indicating major structural shifts.",
      whoIsAffected: "Global markets, policymakers, and consumers engaged with " + (story.category || "this sector") + ".",
      futureOutlook: "Expect heightened volatility and regulatory scrutiny as the situation continues to evolve rapidly in the coming months.",
    }
  }));

  return (
    <AppShell>
      <div className="section-impact p-6 lg:p-8 max-w-[1000px] mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-4 h-4 text-section-impact" />
            <h1 className="text-xl font-semibold tracking-tight">Impact Insights</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            AI-generated analysis explaining why this story matters.
          </p>
          <div className="section-divider" />
        </motion.div>

        {storyImpacts.map(({ story, impact }, si) => (
          <motion.div
            key={story.id}
            className="surface-card overflow-hidden relative"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.08, duration: 0.25 }}
          >
            <div className="accent-line-top bg-gradient-to-r from-section-impact/25 via-transparent to-transparent" />

            <div className="p-5 border-b border-border/30">
              <h2 className="font-medium text-base mb-1">{story.title}</h2>
              <p className="text-sm text-muted-foreground">{story.summary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/30">
              {[
                { icon: Globe, title: "Why It Matters", text: impact.whyItMatters, color: "text-section-impact" },
                { icon: DollarSign, title: "Who Is Affected", text: impact.whoIsAffected, color: "text-warning" },
                { icon: Eye, title: "Future Outlook", text: impact.futureOutlook, color: "text-accent" },
              ].map((section, i) => (
                <motion.div
                  key={section.title}
                  className="p-5"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: si * 0.08 + i * 0.06, duration: 0.25 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <section.icon className={`w-3.5 h-3.5 ${section.color}`} />
                    <span className="text-sm font-medium">{section.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{section.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </AppShell>
  );
};

export default ImpactInsightsPage;
