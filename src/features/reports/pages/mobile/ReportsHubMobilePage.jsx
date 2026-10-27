// src/features/reports/pages/mobile/ReportsHubMobilePage.jsx

import React, { useState, useMemo } from "react";
import {
  Download,
  Filter,
  RefreshCw,
  Search,
} from "lucide-react";
import {
  UIButton,
  UIInput,
  UISelect,
  UIBadge,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  REPORTS_REGISTRY,
  getReportConfig,
} from "../../config/reportsRegistry";
import usePharmacyReports from "../../hooks/usePharmacyReports";
import useBranch from "@/features/branch/hooks/useBranch";
import { ReportFilterModal } from "../../components";

const formatCurrency = (val) => {
  if (val === undefined || val === null || isNaN(Number(val))) return "0.00";
  return Number(val).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const ReportsHubMobilePage = ({ defaultReportKey = "daily-sales" }) => {
  const { currentBranch } = useBranch();
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

  const reportOptions = REPORTS_REGISTRY.map((r) => ({
    label: r.title,
    value: r.key,
  }));

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-bg p-3 gap-3 overflow-y-auto">
      {/* 1. Report Selector & Search */}
      <div className="flex flex-col gap-2">
        <UISelect
          value={reportKey}
          onChange={(val) => setReportKey(val)}
          options={reportOptions}
          size="md"
        />

        <div className="flex items-center gap-2">
          <div className="flex-1">
            <UIInput
              type="text"
              value={filters.search}
              onChange={(e) => setFilterField("search", e.target.value)}
              placeholder="Search in report..."
              startIcon={<Search className="size-4 text-text-muted" />}
              size="md"
              isClearable
              onClear={() => setFilterField("search", "")}
            />
          </div>
          <UIButton
            type="button"
            variant="outline"
            size="md"
            onClick={() => setIsFilterModalOpen(true)}
            className="px-3"
          >
            <Filter className="size-4" />
          </UIButton>
          <UIButton
            type="button"
            variant="secondary"
            size="md"
            onClick={() => fetchReport(reportKey)}
            disabled={isLoading}
            className="px-3"
          >
            <RefreshCw className={cn("size-4 text-primary", isLoading && "animate-spin")} />
          </UIButton>
        </div>
      </div>

      {/* 3. Mobile Card List */}
      <div className="space-y-2.5 flex-1 min-h-0 pb-6">
        {isLoading ? (
          <div className="p-8 text-center text-xs text-text-muted">Loading report data...</div>
        ) : reportData.rows.length === 0 ? (
          <div className="p-8 text-center text-xs text-text-muted bg-surface rounded-xl border border-border">
            No records found. Try adjusting filters.
          </div>
        ) : (
          reportData.rows.map((row, idx) => (
            <div
              key={row._id || `m-row-${idx}`}
              className="bg-surface rounded-xl border border-border p-3.5 space-y-2 shadow-2xs"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-bold text-sm text-text truncate">
                  {row.medicineName || row.name || row.customerName || row.supplierName || row.invoiceNo || row.doctorName || "Record"}
                </span>
                {row.grandTotal !== undefined && (
                  <span className="font-mono font-bold text-sm text-primary">
                    ₹{formatCurrency(row.grandTotal)}
                  </span>
                )}
                {row.riskValue !== undefined && (
                  <span className="font-mono font-bold text-sm text-rose-600 dark:text-rose-400">
                    ₹{formatCurrency(row.riskValue)}
                  </span>
                )}
                {row.outstandingBalance !== undefined && (
                  <span className="font-mono font-bold text-sm text-rose-600 dark:text-rose-400">
                    ₹{formatCurrency(row.outstandingBalance)}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-text-muted border-t border-border/40 pt-2">
                {row.batchNo && (
                  <div>
                    <span className="text-[10px] block uppercase text-text-muted/70">Batch</span>
                    <span className="font-mono font-medium text-text">{row.batchNo}</span>
                  </div>
                )}
                {row.expiryDate && (
                  <div>
                    <span className="text-[10px] block uppercase text-text-muted/70">Expiry</span>
                    <span className="font-mono font-medium text-text">{row.expiryDate}</span>
                  </div>
                )}
                {row.paymentMethod && (
                  <div>
                    <span className="text-[10px] block uppercase text-text-muted/70">Payment</span>
                    <UIBadge variant="soft" color="info" className="text-[10px] px-1.5 py-0.5">
                      {row.paymentMethod}
                    </UIBadge>
                  </div>
                )}
                {row.currentStock !== undefined && (
                  <div>
                    <span className="text-[10px] block uppercase text-text-muted/70">Stock</span>
                    <span className="font-mono font-bold text-amber-600">{row.currentStock} Units</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        {hasMore && !isLoading && (
          <UIButton
            type="button"
            variant="outline"
            size="md"
            onClick={loadMore}
            disabled={isLoadingMore}
            className="w-full mt-3"
          >
            {isLoadingMore ? "Loading more..." : "Load More Records"}
          </UIButton>
        )}
      </div>

      {/* Filter Modal */}
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

export default ReportsHubMobilePage;
