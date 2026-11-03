// src/features/dashboard/components/branch/BranchKpiGrid.jsx

import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, FileText, Users, CreditCard, Package, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UICard, UISkeleton } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants";

export const BranchKpiGrid = ({ kpis, className, isLoading = false }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-3.5", className)}>
        {[1, 2, 3, 4, 5].map((i) => (
          <UICard key={i} variant="default" className="p-3.5 sm:p-4 rounded-xl border border-border bg-surface">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <UISkeleton className="h-3 w-20" />
                <UISkeleton className="h-6 w-28" />
              </div>
              <UISkeleton className="size-9 rounded-lg" />
            </div>
            <div className="mt-3 pt-2 border-t border-border/50">
              <UISkeleton className="h-3 w-24" />
            </div>
          </UICard>
        ))}
      </div>
    );
  }

  const cards = [
    {
      id: "todays-sales",
      title: "Today's Sales",
      value: `₹ ${(kpis?.todaysSales ?? 0).toLocaleString("en-IN")}`,
      growth: kpis?.todaysSalesGrowth ?? 0,
      icon: ShoppingCart,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200/50 dark:border-emerald-800/50",
      route: ROUTES.SALES || "/sales",
    },
    {
      id: "total-invoices",
      title: "Total Invoices",
      value: (kpis?.totalInvoices ?? 0).toLocaleString("en-IN"),
      growth: kpis?.totalInvoicesGrowth ?? 0,
      icon: FileText,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-50 dark:bg-blue-950/40 border-blue-200/50 dark:border-blue-800/50",
      route: ROUTES.SALES || "/sales",
    },
    {
      id: "new-customers",
      title: "New Customers",
      value: (kpis?.newCustomers ?? 0).toLocaleString("en-IN"),
      growth: kpis?.newCustomersGrowth ?? 0,
      icon: Users,
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBg: "bg-purple-50 dark:bg-purple-950/40 border-purple-200/50 dark:border-purple-800/50",
      route: ROUTES.CUSTOMERS || "/parties/customers",
    },
    {
      id: "avg-bill-value",
      title: "Avg. Bill Value",
      value: `₹ ${(kpis?.avgBillValue ?? 0).toLocaleString("en-IN")}`,
      growth: kpis?.avgBillValueGrowth ?? 0,
      icon: CreditCard,
      iconColor: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200/50 dark:border-amber-800/50",
      route: ROUTES.SALES || "/sales",
    },
    {
      id: "items-sold",
      title: "Items Sold",
      value: (kpis?.itemsSold ?? 0).toLocaleString("en-IN"),
      growth: kpis?.itemsSoldGrowth ?? 0,
      icon: Package,
      iconColor: "text-rose-600 dark:text-rose-400",
      iconBg: "bg-rose-50 dark:bg-rose-950/40 border-rose-200/50 dark:border-rose-800/50",
      route: ROUTES.WORKSPACE_PRODUCTS || "/workspace-products",
    },
  ];

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-3.5", className)}>
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        const growthVal = Number(card.growth ?? 0);
        const isPositive = growthVal > 0;
        const isNegative = growthVal < 0;

        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
          >
            <UICard
              variant="default"
              onClick={() => card.route && navigate(card.route)}
              className="p-3.5 sm:p-4 rounded-xl border border-border bg-surface shadow-2xs hover:border-primary/40 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <span className="text-[11px] sm:text-xs font-medium text-text-muted truncate block">
                    {card.title}
                  </span>
                  <div className="text-lg sm:text-xl font-bold font-mono tabular-nums text-text truncate">
                    {card.value}
                  </div>
                </div>

                <div
                  className={cn(
                    "size-9 rounded-lg border flex items-center justify-center shrink-0 shadow-2xs transition-transform group-hover:scale-105",
                    card.iconBg,
                    card.iconColor
                  )}
                >
                  <IconComponent className="size-4.5" />
                </div>
              </div>

              {/* Trend Pill */}
              <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-border/50 text-[11px] min-w-0 font-mono">
                {isPositive ? (
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-0.5 shrink-0">
                    <ArrowUpRight className="size-3" />
                    <span>+{growthVal}%</span>
                  </span>
                ) : isNegative ? (
                  <span className="font-semibold text-rose-600 dark:text-rose-400 inline-flex items-center gap-0.5 shrink-0">
                    <ArrowDownRight className="size-3" />
                    <span>{growthVal}%</span>
                  </span>
                ) : (
                  <span className="font-medium text-text-muted inline-flex items-center gap-0.5 shrink-0">
                    <Minus className="size-3" />
                    <span>0%</span>
                  </span>
                )}
                <span className="text-text-muted font-normal text-[10px] sm:text-[11px] truncate">vs yesterday</span>
              </div>
            </UICard>
          </motion.div>
        );
      })}
    </div>
  );
};

export default BranchKpiGrid;
