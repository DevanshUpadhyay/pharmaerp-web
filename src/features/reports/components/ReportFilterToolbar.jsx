// src/features/reports/components/ReportFilterToolbar.jsx

import React from "react";
import {
  Search,
  Filter,
  RefreshCw,
  RotateCcw,
  Download,
  Printer,
  Calendar,
  Layers,
} from "lucide-react";
import {
  UIButton,
  UIInput,
  UISelect,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { REPORTS_REGISTRY } from "../config/reportsRegistry";

const DATE_PRESET_OPTIONS = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 Days", value: "last7days" },
  { label: "This Month", value: "thisMonth" },
  { label: "Last Month", value: "lastMonth" },
  { label: "Custom Dates", value: "custom" },
];

export const ReportFilterToolbar = ({
  reportKey,
  onReportChange,
  filters,
  onDatePresetChange,
  onFilterChange,
  onResetFilters,
  onRefresh,
  isLoading,
  onOpenFilterModal,
  onExportCsv,
  onPrint,
  activeFilterCount = 0,
}) => {
  const reportOptions = REPORTS_REGISTRY.map((r) => ({
    label: r.title,
    value: r.key,
    description: r.description,
  }));

  const isFiltered =
    filters.search ||
    filters.datePreset !== "today" ||
    activeFilterCount > 0;

  return (
    <div className="flex flex-wrap items-center gap-2 shrink-0">
      {/* 1. Report Selector (Searchable) */}
      <div className="w-[260px] sm:w-[300px]">
        <UISelect
          value={reportKey}
          onChange={(val) => onReportChange(val)}
          options={reportOptions}
          isSearchable
          placeholder="Select Report..."
          size="md"
        />
      </div>

      {/* 2. Date Preset Selector */}
      <div className="w-[140px] sm:w-[160px]">
        <UISelect
          value={filters.datePreset}
          onChange={(val) => onDatePresetChange(val)}
          options={DATE_PRESET_OPTIONS}
          size="md"
        />
      </div>

      {/* 3. Search Bar */}
      <div className="flex-1 min-w-[200px] sm:min-w-[240px]">
        <UIInput
          type="text"
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
          placeholder="Search records in this report..."
          startIcon={<Search className="size-4 text-text-muted" />}
          size="md"
          variant="outline"
          isClearable
          onClear={() => onFilterChange("search", "")}
          className="w-full"
        />
      </div>

      {/* 4. Filters Modal Trigger */}
      <UIButton
        type="button"
        variant={activeFilterCount > 0 ? "secondary" : "outline"}
        size="md"
        onClick={onOpenFilterModal}
        startIcon={
          <Filter
            className={cn("size-3.5", activeFilterCount > 0 ? "text-primary" : "text-text-muted")}
          />
        }
        className={cn(
          "h-10 px-3 text-xs sm:text-sm font-semibold gap-1.5 transition-all select-none",
          activeFilterCount > 0 && "border-primary/40 bg-primary/10 text-primary font-bold shadow-2xs"
        )}
        title="More parameters & filters"
      >
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <span className="size-4.5 rounded-full bg-primary text-white text-[10.5px] font-bold flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </UIButton>

      {/* 5. Quick Reset */}
      {isFiltered && (
        <UIButton
          type="button"
          variant="ghost"
          size="md"
          onClick={onResetFilters}
          startIcon={<RotateCcw className="size-3.5 text-text-muted" />}
          className="h-10 px-2 text-xs text-text-muted hover:text-text"
          title="Reset filters"
        >
          Reset
        </UIButton>
      )}

      {/* 6. Action Cluster: Refresh, Export, Print */}
      <div className="flex items-center gap-1.5 ml-auto">
        <UIButton
          type="button"
          variant="secondary"
          size="md"
          disabled={isLoading}
          onClick={onRefresh}
          startIcon={
            <RefreshCw className={cn("size-3.5 text-primary", isLoading && "animate-spin")} />
          }
          className="h-10 px-2.5 sm:px-3 text-xs sm:text-sm font-semibold"
          title="Refresh Data"
        >
          <span className="hidden sm:inline">Refresh</span>
        </UIButton>

        <UIButton
          type="button"
          variant="outline"
          size="md"
          onClick={onPrint}
          startIcon={<Printer className="size-3.5 text-text-muted" />}
          className="h-10 px-2.5 sm:px-3 text-xs sm:text-sm font-semibold"
          title="Print official report"
        >
          <span className="hidden sm:inline">Print</span>
        </UIButton>

        <UIButton
          type="button"
          variant="primary"
          size="md"
          onClick={onExportCsv}
          startIcon={<Download className="size-3.5" />}
          className="h-10 px-3 sm:px-3.5 text-xs sm:text-sm font-semibold shadow-2xs"
          title="Download as CSV spreadsheet"
        >
          <span>Export</span>
        </UIButton>
      </div>
    </div>
  );
};

export default ReportFilterToolbar;
