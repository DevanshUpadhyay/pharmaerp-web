// src/features/reports/pages/ReportsHubPage.jsx

import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useIsMobile } from "@/hooks";
import ReportsHubDesktopPage from "./desktop/ReportsHubDesktopPage";
import ReportsHubMobilePage from "./mobile/ReportsHubMobilePage";

export const ReportsHubPage = () => {
  const isMobile = useIsMobile();
  const { reportKey: routeKey } = useParams();
  const [searchParams] = useSearchParams();

  const queryKey = searchParams.get("report");
  const activeKey = routeKey || queryKey || "daily-sales";

  return isMobile ? (
    <ReportsHubMobilePage defaultReportKey={activeKey} />
  ) : (
    <ReportsHubDesktopPage defaultReportKey={activeKey} />
  );
};

export default ReportsHubPage;
