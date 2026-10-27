// src/features/reports/pages/desktop/ReportsHubDesktopPage.jsx

import React, { useRef, useState, useMemo } from "react";
import {
  ReportStatCards,
  ReportFilterToolbar,
  ReportDataTable,
  ReportFilterModal,
} from "../../components";
import {
  REPORTS_REGISTRY,
  getReportConfig,
} from "../../config/reportsRegistry";
import usePharmacyReports from "../../hooks/usePharmacyReports";
import useBranch from "@/features/branch/hooks/useBranch";
import useCompany from "@/features/company/hooks/useCompany";

import { exportReportToCsv, printPharmacyReport } from "../../utils/reportExportUtils";

export const ReportsHubDesktopPage = ({ defaultReportKey = "daily-sales" }) => {
  const { currentBranch } = useBranch();
  const { currentCompany } = useCompany();
  const tableContainerRef = useRef(null);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const {
    reportKey,
    setReportKey,
    reportData,
    isLoading,
    isLoadingMore,
    hasMore,
    filters,
    setFilterField,
    setDatePreset,
    resetFilters,
    fetchReport,
    loadMore,
  } = usePharmacyReports(defaultReportKey, currentBranch?._id);

  const reportConfig = useMemo(() => getReportConfig(reportKey), [reportKey]);

  // Generate 4 compact stats from reportData.summary
  const statCards = useMemo(() => {
    if (typeof reportConfig.getStatCards === "function") {
      return reportConfig.getStatCards(reportData.summary);
    }
    return [];
  }, [reportConfig, reportData.summary]);

  // Handle CSV Export
  const handleExportCsv = () => {
    exportReportToCsv(reportConfig.title, reportConfig.columns, reportData.rows, {
      pharmacyName: currentBranch?.name || currentCompany?.tradeName || "Main Pharmacy",
      startDate: filters.startDate,
      endDate: filters.endDate,
    });
  };

  // Handle Browser Native Print with Letterhead
  const handlePrint = () => {
    printPharmacyReport({
      reportTitle: reportConfig.title,
      columns: reportConfig.columns,
      rows: reportData.rows,
      summaryCards: statCards,
      company: currentCompany,
      branch: currentBranch,
      filters,
    });
  };

  // Active filter count for badge
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.datePreset !== "today") count++;
    if (reportKey === "near-expiry" && filters.daysThreshold !== 90) count++;
    return count;
  }, [filters, reportKey]);

  return (
    <div className="w-full h-full max-h-full flex-1 flex flex-col min-h-0 bg-bg px-2 sm:px-3 pt-2 pb-1 gap-2 text-text font-sans transition-colors overflow-hidden select-none">
      {/* ── 1. Compact 4-Card Statistics Grid (PAGE_UI_DESIGN_SPEC.md) ── */}
      <ReportStatCards statCards={statCards} />

      {/* ── 3. Single-Row Streamlined Filter Toolbar ──────────────────── */}
      <ReportFilterToolbar
        reportKey={reportKey}
        onReportChange={(key) => {
          setReportKey(key);
          if (tableContainerRef.current) tableContainerRef.current.scrollTop = 0;
        }}
        filters={filters}
        onDatePresetChange={setDatePreset}
        onFilterChange={setFilterField}
        onResetFilters={resetFilters}
        onRefresh={() => fetchReport(reportKey)}
        isLoading={isLoading}
        onOpenFilterModal={() => setIsFilterModalOpen(true)}
        onExportCsv={handleExportCsv}
        onPrint={handlePrint}
        activeFilterCount={activeFilterCount}
      />

      {/* ── 4. Constrained Table with Sticky Header & Infinite Scroll ─── */}
      <ReportDataTable
        columns={reportConfig.columns}
        rows={reportData.rows}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        hasMore={hasMore}
        total={reportData.total}
        onLoadMore={loadMore}
        tableContainerRef={tableContainerRef}
        onResetFilters={resetFilters}
      />

      {/* ── 5. Advanced Filter Modal ─────────────────────────────────── */}
      <ReportFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        reportKey={reportKey}
        onReportChange={setReportKey}
        filters={filters}
        onFilterChange={setFilterField}
        onResetFilters={resetFilters}
      />
    </div>
  );
};

export default ReportsHubDesktopPage;
