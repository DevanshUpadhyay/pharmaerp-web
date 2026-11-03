// src/features/dashboard/components/company/CompanyDashboardHeader.jsx

import { Calendar, ChevronDown, RotateCw, Building2, Store } from "lucide-react";
import { UIBadge, UIButton } from "@/components/ui";
import { cn } from "@/lib/utils";

const TIMEFRAMES = ["Today", "This Month", "This Quarter", "This Year"];

export const CompanyDashboardHeader = ({
  companyInfo,
  timeframe = "This Month",
  onTimeframeChange,
  dateRange = "Oct 01, 2026 - Oct 31, 2026",
  onRefresh,
  isLoading = false,
}) => {
  const displayDateRange = companyInfo?.dateRangeFormatted || dateRange;
  const companyName = companyInfo?.companyName || "Company Entity";
  const gstin = companyInfo?.gstin;
  const branchesCount = companyInfo?.activeBranchesCount ?? companyInfo?.totalBranchesCount ?? 0;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1">
      {/* Title & Metadata Badges */}
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text">
            Company Dashboard
          </h1>
          <UIBadge variant="soft" color="primary" size="sm" className="gap-1 font-semibold">
            <Building2 className="size-3" />
            <span>{companyName}</span>
          </UIBadge>

          {gstin && gstin !== "N/A" && (
            <UIBadge variant="outline" color="neutral" size="sm" className="font-mono text-[11px] hidden md:inline-flex">
              <span>GSTIN: {gstin}</span>
            </UIBadge>
          )}

          <UIBadge variant="soft" color="success" size="sm" className="gap-1 font-mono text-[11px]">
            <Store className="size-3" />
            <span>{branchesCount} {branchesCount === 1 ? "Branch" : "Branches"}</span>
          </UIBadge>
        </div>
        <p className="text-xs sm:text-sm text-text-muted mt-0.5 truncate">
          Corporate treasury, branch network performance, customer receivables, and supplier ledgers.
        </p>
      </div>

      {/* Right Controls: Date Range Display, Timeframe Tabs & Refresh */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 self-start sm:self-center shrink-0">
        {/* Date Range Badge / Selector */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-xs font-medium text-text shadow-2xs">
          <Calendar className="size-3.5 text-text-muted" />
          <span className="font-mono tabular-nums">{displayDateRange}</span>
        </div>

        {/* Timeframe Segmented Control */}
        <div className="inline-flex items-center p-0.5 rounded-lg border border-border bg-surface-alt/70 text-xs shadow-2xs">
          {TIMEFRAMES.map((tf) => {
            const isActive = timeframe === tf;
            return (
              <button
                key={tf}
                type="button"
                onClick={() => onTimeframeChange?.(tf)}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer",
                  isActive
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-semibold shadow-2xs border border-emerald-500/30"
                    : "text-text-muted hover:text-text hover:bg-surface/50"
                )}
              >
                {tf}
              </button>
            );
          })}
        </div>

        {/* Refresh Button */}
        {onRefresh && (
          <UIButton
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
            aria-label="Refresh Dashboard"
            className="gap-1.5 text-xs font-semibold px-2.5 py-1.5 h-auto cursor-pointer"
          >
            <RotateCw className={cn("size-3.5", isLoading && "animate-spin text-primary")} />
            <span className="hidden md:inline">{isLoading ? "Syncing..." : "Refresh"}</span>
          </UIButton>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboardHeader;
