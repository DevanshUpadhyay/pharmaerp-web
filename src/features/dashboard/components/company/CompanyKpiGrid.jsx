// src/features/dashboard/components/company/CompanyKpiGrid.jsx

import {
  BarChart3,
  ShoppingCart,
  TrendingUp,
  Smartphone,
  Wallet,
  Landmark,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UICard, UISkeleton } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants";

const formatCurrency = (val) => {
  const num = Number(val ?? 0);
  return `₹ ${num.toLocaleString("en-IN")}`;
};

export const CompanyKpiGrid = ({ kpis, isLoading = false }) => {
  const navigate = useNavigate();

  const cards = [
    {
      id: "sales",
      title: "Total Sales",
      value: formatCurrency(kpis?.totalSales),
      growth: kpis?.totalSalesGrowth ?? 0,
      subtext: "vs prior period",
      icon: BarChart3,
      iconBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50",
      route: ROUTES.SALES || "/sales",
    },
    {
      id: "purchases",
      title: "Total Purchases",
      value: formatCurrency(kpis?.totalPurchases),
      growth: kpis?.totalPurchasesGrowth ?? 0,
      subtext: "vs prior period",
      icon: ShoppingCart,
      iconBg: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/50",
      route: ROUTES.PURCHASES || "/purchases",
    },
    {
      id: "profit",
      title: "Gross Profit",
      value: formatCurrency(kpis?.grossProfit),
      growth: kpis?.grossProfitGrowth ?? 0,
      subtext: "operational realization",
      icon: TrendingUp,
      iconBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/50",
      route: ROUTES.REPORTS_FINANCIAL || ROUTES.SALES || "/sales",
    },
    {
      id: "receivables",
      title: "Customer Receivables",
      value: formatCurrency(kpis?.outstandingReceivables),
      growth: kpis?.outstandingReceivablesGrowth ?? 0,
      subtext: "total customer credit dues",
      icon: Smartphone,
      iconBg: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200/50",
      route: ROUTES.CUSTOMERS || "/parties/customers",
    },
    {
      id: "payables",
      title: "Supplier Payables",
      value: formatCurrency(kpis?.outstandingPayables),
      growth: kpis?.outstandingPayablesGrowth ?? 0,
      subtext: "pending distributor dues",
      icon: Wallet,
      iconBg: "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/50",
      route: ROUTES.SUPPLIERS || "/parties/suppliers",
    },
    {
      id: "bank",
      title: "Corporate Treasury",
      value: formatCurrency(kpis?.bankBalance),
      growth: kpis?.bankBalanceGrowth ?? 0,
      subtext: "liquid bank balances",
      icon: Landmark,
      iconBg: "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border border-sky-200/50",
      route: ROUTES.BANK_ACCOUNTS || "/finance/treasury/bank-accounts",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <UICard key={i} variant="default" className="p-3.5 rounded-xl border border-border bg-surface">
            <div className="flex items-center gap-2">
              <UISkeleton className="size-8 rounded-lg" />
              <UISkeleton className="h-3 w-16" />
            </div>
            <div className="mt-3">
              <UISkeleton className="h-6 w-24" />
            </div>
            <div className="mt-2">
              <UISkeleton className="h-3 w-20" />
            </div>
          </UICard>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3.5">
      {cards.map((card) => {
        const Icon = card.icon;
        const growthVal = Number(card.growth ?? 0);
        const isPositive = growthVal > 0;
        const isNegative = growthVal < 0;

        return (
          <UICard
            key={card.id}
            variant="default"
            onClick={() => card.route && navigate(card.route)}
            className="p-3.5 rounded-xl border border-border bg-surface shadow-2xs flex flex-col justify-between hover:border-primary/50 hover:shadow-xs transition-all cursor-pointer group"
          >
            {/* Top row: Icon & Title */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={cn("p-2 rounded-lg shrink-0 transition-transform group-hover:scale-105", card.iconBg)}>
                <Icon className="size-4" />
              </div>
              <span className="text-xs font-medium text-text-muted leading-tight truncate">
                {card.title}
              </span>
            </div>

            {/* Middle: Calibrated Value (Zero Truncation) */}
            <div className="mt-3 min-w-0">
              <span className="text-base sm:text-lg xl:text-xl font-bold font-mono tracking-tight text-text tabular-nums whitespace-nowrap block">
                {card.value}
              </span>
            </div>

            {/* Bottom: Growth Badge / Subtext */}
            <div className="mt-2 flex items-center gap-1 text-[11px] font-medium min-w-0">
              {isPositive ? (
                <span className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 shrink-0 font-mono">
                  <ArrowUpRight className="size-3" />
                  {growthVal}%
                </span>
              ) : isNegative ? (
                <span className="inline-flex items-center gap-0.5 text-rose-600 dark:text-rose-400 shrink-0 font-mono">
                  <ArrowDownRight className="size-3" />
                  {Math.abs(growthVal)}%
                </span>
              ) : (
                <span className="inline-flex items-center gap-0.5 text-text-muted shrink-0 font-mono">
                  <Minus className="size-3" />
                  0%
                </span>
              )}
              <span className="text-text-muted font-normal truncate text-[10px] sm:text-[11px]">
                {card.subtext}
              </span>
            </div>
          </UICard>
        );
      })}
    </div>
  );
};

export default CompanyKpiGrid;
