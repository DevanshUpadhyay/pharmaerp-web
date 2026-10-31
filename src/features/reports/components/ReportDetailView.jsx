// src/features/reports/components/ReportDetailView.jsx

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Building2,
  ChevronRight,
  ChevronLeft,
  Search,
  Filter,
  SlidersHorizontal,
  MoreVertical,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Tag,
  FileText,
  TrendingUp,
  Percent,
  ShoppingCart,
  BarChart2,
  ArrowLeft,
  Eye,
  Check,
  AlertTriangle,
  RotateCcw,
  Boxes,
} from "lucide-react";
import {
  UIButton,
  UIInput,
  UISelect,
  UIBadge,
  UITable,
  UITableHeader,
  UITableBody,
  UITableRow,
  UITableHead,
  UITableCell,
  UITableEmpty,
  UITableLoading,
  UIInfiniteScroll,
  UIModal,
  UIModalHeader,
  UIModalTitle,
  UIModalBody,
  UIModalFooter,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  MASTER_CATEGORIES_DATA,
  resolveCategoryAndTab,
} from "../constants/reportsHubData";

const TIMEFRAME_OPTIONS = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

const FILTER_MODE_OPTIONS = [
  { value: "all", label: "All Modes / Types" },
  { value: "Cash", label: "Cash" },
  { value: "UPI", label: "UPI" },
  { value: "Card", label: "Card / Bank" },
];

const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "Completed", label: "Completed / Active" },
  { value: "Pending", label: "Pending" },
];

