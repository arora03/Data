import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, TrendingUp, Network, Swords, Clock, Lightbulb,
  Search, Settings, ChevronLeft, ChevronRight, Newspaper
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Trending Topics", path: "/trending", icon: TrendingUp },
  { label: "Narrative Explorer", path: "/narratives", icon: Network },
  { label: "Contradiction Map", path: "/contradictions", icon: Swords },
  { label: "Timeline View", path: "/timeline", icon: Clock },
  { label: "Impact Insights", path: "/insights", icon: Lightbulb },
  { label: "Search / Query", path: "/search", icon: Search },
];

const bottomItems = [
  { label: "Settings", path: "/settings", icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();

  return (
    <motion.aside
      className="h-full flex flex-col border-r border-border/40 bg-sidebar shrink-0 relative z-20"
      animate={{ width: collapsed ? 60 : 220 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-border/30">
        <Link to="/" className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-7 h-7 rounded-md bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
            <Newspaper className="w-4 h-4 text-primary" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                className="font-semibold text-base tracking-tight text-foreground whitespace-nowrap"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
              >
                Infera
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
