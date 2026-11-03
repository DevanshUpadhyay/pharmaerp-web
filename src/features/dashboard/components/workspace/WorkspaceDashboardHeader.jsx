// src/features/dashboard/components/workspace/WorkspaceDashboardHeader.jsx

import { RotateCw, Layers } from "lucide-react";
import { UIBadge, UIButton } from "@/components/ui";
import { cn } from "@/lib/utils";

export const WorkspaceDashboardHeader = ({
  workspaceInfo,
  onRefresh,
  isLoading = false,
}) => {
  const wsName = workspaceInfo?.name || "Healthcare Pharmacy Workspace";
  const wsCode = workspaceInfo?.code || "WS";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1">
      {/* Title & Subtitle */}
      <div className="min-w-0">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text">
            Workspace Dashboard
          </h1>
          <UIBadge variant="soft" color="primary" size="sm" className="gap-1 font-mono font-bold">
            <Layers className="size-3" />
            {wsCode}
          </UIBadge>
          <UIBadge variant="soft" color="purple" size="sm" className="hidden sm:inline-flex">
            {wsName}
          </UIBadge>
        </div>
        <p className="text-xs sm:text-sm text-text-muted mt-0.5 truncate">
          Executive organization governance, legal entities, branch network, and staff access control.
        </p>
      </div>

      {/* Right Controls: Refresh Button & Status Indicator */}
      <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
        <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-xs text-text-muted font-medium">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Workspace Sync</span>
        </div>

        {onRefresh && (
          <UIButton
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
            className="gap-1.5 text-xs font-semibold"
          >
            <RotateCw className={cn("size-3.5", isLoading && "animate-spin text-primary")} />
            <span>{isLoading ? "Syncing..." : "Refresh"}</span>
          </UIButton>
        )}
      </div>
    </div>
  );
};

export default WorkspaceDashboardHeader;