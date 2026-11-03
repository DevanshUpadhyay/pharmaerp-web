// src/features/dashboard/components/workspace/WorkspaceKpiGrid.jsx

import {
  Building2,
  Store,
  Users,
  ShieldCheck,
  Layers,
  Sparkles,
} from "lucide-react";
import { UIStatCard } from "@/components/ui";

export const WorkspaceKpiGrid = ({ kpis, isLoading = false }) => {
  const totalCompanies = kpis?.totalCompanies ?? 0;
  const totalBranches = kpis?.totalBranches ?? 0;
  const totalStaff = kpis?.totalStaff ?? 0;
  const totalRoles = kpis?.totalRoles ?? 0;

  const cards = [
    {
      id: "companies",
      title: "Registered Companies",
      value: `${totalCompanies} ${totalCompanies === 1 ? "Company" : "Companies"}`,
      subtitle: "Corporate legal entities",
      icon: Building2,
      color: "purple",
      valueClassName: "text-base sm:text-lg font-bold font-mono tracking-tight text-text tabular-nums whitespace-nowrap",
    },
    {
      id: "branches",
      title: "Branch Network",
      value: `${totalBranches} ${totalBranches === 1 ? "Branch" : "Branches"}`,
      subtitle: "Operating dispensaries",
      icon: Store,
      color: "primary",
      valueClassName: "text-base sm:text-lg font-bold font-mono tracking-tight text-text tabular-nums whitespace-nowrap",
    },
    {
      id: "staff",
      title: "Workspace Staff",
      value: `${totalStaff} ${totalStaff === 1 ? "Member" : "Members"}`,
      subtitle: "Assigned staff team",
      icon: Users,
      color: "info",
      valueClassName: "text-base sm:text-lg font-bold font-mono tracking-tight text-text tabular-nums whitespace-nowrap",
    },
    {
      id: "roles",
      title: "Access Roles",
      value: `${totalRoles} ${totalRoles === 1 ? "Role" : "Roles"}`,
      subtitle: "RBAC security roles",
      icon: ShieldCheck,
      color: "warning",
      valueClassName: "text-base sm:text-lg font-bold font-mono tracking-tight text-text tabular-nums whitespace-nowrap",
    },
    {
      id: "plan-tier",
      title: "Subscription Tier",
      value: kpis?.planName || "Enterprise Plan",
      subtitle: `${kpis?.planTier || "PRO"} Tier active`,
      icon: Layers,
      color: "purple",
      valueClassName: "text-sm sm:text-base font-bold font-mono tracking-tight text-text truncate whitespace-nowrap",
    },
    {
      id: "plan-validity",
      title: "Plan Validity",
      value: `${kpis?.daysLeft ?? 365} Days`,
      subtitle: `Valid till ${kpis?.validTill || "Continuous"}`,
      icon: Sparkles,
      color: "success",
      valueClassName: "text-base sm:text-lg font-bold font-mono tracking-tight text-emerald-700 dark:text-emerald-400 tabular-nums whitespace-nowrap",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3.5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <UIStatCard
            key={card.id}
            title={card.title}
            prefix={card.prefix}
            value={card.value}
            subtitle={card.subtitle}
            icon={<Icon className="size-5" />}
            color={card.color}
            valueClassName={card.valueClassName}
            isLoading={isLoading}
            variant="default"
            className="p-3.5 sm:p-4 rounded-xl border border-border bg-surface shadow-2xs hover:border-border/80 transition-all"
          />
        );
      })}
    </div>
  );
};

export default WorkspaceKpiGrid;