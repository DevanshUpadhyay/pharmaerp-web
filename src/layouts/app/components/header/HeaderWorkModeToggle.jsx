import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Eye, ChevronDown, Check, ArrowRight, LayoutGrid, BarChart3 } from "lucide-react";
import { ROUTES } from "@/constants";
import { useWorkMode, WORK_MODES } from "@/contexts";
import { cn } from "@/lib/utils";

export const HeaderWorkModeToggle = ({ className = "" }) => {
  const { workMode, setWorkMode, openModeModal } = useWorkMode();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const isOp = workMode === WORK_MODES.OPERATION;

  // Global Keyboard Shortcut: Alt + W to toggle work mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && (e.key === "w" || e.key === "W")) {
        const tag = e.target?.tagName?.toLowerCase();
        if (tag === "input" || tag === "textarea" || e.target?.isContentEditable) {
          return;
        }
        e.preventDefault();
        const nextMode = isOp ? WORK_MODES.VIEW : WORK_MODES.OPERATION;
        handleSwitch(nextMode);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOp, location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSwitch = (newMode) => {
    setIsOpen(false);
    if (newMode === workMode) return;

    setWorkMode(newMode, true);

    // Direct navigation to the designated first/default screen of each mode
    if (newMode === WORK_MODES.VIEW) {
      navigate(ROUTES.DASHBOARD);
    } else {
      navigate(ROUTES.SALES);
    }
  };

  return (
    <div className={cn("relative inline-block", className)} ref={containerRef}>
      {/* ── Active Mode Pill Button ──────────────────────────────────── */}
      <button
        type="button"
        id="header-work-mode-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all shadow-2xs select-none cursor-pointer",
          isOp
            ? "border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300 hover:bg-purple-500/20"
            : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20"
        )}
        title={`Current: ${isOp ? "Operation Mode" : "View Mode"} (Alt + W)`}
      >
        {isOp ? (
          <Zap className="size-3.5 text-purple-600 dark:text-purple-400 fill-purple-600/20" />
        ) : (
          <Eye className="size-3.5 text-emerald-600 dark:text-emerald-400" />
        )}
        <span className="hidden sm:inline font-bold">
          {isOp ? "Operation" : "View"} Mode
        </span>
        <ChevronDown
          className={cn(
            "size-3 opacity-60 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* ── Dropdown Menu ────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-border bg-surface p-2 shadow-xl z-[70]"
          >
            <div className="px-2.5 py-1.5 border-b border-border mb-1.5">
              <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                Switch Work Mode
              </span>
              <span className="float-right text-[10px] text-text-muted/70 font-mono">
                Alt + W
              </span>
            </div>

            {/* Option 1: Operation Mode */}
            <button
              type="button"
              onClick={() => handleSwitch(WORK_MODES.OPERATION)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg p-2.5 text-left text-xs font-medium transition-colors cursor-pointer",
                isOp
                  ? "bg-purple-500/10 text-purple-700 dark:text-purple-300 font-bold"
                  : "text-text hover:bg-surface-hover"
              )}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "flex size-7 items-center justify-center rounded-lg border",
                    isOp
                      ? "border-purple-500/40 bg-purple-500/20 text-purple-600"
                      : "border-border bg-surface-alt text-text-muted"
                  )}
                >
                  <LayoutGrid className="size-3.5" />
                </div>
                <div>
                  <div className="leading-tight font-bold">Operation Mode</div>
                  <div className="text-[10px] text-text-muted leading-tight mt-0.5">
                    Fast POS billing & store transactions
                  </div>
                </div>
              </div>
              {isOp && <Check className="size-4 text-purple-600 dark:text-purple-400" />}
            </button>

            {/* Option 2: View Mode */}
            <button
              type="button"
              onClick={() => handleSwitch(WORK_MODES.VIEW)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg p-2.5 text-left text-xs font-medium transition-colors mt-1 cursor-pointer",
                !isOp
                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold"
                  : "text-text hover:bg-surface-hover"
              )}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "flex size-7 items-center justify-center rounded-lg border",
                    !isOp
                      ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-600"
                      : "border-border bg-surface-alt text-text-muted"
                  )}
                >
                  <BarChart3 className="size-3.5" />
                </div>
                <div>
                  <div className="leading-tight font-bold">View Mode</div>
                  <div className="text-[10px] text-text-muted leading-tight mt-0.5">
                    Dashboards, reports & analytics
                  </div>
                </div>
              </div>
              {!isOp && <Check className="size-4 text-emerald-600 dark:text-emerald-400" />}
            </button>

            {/* Footer link to open full Welcome Modal */}
            <div className="border-t border-border mt-1.5 pt-1.5">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  openModeModal();
                }}
                className="flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-[11px] text-text-muted hover:text-text hover:bg-surface-hover transition-colors cursor-pointer"
              >
                <span>Customize work preferences</span>
                <ArrowRight className="size-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderWorkModeToggle;

