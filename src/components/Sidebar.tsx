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
