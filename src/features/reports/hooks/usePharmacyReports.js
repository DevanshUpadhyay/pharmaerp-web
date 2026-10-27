import { useState, useCallback, useEffect, useRef } from "react";
import pharmacyReportsService from "../services/pharmacyReportsService";

const PAGE_LIMIT = 25;

export const usePharmacyReports = (initialReportKey = "daily-sales", initialBranchId = null) => {
  const [reportKey, setReportKey] = useState(initialReportKey);
  const [reportData, setReportData] = useState({
    summary: {},
    rows: [],
    total: 0,
    page: 1,
    limit: PAGE_LIMIT,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  // Compute default today date strings
  const todayStr = new Date().toISOString().split("T")[0];

  const [filters, setFilters] = useState({
    datePreset: "today",
    startDate: todayStr,
    endDate: todayStr,
    branchId: initialBranchId || "",
    search: "",
    daysThreshold: 90,
  });

  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [filters.search]);

  // Sync branchId if initial prop changes
  useEffect(() => {
    if (initialBranchId) {
      setFilters((prev) => ({ ...prev, branchId: initialBranchId }));
    }
  }, [initialBranchId]);

  // Build query params
  const buildParams = useCallback(
    (page = 1) => {
      const params = {
        page,
        limit: PAGE_LIMIT,
      };

      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;
      if (filters.branchId) params.branchId = filters.branchId;
      if (debouncedSearch) params.search = debouncedSearch;
      if (reportKey === "near-expiry" && filters.daysThreshold) {
        params.daysThreshold = filters.daysThreshold;
      }
      if (reportKey === "cash-register-tally" && filters.startDate) {
        params.date = filters.startDate;
      }

      return params;
    },
    [filters, debouncedSearch, reportKey]
  );

  // Fetch initial batch (Page 1)
  const fetchReport = useCallback(
    async (targetKey = reportKey) => {
      setIsLoading(true);
      setError(null);
      try {
        const params = buildParams(1);
        const res = await pharmacyReportsService.getReport(targetKey, params);
        const data = res.data?.data || {};

        setReportData({
          summary: data.summary || {},
          rows: Array.isArray(data.rows) ? data.rows : [],
          total: data.total || 0,
          page: 1,
          limit: PAGE_LIMIT,
        });
      } catch (err) {
        console.warn("Failed to fetch report:", err);
        setError(err.response?.data?.message || err.message || "Failed to load report data");
        setReportData({
          summary: {},
          rows: [],
          total: 0,
          page: 1,
          limit: PAGE_LIMIT,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [reportKey, buildParams]
  );

  // Load next batch via infinite scroll
  const loadMore = useCallback(async () => {
    if (isLoading || isLoadingMore || reportData.rows.length >= reportData.total) return;

    setIsLoadingMore(true);
    const nextPage = (reportData.page || 1) + 1;

    try {
      const params = buildParams(nextPage);
      const res = await pharmacyReportsService.getReport(reportKey, params);
      const data = res.data?.data || {};
      const newRows = Array.isArray(data.rows) ? data.rows : [];

      if (newRows.length > 0) {
        setReportData((prev) => ({
          ...prev,
          rows: [...prev.rows, ...newRows],
          page: nextPage,
          total: data.total ?? prev.total,
        }));
      }
    } catch (err) {
      console.warn("Failed to load more report data:", err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoading, isLoadingMore, reportData, buildParams, reportKey]);

  // Re-fetch on reportKey or filter change
  useEffect(() => {
    fetchReport(reportKey);
  }, [reportKey, filters.startDate, filters.endDate, filters.branchId, filters.daysThreshold, debouncedSearch]);

  // Date Preset Switcher
  const setDatePreset = useCallback((preset) => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    let start = todayStr;
    let end = todayStr;

    if (preset === "yesterday") {
      const yest = new Date();
      yest.setDate(yest.getDate() - 1);
      const yestStr = yest.toISOString().split("T")[0];
      start = yestStr;
      end = yestStr;
    } else if (preset === "last7days") {
      const d7 = new Date();
      d7.setDate(d7.getDate() - 7);
      start = d7.toISOString().split("T")[0];
      end = todayStr;
    } else if (preset === "thisMonth") {
      const mStart = new Date(today.getFullYear(), today.getMonth(), 1);
      start = mStart.toISOString().split("T")[0];
      end = todayStr;
    } else if (preset === "lastMonth") {
      const lmStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const lmEnd = new Date(today.getFullYear(), today.getMonth(), 0);
      start = lmStart.toISOString().split("T")[0];
      end = lmEnd.toISOString().split("T")[0];
    }

    setFilters((prev) => ({
      ...prev,
      datePreset: preset,
      startDate: start,
      endDate: end,
    }));
  }, []);

  const setFilterField = useCallback((field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];
    setFilters({
      datePreset: "today",
      startDate: today,
      endDate: today,
      branchId: initialBranchId || "",
      search: "",
      daysThreshold: 90,
    });
  }, [initialBranchId]);

  return {
    reportKey,
    setReportKey,
    reportData,
    isLoading,
    isLoadingMore,
    hasMore: reportData.rows.length < reportData.total,
    error,
    filters,
    setFilterField,
    setDatePreset,
    resetFilters,
    fetchReport,
    loadMore,
  };
};

export default usePharmacyReports;
