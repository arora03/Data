import { motion } from "framer-motion";
import AppShell from "@/components/AppShell";
import { timelineData } from "@/data/mockData";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from "recharts";
import { Clock } from "lucide-react";

const TimelinePage = () => {
  const labeled = timelineData.filter((d) => d.label);

  return (
    <AppShell>
      <div className="section-timeline p-6 lg:p-8 max-w-[1200px] mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center gap-2 mb-1.5">
            <Clock className="w-4 h-4 text-section-timeline" />
            <h1 className="text-xl font-semibold tracking-tight">Timeline View</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Track how stories evolve and gain momentum over time.
          </p>
          <div className="section-divider" />
        </motion.div>

        {/* Main timeline chart */}
        <motion.div className="surface-card p-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.3 }}>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Article Volume</h2>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="tlFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(190 35% 48%)" stopOpacity={0.12} />
                  <stop offset="100%" stopColor="hsl(190 35% 48%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(216 14% 14%)" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(216 10% 46%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(216 10% 46%)" }} axisLine={false} tickLine={false} width={30} />
              <Tooltip
                contentStyle={{ background: "hsl(216 24% 10%)", border: "1px solid hsl(216 14% 14%)", borderRadius: "6px", fontSize: "11px", color: "hsl(216 16% 93%)" }}
              />
              <Area type="monotone" dataKey="articles" stroke="hsl(190 35% 48%)" fill="url(#tlFill)" strokeWidth={1.5} dot={(props: any) => {
                const point = timelineData[props.index];
                if (!point?.label) return <circle key={props.index} cx={0} cy={0} r={0} />;
                return (
                  <circle
                    key={props.index}
                    cx={props.cx} cy={props.cy} r={4}
                    fill="hsl(190 35% 48%)" stroke="hsl(216 28% 7%)" strokeWidth={2}
                    className="cursor-pointer"
                  />
                );
              }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Event Markers */}
        <motion.div className="surface-card p-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.3 }}>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-5">Key Events</h2>
          <div className="relative">
            <div className="absolute top-3 left-0 right-0 h-px bg-border/50" />
            <div className="flex justify-between relative">
              {labeled.map((point, i) => (
                <motion.div
                  key={point.date}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.25 }}
                >
                  <div className="w-2 h-2 rounded-full bg-section-timeline border-2 border-background z-10 mb-2" />
                  <div className="surface-card p-3 text-center max-w-[130px]">
                    <div className="text-[11px] font-medium mb-0.5">{point.label}</div>
                    <div className="text-[10px] text-muted-foreground">{point.date}</div>
                    <div className="text-[11px] font-mono text-section-timeline mt-1">{point.articles} articles</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contradictions over time */}
        <motion.div className="surface-card p-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.3 }}>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Contradictions Over Time</h2>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(216 14% 14%)" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(216 10% 46%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(216 10% 46%)" }} axisLine={false} tickLine={false} width={25} />
              <Tooltip
                contentStyle={{ background: "hsl(216 24% 10%)", border: "1px solid hsl(216 14% 14%)", borderRadius: "6px", fontSize: "11px", color: "hsl(216 16% 93%)" }}
              />
              <Bar dataKey="contradictions" fill="hsl(0 45% 52%)" radius={[3, 3, 0, 0]} opacity={0.6} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </AppShell>
  );
};

export default TimelinePage;
