import { motion } from "framer-motion";
import AppShell from "@/components/AppShell";
import { contradictions, storyClusters } from "@/data/mockData";
import { useState } from "react";
import { AlertTriangle, ArrowLeftRight, Zap, Shield } from "lucide-react";

const allContradictions = Object.values(contradictions).flat();

const ContradictionMapPage = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = allContradictions[activeIdx];

  if (!active) return null;

  const story = storyClusters.find((s) => s.id === active.storyId);

  return (
    <AppShell>
      <div className="section-contradiction p-6 lg:p-8 max-w-[1200px] mx-auto">
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center gap-2 mb-1.5">
            <Shield className="w-4 h-4 text-section-contradiction" />
            <h1 className="text-xl font-semibold tracking-tight">Contradiction Map</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Identify conflicting perspectives and opposing claims across sources.
          </p>
          <div className="section-divider" />
        </motion.div>

        {/* Contradiction selector */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {allContradictions.map((c, i) => (
            <motion.button
              key={c.id}
              onClick={() => setActiveIdx(i)}
              className={`surface-card px-4 py-2.5 text-[11px] font-medium whitespace-nowrap shrink-0 transition-all relative overflow-hidden ${activeIdx === i ? "border-section-contradiction/30" : ""
                }`}
              whileTap={{ scale: 0.98 }}
            >
              {activeIdx === i && <div className="accent-line-top bg-section-contradiction/40" />}
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-3 h-3 text-section-contradiction" />
                <span className="text-foreground font-mono">Score: {c.score}%</span>
              </div>
              <div className="text-muted-foreground mt-0.5 text-left">
                {c.claimA.text.slice(0, 30)}…
              </div>
            </motion.button>
          ))}
        </div>

        {/* Split view */}
        <motion.div
          key={active.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {story && (
            <div className="text-[11px] text-muted-foreground mb-4">
              Story: <span className="text-foreground font-medium">{story.title}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
            {/* Claim A */}
            <div className="surface-card p-5 border-l-2 border-success/40">
              <div className="flex items-center gap-2 mb-3">
                <span className="badge-positive">Claim A</span>
                <span className="text-[11px] font-mono text-muted-foreground ml-auto">{(active.claimA.confidence * 100).toFixed(0)}%</span>
              </div>
              <blockquote className="text-sm font-medium leading-relaxed mb-4 text-foreground/90">
                "{active.claimA.text}"
              </blockquote>
              <div className="text-[10px] text-muted-foreground mb-1.5 uppercase tracking-wider">Supported by</div>
              <div className="flex flex-wrap gap-1.5">
                {active.claimA.sources.map((s) => (
                  <span key={s} className="text-[11px] px-2 py-0.5 rounded bg-muted text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>

            {/* Center score */}
            <div className="flex flex-col items-center justify-center px-3">
              <div
                className="w-14 h-14 rounded-full border border-section-contradiction/30 flex items-center justify-center mb-2"
              >
                <span className="text-base font-semibold font-mono text-section-contradiction">{active.score}</span>
              </div>
              <ArrowLeftRight className="w-4 h-4 text-muted-foreground mb-1" />
              <span className="text-[10px] text-muted-foreground text-center">Contradiction<br />Score</span>
            </div>

            {/* Claim B */}
            <div className="surface-card p-5 border-l-2 border-section-contradiction/40">
              <div className="flex items-center gap-2 mb-3">
                <span className="badge-negative">Claim B</span>
                <span className="text-[11px] font-mono text-muted-foreground ml-auto">{(active.claimB.confidence * 100).toFixed(0)}%</span>
              </div>
              <blockquote className="text-sm font-medium leading-relaxed mb-4 text-foreground/90">
                "{active.claimB.text}"
              </blockquote>
              <div className="text-[10px] text-muted-foreground mb-1.5 uppercase tracking-wider">Supported by</div>
              <div className="flex flex-wrap gap-1.5">
                {active.claimB.sources.map((s) => (
                  <span key={s} className="text-[11px] px-2 py-0.5 rounded bg-muted text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* AI Explanation */}
          <motion.div
            className="surface-card p-5 mt-5"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.25 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-3.5 h-3.5 text-section-contradiction" />
              <span className="text-sm font-medium">AI Analysis</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {active.explanation}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </AppShell>
  );
};

export default ContradictionMapPage;
