// src/features/reports/components/ReportFilterModal.jsx

import React from "react";
import {
  UIModal,
  UIModalHeader,
  UIModalTitle,
  UIModalDescription,
  UIModalBody,
  UIModalFooter,
  UIButton,
  UIInput,
  UISelect,
} from "@/components/ui";
import { REPORT_CATEGORIES, REPORTS_REGISTRY } from "../config/reportsRegistry";

const EXPIRY_THRESHOLD_OPTIONS = [
  { label: "Expiring in next 30 Days (Critical)", value: 30 },
  { label: "Expiring in next 60 Days", value: 60 },
  { label: "Expiring in next 90 Days (Quarterly)", value: 90 },
  { label: "Expiring in next 180 Days (Half-Yearly)", value: 180 },
];

export const ReportFilterModal = ({
  isOpen,
  onClose,
  reportKey,
  onReportChange,
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  return (
    <UIModal isOpen={isOpen} onClose={onClose} size="md">
      <UIModalHeader>
        <UIModalTitle>Filter & Configure Report</UIModalTitle>
        <UIModalDescription>
          Customize date ranges, operational parameters, and report categories.
        </UIModalDescription>
      </UIModalHeader>

      <UIModalBody>
        <div className="space-y-4 py-2">
          {/* 1. Report Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text block">
              Active Report
            </label>
            <UISelect
              value={reportKey}
              onChange={(val) => onReportChange(val)}
              options={REPORTS_REGISTRY.map((r) => ({
                label: r.title,
                value: r.key,
                description: r.description,
              }))}
              isSearchable
              size="md"
            />
          </div>

          {/* 2. Custom Date Range */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text block">
              Custom Date Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10.5px] text-text-muted block mb-1">From Date</span>
                <UIInput
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => {
                    onFilterChange("startDate", e.target.value);
                    onFilterChange("datePreset", "custom");
                  }}
                  size="md"
                />
              </div>
              <div>
                <span className="text-[10.5px] text-text-muted block mb-1">To Date</span>
                <UIInput
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => {
                    onFilterChange("endDate", e.target.value);
                    onFilterChange("datePreset", "custom");
                  }}
                  size="md"
                />
              </div>
            </div>
          </div>

          {/* 3. Conditional: Expiry Threshold for near-expiry report */}
          {reportKey === "near-expiry" && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-text block">
                Expiry Horizon
              </label>
              <UISelect
                value={filters.daysThreshold}
                onChange={(val) => onFilterChange("daysThreshold", Number(val))}
                options={EXPIRY_THRESHOLD_OPTIONS}
                size="md"
              />
            </div>
          )}
        </div>
      </UIModalBody>

      <UIModalFooter>
        <UIButton variant="ghost" size="md" onClick={onResetFilters}>
          Reset to Defaults
        </UIButton>
        <UIButton variant="primary" size="md" onClick={onClose}>
          Apply & Run Report
        </UIButton>
      </UIModalFooter>
    </UIModal>
  );
};

export default ReportFilterModal;
