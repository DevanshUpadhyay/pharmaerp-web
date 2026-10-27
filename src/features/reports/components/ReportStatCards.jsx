// src/features/reports/components/ReportStatCards.jsx

import React from "react";
import { cn } from "@/lib/utils";

const formatCurrency = (val) => {
  if (val === undefined || val === null || isNaN(Number(val))) return "0.00";
  return Number(val).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatNumber = (val) => {
  if (val === undefined || val === null || isNaN(Number(val))) return "0";
  return Number(val).toLocaleString("en-IN");
};

export const ReportStatCards = ({ statCards = [] }) => {
  if (!statCards || statCards.length === 0) return null;

  return (
    <div className="shrink-0">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          let displayVal = stat.value;
          if (stat.type === "currency") {
            displayVal = `₹${formatCurrency(stat.value)}`;
          } else if (stat.type === "number") {
            displayVal = formatNumber(stat.value);
          }

          return (
            <div
              key={stat.id}
              className="bg-surface rounded-xl border border-border p-3 flex items-center gap-3 shadow-2xs transition-colors"
            >
              <div
                className={cn(
                  "size-9 rounded-lg flex items-center justify-center shrink-0 border",
                  stat.bg || "bg-primary-soft",
                  stat.border || "border-primary/20",
                  stat.color || "text-primary"
                )}
              >
                <Icon className="size-4.5 stroke-[1.8]" />
              </div>
              <div className="min-w-0">
                <div className="text-[11.5px] font-medium text-text-muted truncate">
                  {stat.title}
                </div>
                <div className="text-lg sm:text-[21px] font-bold text-text leading-tight font-mono tabular-nums truncate">
                  {displayVal}
                </div>
                <div className="text-[10px] text-text-muted truncate mt-0.5">
                  {stat.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReportStatCards;