const formatCurrency = (val) => {
  if (val === undefined || val === null || isNaN(Number(val))) return "0.00";
  return Number(val).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const BATCH_SIZE = 10;

/**
 * Expands base records into a rich synthetic pool for infinite scrolling demo
 */
const generateExpandedRows = (baseRows = [], categoryKey = "sales", tabSlug = "summary") => {
  if (!baseRows || baseRows.length === 0) return [];
  const pool = [];
  const totalWanted = 40;
  const dates = [
    "31 Oct 2024", "30 Oct 2024", "29 Oct 2024", "28 Oct 2024", "27 Oct 2024",
    "26 Oct 2024", "25 Oct 2024", "24 Oct 2024", "23 Oct 2024", "22 Oct 2024",
    "21 Oct 2024", "20 Oct 2024", "19 Oct 2024", "18 Oct 2024", "17 Oct 2024"
  ];
  const customers = [
    "Walk-in Customer", "Rakesh Sharma", "Neha Patel", "Amit Verma", "Sunita Jain",
    "Vikram Singh", "Priya Nair", "Deepak Gupta", "Meena Iyer", "Kavita Rao",
    "Anil Kapoor", "Sanjay Singhania", "Pooja Hegde", "Manoj Joshi", "Rajesh Khanna"
  ];
  const paymentModes = ["Cash", "UPI", "Card"];

  for (let i = 0; i < totalWanted; i++) {
    const template = baseRows[i % baseRows.length];
    const itemNum = i + 1;
    const date = dates[i % dates.length];
    const customer = customers[i % customers.length];
    const paymentMode = paymentModes[i % paymentModes.length];

    const cloned = { ...template, id: `row-${categoryKey}-${tabSlug}-${itemNum}` };

    if (cloned.invoiceNo) {
      cloned.invoiceNo = `INV-${String(1482 - i).padStart(6, "0")}`;
    }
    if (cloned.billNo) {
      cloned.billNo = `BILL-${String(9820 - i).padStart(5, "0")}`;
    }
    if (cloned.returnNo) {
      cloned.returnNo = `RET-${String(340 - i).padStart(4, "0")}`;
    }
    if (cloned.date && cloned.date !== "—") {
      cloned.date = date;
    }
    if (cloned.customer && cloned.customer !== "—" && !cloned.customer.includes("All")) {
      cloned.customer = customer;
    }
    if (cloned.paymentMode) {
      cloned.paymentMode = paymentMode;
    }
    if (typeof cloned.billAmount === "number") {
      cloned.billAmount = Math.round((cloned.billAmount * (0.85 + ((i * 7) % 30) / 100)) * 100) / 100;
      cloned.discount = Math.round((cloned.discount * (0.8 + ((i * 5) % 25) / 100)) * 100) / 100;
      cloned.netAmount = Math.round((cloned.billAmount - cloned.discount) * 100) / 100;
      if (typeof cloned.profit === "number") {
        cloned.profit = Math.round(cloned.netAmount * 0.17 * 100) / 100;
      }
    }
    if (typeof cloned.total === "number") {
      cloned.total = Math.round((cloned.total * (0.9 + ((i * 6) % 25) / 100)) * 100) / 100;
    }
    pool.push(cloned);
  }
  return pool;
};

/**
 * ── General Purpose Report Subdivision & Detail View ────────────────────────
 * Used universally across all 9 report categories (Sales, Purchase, Inventory,
 * Customers, Suppliers, Financial, GST, Products, Custom Reports).
 */
export const ReportDetailView = ({
  categoryKey = "sales",
  initialTabKey = "summary",
  onBackToHub,
  onTabChange,
}) => {
  const tableContainerRef = useRef(null);

  // Resolve category and tab configuration dynamically
  const resolved = useMemo(
    () => resolveCategoryAndTab(categoryKey, initialTabKey),
    [categoryKey, initialTabKey]
  );

  const [activeTabSlug, setActiveTabSlug] = useState(resolved.tabKey);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModeFilter, setSelectedModeFilter] = useState("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("daily");
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);
  const [previewRecord, setPreviewRecord] = useState(null);

  // Infinite scroll pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [displayedRows, setDisplayedRows] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  // Sync state if categoryKey or initialTabKey changes from route params
  useEffect(() => {
    setActiveTabSlug(resolved.tabKey);
    setSearchQuery("");
  }, [categoryKey, initialTabKey, resolved.tabKey]);

  const categoryData = resolved.categoryData;

  // Active tab configuration
  const activeConfig = useMemo(() => {
    return (
      categoryData.tabs[activeTabSlug] ||
      Object.values(categoryData.tabs)[0]
    );
  }, [categoryData, activeTabSlug]);

  const CategoryIcon = categoryData.icon;

  // Generate full expanded dataset for infinite scroll demonstration
  const fullRowsPool = useMemo(() => {
    return generateExpandedRows(activeConfig.rows, categoryKey, activeTabSlug);
  }, [activeConfig.rows, categoryKey, activeTabSlug]);

  // Tab switch handler
  const handleSelectTab = (tabItem) => {
    setActiveTabSlug(tabItem.slug);
    setSearchQuery("");
    if (onTabChange) {
      onTabChange(tabItem.slug);
    }
  };

  // Filtered rows for table
  const filteredRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const rows = fullRowsPool;

    if (!q && selectedModeFilter === "all" && selectedStatusFilter === "all") {
      return rows;
    }

    return rows.filter((r) => {
      if (selectedModeFilter !== "all" && r.paymentMode && r.paymentMode !== selectedModeFilter) {
        return false;
      }
      if (selectedStatusFilter !== "all" && r.status && r.status !== selectedStatusFilter) {
        return false;
      }
      if (!q) return true;
      return Object.values(r).some((val) =>
        String(val).toLowerCase().includes(q)
      );
    });
  }, [fullRowsPool, searchQuery, selectedModeFilter, selectedStatusFilter]);

  // Sync displayed rows whenever filtered results change
  useEffect(() => {
    setCurrentPage(1);
    const initialBatch = filteredRows.slice(0, BATCH_SIZE);
    setDisplayedRows(initialBatch);
    setHasMore(filteredRows.length > BATCH_SIZE);
  }, [filteredRows]);

  // Infinite scroll load more handler
  const handleLoadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);

    setTimeout(() => {
      setCurrentPage((prevPage) => {
        const nextPage = prevPage + 1;
        const nextBatch = filteredRows.slice(0, nextPage * BATCH_SIZE);
        setDisplayedRows(nextBatch);
        setHasMore(nextBatch.length < filteredRows.length);
        setIsLoadingMore(false);
        return nextPage;
      });
    }, 450);
  }, [isLoadingMore, hasMore, filteredRows]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedModeFilter("all");
    setSelectedStatusFilter("all");
  };

  return (
    <div className="flex-1 flex flex-col gap-3.5 sm:gap-4 min-h-0 text-text font-sans">
      {/* ── 1. Top Navigation Bar (Clean: NO Header/Breadcrumbs/Filters) ──── */}
      <div className="flex items-center justify-between shrink-0">
        <button
          type="button"
          onClick={onBackToHub}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/70 bg-surface hover:bg-surface-hover/80 text-xs font-semibold text-text-muted hover:text-text transition-colors shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to All Reports</span>
        </button>

        {/* Compact active report indicator pill */}
        <div className="flex items-center gap-2 text-xs font-medium text-text-muted">
          <span>{categoryData.title}</span>
          <span className="text-text-muted/40">•</span>
          <span className="font-bold text-text">{activeConfig.title}</span>
        </div>
      </div>

      {/* ── 2. Upper Split Section: Left Tabs & Right Stats/Graph ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 shrink-0 items-start">
        {/* Left Side: Category Card with 5 Tabs (~310px) */}
        <div className="lg:col-span-4 xl:col-span-3.5 flex flex-col">
          <div className="bg-surface rounded-2xl border border-border/80 shadow-2xs overflow-hidden flex flex-col">
            {/* Category Header */}
            <div
              className={cn(
                "px-4 py-3 flex items-center gap-3 border-b transition-colors",
                categoryData.theme.headerBg,
                categoryData.theme.headerBorder
              )}
            >
              <div
                className={cn(
                  "size-9.5 rounded-xl flex items-center justify-center shrink-0 shadow-2xs",
                  categoryData.theme.iconBg
                )}
              >
                {categoryData.badgeText ? (
                  <span className="text-xs font-black tracking-tight font-mono">
                    {categoryData.badgeText}
                  </span>
                ) : (
                  <CategoryIcon className="size-5 stroke-[2]" />
                )}
              </div>
              <div className="min-w-0">
                <div className="text-[14px] font-bold text-text leading-tight truncate">
                  {categoryData.title}
                </div>
                <div className="text-[11px] text-text-muted leading-tight mt-0.5 truncate">
                  {categoryData.subtitle}
                </div>
              </div>
            </div>

            {/* Category Items List (Tabs) */}
            <div className="p-2 flex flex-col gap-1">
              {categoryData.items.map((item) => {
                const ItemIcon = item.icon;
                const isActive =
                  item.slug === activeTabSlug ||
                  item.id === activeTabSlug ||
                  item.slug === activeConfig.slug;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectTab(item)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer group",
                      isActive
                        ? cn("font-semibold border shadow-2xs", categoryData.theme.activeTabBg)
                        : "hover:bg-surface-hover/80 active:bg-surface-active text-text"
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={cn(
                          "size-7 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                          isActive
                            ? categoryData.theme.activeIconBg
                            : "bg-surface-alt/70 text-text-muted group-hover:text-primary group-hover:bg-primary-soft"
                        )}
                      >
                        <ItemIcon className="size-3.5 stroke-[1.8]" />
                      </div>

                      <div className="min-w-0">
                        <div
                          className={cn(
                            "text-[13px] leading-tight truncate",
                            isActive ? "font-bold" : "font-medium text-text group-hover:text-primary"
                          )}
                        >
                          {item.title}
                        </div>
                        <div className="text-[11px] text-text-muted leading-tight mt-0.5 truncate">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>

                    <ChevronRight
                      className={cn(
                        "size-4 shrink-0 ml-2 transition-transform",
                        isActive
                          ? "opacity-90"
                          : "text-text-muted/40 group-hover:text-primary group-hover:translate-x-0.5"
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: 4 Stat Cards + Trend Graph */}
        <div className="lg:col-span-8 xl:col-span-8.5 flex flex-col gap-3 sm:gap-3.5">
          {/* 4 Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {activeConfig.stats.map((stat) => {
              const Icon = stat.icon;
              const isUp = stat.trendDirection === "up";

              return (
                <div
                  key={stat.id}
                  className="bg-surface rounded-2xl border border-border/80 p-3.5 shadow-2xs flex items-center gap-3 transition-colors"
                >
                  <div
                    className={cn(
                      "size-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs",
                      stat.iconBg
                    )}
                  >
                    <Icon className="size-4.5 stroke-[2]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-medium text-text-muted truncate">
                      {stat.title}
                    </div>
                    <div className="text-lg sm:text-[20px] font-bold text-text font-mono tracking-tight leading-tight mt-0.5">
                      {stat.value}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5 text-[10.5px] truncate">
                      <span
                        className={cn(
                          "font-semibold inline-flex items-center",
                          isUp
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-rose-600 dark:text-rose-400"
                        )}
                      >
                        {isUp ? (
                          <ArrowUp className="size-2.5 stroke-[2.5] mr-0.5" />
                        ) : (
                          <ArrowDown className="size-2.5 stroke-[2.5] mr-0.5" />
                        )}
                        {stat.trend}
                      </span>
                      <span className="text-text-muted font-normal truncate">
                        {stat.trendLabel}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trend Bar Chart Card */}
          <div className="bg-surface rounded-2xl border border-border/80 p-4 shadow-2xs flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm sm:text-base font-bold text-text">
                {activeConfig.chart.title}
              </h3>

              <div className="flex items-center gap-3 sm:gap-4">
                {/* Legend */}
                <div className="flex items-center gap-3 text-xs font-medium">
                  <div className="flex items-center gap-1.5">
                    <span
                      style={{ backgroundColor: activeConfig.chart.metric1Color }}
                      className="size-2.5 rounded-full"
                    />
                    <span className="text-text-muted">
                      {activeConfig.chart.metric1Label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      style={{ backgroundColor: activeConfig.chart.metric2Color }}
                      className="size-2.5 rounded-full"
                    />
                    <span className="text-text-muted">
                      {activeConfig.chart.metric2Label}
                    </span>
                  </div>
                </div>

                {/* Dropdown */}
                <div className="w-[90px]">
                  <UISelect
                    value={selectedTimeframe}
                    onChange={setSelectedTimeframe}
                    options={TIMEFRAME_OPTIONS}
                    size="sm"
                  />
                </div>
              </div>
            </div>

            {/* Interactive Bar Chart Visualization */}
            <div className="h-38 sm:h-42 w-full pt-1 flex flex-col justify-end">
              {/* Y Axis grid & Bars */}
              <div className="relative flex-1 flex items-end justify-between gap-1 sm:gap-1.5 px-4 sm:px-6 pb-2 border-b border-border/60">
                {/* Grid guidelines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[9.5px] text-text-muted font-mono pr-2">
                  <div className="w-full flex items-center justify-between border-b border-border/30">
                    <span className="-translate-y-2">1L</span>
                  </div>
                  <div className="w-full flex items-center justify-between border-b border-border/30">
                    <span className="-translate-y-2">75K</span>
                  </div>
                  <div className="w-full flex items-center justify-between border-b border-border/30">
                    <span className="-translate-y-2">50K</span>
                  </div>
                  <div className="w-full flex items-center justify-between border-b border-border/30">
                    <span className="-translate-y-2">25K</span>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <span className="-translate-y-2">0</span>
                  </div>
                </div>

                {/* Dual Bars for each day */}
                {(activeConfig.chart.data || []).map((item, idx) => {
                  const isHovered = hoveredBarIndex === idx;
                  const m1Height = Math.min(100, Math.max(10, (item.sales / 100) * 100));
                  const m2Height = Math.min(100, Math.max(8, (item.profit / 100) * 100));

                  return (
                    <div
                      key={item.date}
                      className="relative z-10 flex-1 flex items-end justify-center gap-0.5 sm:gap-1 h-full group cursor-pointer"
                      onMouseEnter={() => setHoveredBarIndex(idx)}
                      onMouseLeave={() => setHoveredBarIndex(null)}
                    >
                      {/* Tooltip */}
                      {isHovered && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface text-text border border-border px-2 py-0.5 rounded-md shadow-md text-[10px] font-mono whitespace-nowrap z-20 pointer-events-none">
                          <span
                            style={{ color: activeConfig.chart.metric1Color }}
                            className="font-bold"
                          >
                            ₹{(item.sales * 1000).toLocaleString()}
                          </span>
                          <span className="text-text-muted mx-1">|</span>
                          <span
                            style={{ color: activeConfig.chart.metric2Color }}
                            className="font-bold"
                          >
                            ₹{(item.profit * 1000).toLocaleString()}
                          </span>
                        </div>
                      )}

                      {/* Metric 1 Bar */}
                      <div
                        style={{
                          height: `${m1Height}%`,
                          backgroundColor: activeConfig.chart.metric1Color,
                        }}
                        className={cn(
                          "w-1 sm:w-1.5 rounded-t-xs transition-all duration-150",
                          isHovered && "brightness-110 scale-y-105"
                        )}
                      />

                      {/* Metric 2 Bar */}
                      <div
                        style={{
                          height: `${m2Height}%`,
                          backgroundColor: activeConfig.chart.metric2Color,
                        }}
                        className={cn(
                          "w-1 sm:w-1.5 rounded-t-xs transition-all duration-150",
                          isHovered && "brightness-110 scale-y-105"
                        )}
                      />
                    </div>
                  );
                })}
              </div>

              {/* X Axis Date Labels */}
              <div className="flex items-center justify-between px-4 sm:px-6 pt-1 text-[10px] text-text-muted font-mono">
                <span>01 Oct</span>
                <span>04 Oct</span>
                <span>07 Oct</span>
                <span>10 Oct</span>
                <span>13 Oct</span>
                <span>16 Oct</span>
                <span>19 Oct</span>
                <span>22 Oct</span>
                <span>25 Oct</span>
                <span>28 Oct</span>
                <span>31 Oct</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Lower Section: FULL WIDTH (Starts from left under tabs!) ────── */}
      <div className="w-full flex flex-col gap-3 shrink-0">
        {/* Full-width Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex-1 min-w-[260px] sm:min-w-[320px]">
            <UIInput
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={activeConfig.filterPlaceholder}
              startIcon={<Search className="size-4 text-text-muted" />}
              size="md"
              isClearable
              onClear={() => setSearchQuery("")}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="w-[160px]">
              <UISelect
                value={selectedModeFilter}
                onChange={setSelectedModeFilter}
                options={FILTER_MODE_OPTIONS}
                size="md"
              />
            </div>

            <div className="w-[150px]">
              <UISelect
                value={selectedStatusFilter}
                onChange={setSelectedStatusFilter}
                options={STATUS_FILTER_OPTIONS}
                size="md"
              />
            </div>

            {(searchQuery || selectedModeFilter !== "all" || selectedStatusFilter !== "all") && (
              <UIButton
                type="button"
                variant="ghost"
                size="md"
                onClick={handleResetFilters}
                startIcon={<RotateCcw className="size-3.5 text-text-muted" />}
                className="h-10 px-3 text-text-muted hover:text-text shrink-0"
                title="Reset Filters"
              >
                Reset
              </UIButton>
            )}

            <UIButton
              type="button"
              variant="outline"
              size="md"
              className="h-10 px-3 text-xs font-semibold gap-1.5"
            >
              <SlidersHorizontal className="size-3.5 text-text-muted" />
              <span>More Filters</span>
            </UIButton>

            {/* Subtle record counter badge */}
            <div className="px-2.5 py-2 rounded-xl bg-surface-alt/70 border border-border/60 text-[11px] font-mono text-text-muted select-none flex items-center gap-1.5 shadow-2xs">
              <span className="font-bold text-text">{displayedRows.length}</span>
              <span className="text-text-muted/60">/</span>
              <span>{filteredRows.length} loaded</span>
            </div>
          </div>
        </div>

        {/* Full-width Data Table with Infinite Scrolling (Same design as Sales Invoice & Account Balances) */}
        <div className="w-full bg-surface rounded-2xl border border-border/80 shadow-2xs overflow-hidden flex flex-col">
          {/* Scrollable Container with Sticky Header */}
          <div
            ref={tableContainerRef}
            className="relative max-h-[520px] overflow-y-auto overflow-x-auto flex-1 min-h-0 divide-y divide-border/60"
          >
            <UITable
              stickyHeader
              containerClassName="static overflow-visible rounded-none border-0 shadow-none bg-transparent isolate-auto"
              className="w-full"
            >
              <UITableHeader
                sticky
                className="sticky top-0 z-20 bg-surface-alt/95 backdrop-blur-xs select-none shadow-xs"
              >
                <UITableRow className="border-b border-border text-[11px] font-semibold text-text uppercase tracking-wider bg-surface-alt">
                  {(activeConfig.columns || []).map((col) => (
                    <UITableHead
                      key={col.key}
                      sticky
                      align={col.align || "left"}
                      className="whitespace-nowrap px-3.5 py-3"
                    >
                      {col.label}
                    </UITableHead>
                  ))}
                  <UITableHead sticky align="center" className="min-w-[80px]">
                    Action
                  </UITableHead>
                </UITableRow>
              </UITableHeader>

              <UITableBody className="divide-y divide-border/40 text-[12.5px]">
                {displayedRows.length === 0 ? (
                  <UITableEmpty
                    colSpan={(activeConfig.columns?.length || 5) + 1}
                    title="No records found in this report"
                    description="No entries matched your search query or filters. Try clearing filters to see all entries."
                    action={
                      searchQuery || selectedModeFilter !== "all" || selectedStatusFilter !== "all" ? (
                        <UIButton
                          variant="secondary"
                          size="sm"
                          onClick={handleResetFilters}
                        >
                          Clear Filters
                        </UIButton>
                      ) : undefined
                    }
                  />
                ) : (
                  displayedRows.map((row) => (
                    <UITableRow
                      key={row.id}
                      className="hover:bg-surface-hover/70 transition-colors"
                    >
                      {(activeConfig.columns || []).map((col) => {
                        const val = row[col.key];

                        if (col.isStatus) {
                          return (
                            <UITableCell key={col.key} align={col.align || "center"}>
                              <span className="inline-flex items-center gap-1.5 text-xs text-text font-medium">
                                <span className="size-2 rounded-full bg-[#10b981]" />
                                <span>{String(val || "Active")}</span>
                              </span>
                            </UITableCell>
                          );
                        }

                        if (col.isCurrency) {
                          return (
                            <UITableCell
                              key={col.key}
                              align={col.align || "right"}
                              className={cn(
                                "font-mono tabular-nums",
                                col.highlight ? "font-bold text-text" : "text-text"
                              )}
                            >
                              ₹{formatCurrency(val)}
                            </UITableCell>
                          );
                        }

                        return (
                          <UITableCell
                            key={col.key}
                            align={col.align || "left"}
                            className={cn(
                              "whitespace-nowrap px-3.5 py-2.5",
                              col.highlight ? "font-bold text-text" : "text-text"
                            )}
                          >
                            {String(val ?? "—")}
                          </UITableCell>
                        );
                      })}

                      <UITableCell align="center">
                        <div className="flex items-center justify-center gap-1">
                          <UIButton
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setPreviewRecord(row)}
                            className="h-7 px-2 text-xs font-semibold text-text hover:bg-surface-alt"
                          >
                            View
                          </UIButton>
                          <UIButton
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-text-muted hover:text-text"
                          >
                            <MoreVertical className="size-3.5" />
                          </UIButton>
                        </div>
                      </UITableCell>
                    </UITableRow>
                  ))
                )}
              </UITableBody>
            </UITable>

            {/* Reusable UIInfiniteScroll Component (Same as Invoice & Account Balances pages) */}
            {displayedRows.length > 0 && (
              <UIInfiniteScroll
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
                isLoading={isLoadingMore}
                rootRef={tableContainerRef}
                scrollContainerRef={tableContainerRef}
                rootMargin="160px"
                endMessage={
                  !hasMore && displayedRows.length > 0 ? (
                    <div className="py-3 text-center border-t border-border/40 bg-surface-alt/30 select-none">
                      <span className="font-mono text-[11px] text-text-muted">
                        ✓ All {filteredRows.length} report records loaded
                      </span>
                    </div>
                  ) : null
                }
              />
            )}
          </div>
        </div>
      </div>

      {/* Universal Report Record Quick Preview Modal */}
      {previewRecord && (
        <UIModal
          isOpen={Boolean(previewRecord)}
          onClose={() => setPreviewRecord(null)}
          size="md"
        >
          <UIModalHeader>
            <UIModalTitle>
              {previewRecord.invoiceNo ||
                previewRecord.billNo ||
                previewRecord.returnNo ||
                previewRecord.customer ||
                previewRecord.name ||
                previewRecord.brand ||
                previewRecord.reportName ||
                "Report Record Details"}
            </UIModalTitle>
          </UIModalHeader>
          <UIModalBody className="space-y-3 font-sans text-sm">
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(previewRecord)
                .filter(([k]) => k !== "id")
                .map(([k, v]) => (
                  <div key={k} className="p-2 rounded-lg bg-surface-alt/50">
                    <span className="text-text-muted capitalize block text-[11px]">
                      {k.replace(/([A-Z])/g, " $1")}:
                    </span>
                    <span className="font-semibold text-text mt-0.5 block">
                      {String(v)}
                    </span>
                  </div>
                ))}
            </div>
          </UIModalBody>
          <UIModalFooter>
            <UIButton
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPreviewRecord(null)}
            >
              Close
            </UIButton>
          </UIModalFooter>
        </UIModal>
      )}
    </div>
  );
};

export default ReportDetailView;

