import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart3,
  LayoutGrid,
  Layers,
  Building2,
  Store,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  ShoppingCart,
  Package,
  Boxes,
  Users,
  Truck,
  IndianRupee,
  FileCheck2,
  Calculator,
  Settings,
  Eye,
  Zap,
} from "lucide-react";

import { ROUTES } from "@/constants";
import { useWorkMode, WORK_MODES } from "@/contexts";
import useAuth from "@/features/auth/hooks/useAuth";
import { UIButton, UIBadge } from "@/components/ui";
import PharmacyStorefrontIllustration from "@/components/PharmacyStorefrontIllustration";

export const ChooseWorkModeView = ({ onSelectMode, isModal = false, showHeader = false }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setWorkMode } = useWorkMode();

  const handleSelect = (mode) => {
    setWorkMode(mode, true);
    if (onSelectMode) {
      onSelectMode(mode);
    } else {
      if (mode === WORK_MODES.VIEW) {
        navigate(ROUTES.DASHBOARD, { replace: true });
      } else {
        navigate(ROUTES.SALES, { replace: true });
      }
    }
  };

  const userInitials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "DU";

  const userRole = user?.role?.name || user?.role || "Super Admin";

  const operationalModules = [
    { label: "Sales & Billing", icon: ShoppingCart },
    { label: "Purchase", icon: Package },
    { label: "Inventory", icon: Boxes },
    { label: "Customers", icon: Users },
    { label: "Suppliers", icon: Truck },
    { label: "Payments", icon: IndianRupee },
    { label: "GST & Compliance", icon: FileCheck2 },
    { label: "Accounting", icon: Calculator },
    { label: "Reports", icon: BarChart3 },
    { label: "Settings", icon: Settings },
  ];

  return (
    <div
      className={`relative flex min-h-screen w-full flex-col items-center justify-between overflow-x-hidden bg-bg px-4 sm:px-6 lg:px-8 py-6 selection:bg-primary-soft selection:text-primary ${
        isModal ? "min-h-auto py-2" : ""
      }`}
    >
      {/* Background ambient lighting blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -left-32 size-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute top-1/4 -right-32 size-96 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 size-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* ── Top Bar / Header (Only when standalone) ──────────────────── */}
      {showHeader && (
        <header className="relative z-10 flex w-full max-w-6xl items-center justify-between pb-4">
          {/* Brand Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7.5V16.5L12 22L22 16.5V7.5L12 2ZM13 7V11H17V13H13V17H11V13H7V11H11V7H13Z" />
              </svg>
            </div>
            <div>
              <div className="text-base font-extrabold tracking-tight text-text leading-tight">
                Pahuch <span className="text-primary font-bold">ERP</span>
              </div>
              <div className="text-[11px] font-medium text-text-muted leading-tight">
                Pharmacy Management System
              </div>
            </div>
          </div>

          {/* User Profile Pill */}
          {user && (
            <div className="flex items-center gap-2.5 rounded-full border border-border bg-surface/80 backdrop-blur-md px-3 py-1.5 shadow-2xs">
              <div className="flex size-7 items-center justify-center rounded-full bg-surface-alt border border-border text-xs font-bold text-text">
                {userInitials}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-text leading-tight">
                  {user.fullName || "User"}
                </span>
                <span className="text-[10px] font-medium text-text-muted leading-tight capitalize">
                  {typeof userRole === "string" ? userRole.replace(/[-_]/g, " ") : "Member"}
                </span>
              </div>
            </div>
          )}
        </header>
      )}

      {/* ── Main Content Area ───────────────────────────────────────────── */}
      <main className="relative z-10 flex w-full max-w-6xl flex-1 flex-col items-center justify-center py-4 sm:py-6">
        {/* Welcome Back Pill */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-3"
        >
          <UIBadge
            variant="soft"
            color="neutral"
            size="md"
            rounded="full"
            className="border-border bg-surface/90 shadow-2xs font-medium text-xs px-3.5 py-1"
          >
            👋 Welcome Back
          </UIBadge>
        </motion.div>

        {/* Headline & Subhead */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="text-center max-w-2xl mb-8"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-text leading-tight">
            Choose how you want to{" "}
            <span className="text-emerald-500 dark:text-emerald-400">work today</span>
          </h1>
          <p className="mt-2 text-sm text-text-muted leading-relaxed">
            Access insights across your business or run day-to-day pharmacy operations.
          </p>
        </motion.div>

        {/* ── The Two Cards: View Mode vs Operation Mode ─────────────────── */}
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* ═══════════ CARD 1: VIEW MODE (INSIGHTS) ═══════════ */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="group relative flex flex-col justify-between rounded-2xl border-2 border-emerald-500/30 hover:border-emerald-500/70 bg-surface/85 backdrop-blur-md p-6 sm:p-7 shadow-lg shadow-emerald-500/5 hover:shadow-emerald-500/15 transition-all duration-300"
          >
            {/* Top Row: Icon, Title & Badge */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex size-13 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 shadow-inner group-hover:scale-105 transition-transform duration-200">
                    <BarChart3 className="size-6 text-emerald-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-text">
                      View Mode
                    </h2>
                    <p className="text-xs text-text-muted mt-0.5 line-clamp-2">
                      Monitor performance and get a consolidated view of your business across workspace, company, and branches.
                    </p>
                  </div>
                </div>

                <UIBadge
                  variant="soft"
                  color="success"
                  size="sm"
                  rounded="full"
                  className="shrink-0 flex items-center gap-1.5 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
                >
                  <Eye className="size-3" />
                  <span>Insights & Monitoring</span>
                </UIBadge>
              </div>

              {/* Hierarchy Stepper Box: Workspace -> Company -> Branch */}
              <div className="my-5 rounded-xl border border-border bg-surface-alt/60 p-4">
                <div className="grid grid-cols-3 items-center text-center gap-2">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-surface border border-border text-text shadow-2xs mb-1.5">
                      <Layers className="size-4 text-emerald-500" />
                    </div>
                    <span className="text-xs font-bold text-text truncate max-w-full">
                      Workspace Level
                    </span>
                    <span className="text-[10px] text-text-muted truncate max-w-full">
                      Overall business view
                    </span>
                  </div>

                  {/* Arrow 1 */}
                  <div className="flex justify-center -mt-3">
                    <ChevronRight className="size-4 text-text-muted/60" />
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-surface border border-border text-text shadow-2xs mb-1.5">
                      <Building2 className="size-4 text-emerald-500" />
                    </div>
                    <span className="text-xs font-bold text-text truncate max-w-full">
                      Company Level
                    </span>
                    <span className="text-[10px] text-text-muted truncate max-w-full">
                      Select & view company
                    </span>
                  </div>

                  {/* Arrow 2 */}
                  <div className="flex justify-center -mt-3">
                    <ChevronRight className="size-4 text-text-muted/60" />
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-surface border border-border text-text shadow-2xs mb-1.5">
                      <Store className="size-4 text-emerald-500" />
                    </div>
                    <span className="text-xs font-bold text-text truncate max-w-full">
                      Branch Level
                    </span>
                    <span className="text-[10px] text-text-muted truncate max-w-full">
                      Select & view branch
                    </span>
                  </div>
                </div>
              </div>

              {/* Pillars / Bullet List */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs font-medium text-text-muted py-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                  <span>Multi-level Dashboards</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                  <span>Consolidated Reports</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                  <span>Performance Insights</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6 pt-2">
              <UIButton
                variant="primary"
                size="lg"
                endIcon={<ArrowRight className="size-4" />}
                onClick={() => handleSelect(WORK_MODES.VIEW)}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-600/25 border-emerald-500/40 rounded-xl"
              >
                Continue in View Mode
              </UIButton>
            </div>
          </motion.div>

          {/* ═══════════ CARD 2: OPERATION MODE (DAY-TO-DAY) ═══════════ */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="group relative flex flex-col justify-between rounded-2xl border-2 border-purple-500/30 hover:border-purple-500/70 bg-surface/85 backdrop-blur-md p-6 sm:p-7 shadow-lg shadow-purple-500/5 hover:shadow-purple-500/15 transition-all duration-300"
          >
            {/* Top Row: Icon, Title & Badge */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex size-13 items-center justify-center rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-500 shadow-inner group-hover:scale-105 transition-transform duration-200">
                    <LayoutGrid className="size-6 text-purple-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-text">
                      Operation Mode
                    </h2>
                    <p className="text-xs text-text-muted mt-0.5 line-clamp-2">
                      Run daily pharmacy operations like sales, purchase, inventory, billing, and more.
                    </p>
                  </div>
                </div>

                <UIBadge
                  variant="soft"
                  color="purple"
                  size="sm"
                  rounded="full"
                  className="shrink-0 flex items-center gap-1.5 border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/10"
                >
                  <Zap className="size-3" />
                  <span>Day-to-Day Operations</span>
                </UIBadge>
              </div>

              {/* 10-Module Interactive Matrix */}
              <div className="my-5 rounded-xl border border-border bg-surface-alt/60 p-3">
                <div className="grid grid-cols-5 gap-2">
                  {operationalModules.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={idx}
                        className="flex flex-col items-center justify-center rounded-lg border border-border/80 bg-surface/80 p-2 text-center shadow-2xs group/tile hover:border-purple-500/40 hover:bg-surface transition-all"
                      >
                        <div className="flex size-7 items-center justify-center rounded-md bg-purple-500/10 text-purple-500 mb-1 group-hover/tile:scale-110 transition-transform">
                          <IconComponent className="size-3.5" />
                        </div>
                        <span className="text-[10px] font-semibold text-text truncate max-w-full leading-tight">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pillars / Bullet List */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs font-medium text-text-muted py-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-purple-500 shrink-0" />
                  <span>Complete ERP Operations</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-purple-500 shrink-0" />
                  <span>Real-time Inventory</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-purple-500 shrink-0" />
                  <span>Billing & GST Ready</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6 pt-2">
              <UIButton
                variant="primary"
                size="lg"
                endIcon={<ArrowRight className="size-4" />}
                onClick={() => handleSelect(WORK_MODES.OPERATION)}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-md shadow-purple-600/25 border-purple-500/40 rounded-xl"
              >
                Continue in Operation Mode
              </UIButton>
            </div>
          </motion.div>
        </div>
      </main>

      {/* ── Footer Storefront Illustration ─────────────────────────────── */}
      {!isModal && (
        <footer className="relative z-10 w-full max-w-4xl pt-4 pb-2">
          <PharmacyStorefrontIllustration />
        </footer>
      )}
    </div>
  );
};

export default ChooseWorkModeView;

