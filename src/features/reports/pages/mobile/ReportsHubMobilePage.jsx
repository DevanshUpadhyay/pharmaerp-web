// src/features/reports/pages/mobile/ReportsHubMobilePage.jsx

import React, { useState, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  ReportsOverviewStatCards,
  ReportsDirectoryToolbar,
  ReportsDirectoryGrid,
  ReportDetailView,
} from "../../components";
import {
  REPORTS_OVERVIEW_STATS,
  resolveCategoryAndTab,
} from "../../constants/reportsHubData";

export const ReportsHubMobilePage = () => {
  const navigate = useNavigate();
  const { category, subReport, reportKey: routeReportKey } = useParams();
  const [searchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStore, setSelectedStore] = useState("all");
  const [selectedDateRange, setSelectedDateRange] = useState("this-month");

  // Determine if a specific category / report view is active
  const activeReportContext = useMemo(() => {
    if (category) {
      return resolveCategoryAndTab(category, subReport);
    }
    if (routeReportKey) {
      return resolveCategoryAndTab(routeReportKey, null);
    }
    const queryReport = searchParams.get("report");
    if (queryReport) {
      return resolveCategoryAndTab(queryReport, null);
    }
    return null;
  }, [category, subReport, routeReportKey, searchParams]);

  const handleSelectReport = (reportId, categoryId, slug) => {
    const cleanCat = categoryId.replace("-reports", "");
    const tabSlug = slug || reportId.replace(`${cleanCat}-`, "");
    navigate(`/reports/${cleanCat}/${tabSlug}`);
  };

  const handleTabChange = (tabSlug) => {
    if (activeReportContext) {
      navigate(`/reports/${activeReportContext.catKey}/${tabSlug}`, { replace: true });
    }
  };

  const handleBackToHub = () => {
    navigate("/reports");
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedStore("all");
    setSelectedDateRange("this-month");
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-bg p-3 gap-3 overflow-y-auto text-text font-sans">
      {activeReportContext ? (
        <ReportDetailView
          categoryKey={activeReportContext.catKey}
          initialTabKey={activeReportContext.tabKey}
          onBackToHub={handleBackToHub}
          onTabChange={handleTabChange}
        />
      ) : (
        <>
          {/* 1. Stat cards grid (NO heading as requested) */}
          <ReportsOverviewStatCards stats={REPORTS_OVERVIEW_STATS} />

          {/* 2. Compact filter toolbar */}
          <ReportsDirectoryToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedStore={selectedStore}
            onStoreChange={setSelectedStore}
            selectedDateRange={selectedDateRange}
            onDateRangeChange={setSelectedDateRange}
            onResetFilters={handleResetFilters}
          />

          {/* 3. Category cards */}
          <ReportsDirectoryGrid
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onSelectReport={handleSelectReport}
          />
        </>
      )}
    </div>
  );
};

export default ReportsHubMobilePage;
