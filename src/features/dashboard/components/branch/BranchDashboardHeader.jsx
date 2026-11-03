// src/features/dashboard/components/branch/BranchDashboardHeader.jsx

import React from "react";
import { Calendar, RotateCw, Store, ShieldCheck, Clock } from "lucide-react";
import { UIBadge, UIButton } from "@/components/ui";
import { cn } from "@/lib/utils";

export const BranchDashboardHeader = ({
  branchInfo,
  onRefresh,
  isLoading = false,
  selectedDate = "Today",
  onDateChange,
}) => {
  const isDayOpen = (branchInfo?.businessDayStatus || "").toUpperCase() === "OPEN";
  const isShiftActive = branchInfo?.isShiftActive;
  const branchName = branchInfo?.branchName || "Branch Counter";
  const branchCode = branchInfo?.branchCode || "BR";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1">
      {/* Title & Metadata Badges */}
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text">
            Branch Dashboard
          </h1>

          <UIBadge variant="soft" color="primary" size="sm" className="gap-1 font-semibold">
            <Store className="size-3" />
            <span>{branchName}</span>
          </UIBadge>

          {branchCode && (
            <UIBadge variant="outline" color="neutral" size="sm" className="font-mono text-[11px] hidden md:inline-flex">
              <span>{branchCode}</span>
            </UIBadge>
          )}

          {/* Business Day Operational Badge */}
          {isDayOpen ? (
            <UIBadge variant="soft" color="success" size="sm" className="gap-1.5 font-semibold font-mono text-[11px]">
              <span className="relative flex size-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full size-1.5 bg-success" />
              </span>
              <span>Day: OPEN</span>
            </UIBadge>
          ) : (
            <UIBadge variant="soft" color="warning" size="sm" className="font-semibold font-mono text-[11px]">
              <span>Day: CLOSED</span>
            </UIBadge>
          )}

          {/* Live Shift Badge */}
          {isShiftActive ? (
            <UIBadge variant="soft" color="success" size="sm" className="gap-1 font-mono text-[11px] hidden sm:inline-flex">
              <Clock className="size-3" />
              <span>{branchInfo?.shiftName || "Shift Live"}</span>
            </UIBadge>
          ) : (
            <UIBadge variant="soft" color="neutral" size="sm" className="gap-1 font-mono text-[11px] hidden sm:inline-flex">
              <Clock className="size-3" />
              <span>Shift Closed</span>
            </UIBadge>
          )}
        </div>
        <p className="text-xs sm:text-sm text-text-muted mt-0.5 truncate">
          Live counter billing, active cashier drawer, hourly customer flow, and physical rack stock.
        </p>
      </div>

      {/* Right Controls: Date Selector & Refresh */}
      <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
        {/* Date Selector Pill */}
        <button
          type="button"
          onClick={onDateChange}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-xs font-medium text-text shadow-2xs hover:bg-surface-hover transition-colors cursor-pointer"
        >
          <Calendar className="size-3.5 text-text-muted" />
          <span className="font-mono tabular-nums">{selectedDate}</span>
        </button>

        {/* Refresh Action */}
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

export default BranchDashboardHeader;
