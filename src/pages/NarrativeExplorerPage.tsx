import { motion } from "framer-motion";
import AppShell from "@/components/AppShell";
import { useStoryClusters, useAllNarratives } from "@/hooks/useNexusData";
import { useState } from "react";
import { Network } from "lucide-react";

const sentimentColor = (s: string) =>
  s === "positive" ? "hsl(148 38% 42%)" : s === "negative" ? "hsl(0 45% 52%)" : "hsl(228 60% 71%)";

const NarrativeExplorerPage = () => {
  const { data: storyClusters = [] } = useStoryClusters();
  const { data: allNarrs = [] } = useAllNarratives();

  const [selected, setSelected] = useState<string | null>(null);
  const selectedNarr = allNarrs.find((n: any) => n.id === selected);

  const cx = 350, cy = 220;
  const nodePositions = allNarrs.map((_, i) => ({
    x: cx + Math.cos((i / allNarrs.length) * Math.PI * 2 - Math.PI / 2) * (140 + (i % 3) * 30),
    y: cy + Math.sin((i / allNarrs.length) * Math.PI * 2 - Math.PI / 2) * (100 + (i % 2) * 40),
  }));

  const edges: Array<[number, number]> = [];
  allNarrs.forEach((n1, i) => {
    allNarrs.forEach((n2, j) => {
      if (i < j && n1.storyId === n2.storyId) edges.push([i, j]);
    });
  });

  return (
    <AppShell>
      <div className="section-narrative flex h-full">
        {/* Graph Canvas */}
        <div className="flex-1 p-6 lg:p-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="flex items-center gap-2 mb-1.5">
              <Network className="w-4 h-4 text-section-narrative" />
              <h1 className="text-xl font-semibold tracking-tight">Narrative Explorer</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Explore how different narratives form around the same event.
            </p>
            <div className="section-divider" />
          </motion.div>

          <div className="surface-card p-4 h-[calc(100%-110px)]">
            <div className="flex items-center gap-5 mb-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Neutral</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-success" />Agreement</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-destructive" />Contradiction</span>
            </div>

            <svg viewBox="0 0 700 440" className="w-full h-full min-h-[380px]">
              {edges.map(([a, b], i) => {
                const sameSign = allNarrs[a].sentiment === allNarrs[b].sentiment;
                const conflict = (allNarrs[a].sentiment === "positive" && allNarrs[b].sentiment === "negative") ||
                  (allNarrs[a].sentiment === "negative" && allNarrs[b].sentiment === "positive");
                return (
                  <motion.line
                    key={i}
                    x1={nodePositions[a].x} y1={nodePositions[a].y}
                    x2={nodePositions[b].x} y2={nodePositions[b].y}
                    stroke={conflict ? "hsl(0 45% 52%)" : sameSign ? "hsl(148 38% 42%)" : "hsl(228 60% 71%)"}
                    strokeWidth="1"
                    opacity="0.15"
                    strokeDasharray={conflict ? "4 3" : undefined}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.15 }}
                    transition={{ delay: 0.15 + i * 0.02, duration: 0.4 }}
                  />
                );
              })}

              {allNarrs.map((n, i) => {
                const pos = nodePositions[i];
                const isSelected = selected === n.id;
                const fill = sentimentColor(n.sentiment);
                const r = 12 + n.confidence * 7;

                return (
                  <g
                    key={n.id}
                    className="cursor-pointer"
                    onClick={() => setSelected(isSelected ? null : n.id)}
                  >
                    <motion.circle
                      cx={pos.x} cy={pos.y} r={r + 8}
                      fill={fill} opacity={isSelected ? 0.12 : 0}
                      animate={{ opacity: isSelected ? 0.12 : 0 }}
                      transition={{ duration: 0.25 }}
                    />
                    <motion.circle
                      cx={pos.x} cy={pos.y} r={r}
                      fill={fill} opacity={isSelected ? 0.6 : 0.3}
                      stroke={fill} strokeWidth={isSelected ? 1.5 : 0.5}
                      initial={{ r: 0 }}
                      animate={{ r }}
                      transition={{ delay: 0.08 + i * 0.03, duration: 0.35 }}
                    />
                    <text
                      x={pos.x} y={pos.y + 3}
                      textAnchor="middle" fill="currentColor" fontSize="8"
                      className="pointer-events-none select-none font-mono fill-foreground"
                    >
                      {(n.confidence * 100).toFixed(0)}%
                    </text>
                    <text
                      x={pos.x} y={pos.y - r - 5}
                      textAnchor="middle" fontSize="9" fontWeight="500"
                      className="pointer-events-none select-none fill-foreground"
                      opacity="0.5"
                    >
                      {n.title.length > 22 ? n.title.slice(0, 22) + "…" : n.title}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right Detail Panel */}
        <motion.div
          className="w-72 border-l border-border/40 bg-card/50 p-5 overflow-y-auto shrink-0"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.25 }}
        >
          {selectedNarr ? (
            <motion.div key={selectedNarr.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              <div className={`inline-block mb-3 ${selectedNarr.sentiment === "positive" ? "badge-positive" : selectedNarr.sentiment === "negative" ? "badge-negative" : "badge-neutral"}`}>
                {selectedNarr.sentiment}
              </div>
              <h3 className="font-medium text-base mb-2">{selectedNarr.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{selectedNarr.summary}</p>

              <div className="space-y-4">
                <div>
                  <div className="text-[11px] text-muted-foreground mb-1.5 uppercase tracking-wider">Confidence</div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-section-narrative"
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedNarr.confidence * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <div className="text-[11px] font-mono text-muted-foreground mt-1">{(selectedNarr.confidence * 100).toFixed(0)}%</div>
                </div>

                <div>
                  <div className="text-[11px] text-muted-foreground mb-1.5 uppercase tracking-wider">Sources</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNarr.sources.map((s) => (
                      <span key={s} className="text-[11px] px-2 py-0.5 rounded bg-muted text-muted-foreground">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-3 border-t border-border/30">
                  <span className="font-mono">{selectedNarr.articleCount} articles</span>
                  <span>Story: {storyClusters.find((s) => s.id === selectedNarr.storyId)?.title?.slice(0, 18)}…</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center text-muted-foreground text-sm mt-20">
              <p className="mb-1">Select a node to view details</p>
              <p className="text-[11px]">Click on any narrative in the graph</p>
            </div>
          )}
        </motion.div>
      </div>
    </AppShell>
  );
};

export default NarrativeExplorerPage;
