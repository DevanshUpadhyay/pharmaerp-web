import React, { useState, useEffect, useMemo } from "react";
import {
  UIModal,
  UIModalHeader,
  UIModalTitle,
  UIModalBody,
  UIModalFooter,
  UIBadge,
  UIButton,
} from "@/components/ui";
import {
  Calendar,
  Clock,
  Copy,
  Check,
  TrendingUp,
  TrendingDown,
  Scale,
  Landmark,
  Layers,
  FileText,
  ShieldCheck,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import journalVoucherService from "@/features/finance/journal-vouchers/services/journalVoucherService";

const formatCurrency = (val) => {
  if (val === undefined || val === null || isNaN(Number(val))) return "0.00";
  return Number(val).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatDate = (val) => {
  if (!val) return "—";
  const d = new Date(val);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (val) => {
  if (!val) return "";
  const d = new Date(val);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const LedgerEntryDetailsDialog = ({ isOpen, onClose, entry }) => {
  const [voucherDetails, setVoucherDetails] = useState(null);
  const [isLoadingVoucher, setIsLoadingVoucher] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Extract voucher ID from entry
  const voucherId = useMemo(() => {
    if (!entry) return null;
    if (entry.voucherId && typeof entry.voucherId === "object") {
      return entry.voucherId._id || null;
    }
    return entry.voucherId || null;
  }, [entry]);

  // Fetch full journal voucher details and its lines when modal opens
  useEffect(() => {
    if (!isOpen || !voucherId) {
      setVoucherDetails(null);
      setFetchError(null);
      return;
    }

    let isMounted = true;
    setIsLoadingVoucher(true);
    setFetchError(null);

    journalVoucherService
      .getJournalVoucherById(voucherId)
      .then((res) => {
        if (!isMounted) return;
        const data = res.data?.data || res.data || null;
        setVoucherDetails(data);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Failed to load journal voucher lines:", err);
        setFetchError("Could not retrieve full voucher balancing lines.");
      })
      .finally(() => {
        if (isMounted) setIsLoadingVoucher(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, voucherId]);

  if (!entry) return null;

  const debitVal = Number(entry.debit) || 0;
  const creditVal = Number(entry.credit) || 0;
  const runningBal = Number(entry.runningBalance) || 0;
  const isDebitBal = runningBal >= 0;
  const isDebitEntry = debitVal > 0;
  const entryAmount = isDebitEntry ? debitVal : creditVal;

  const accountObj =
    entry.accountId && typeof entry.accountId === "object"
      ? entry.accountId
      : null;

  const voucherObj =
    voucherDetails ||
    (entry.voucherId && typeof entry.voucherId === "object"
      ? entry.voucherId
      : null);

  const vNumber = entry.voucherNumber || voucherObj?.voucherNumber || "VCH-ENTRY";
  const voucherType = voucherObj?.voucherType || "JOURNAL";
  const referenceNo = voucherObj?.referenceNumber || null;
  const voucherStatus = voucherObj?.status || "POSTED";
  const voucherNarration = voucherObj?.narration || null;
  const entryNarration = entry.narration || null;

  // Copy helper
  const handleCopy = (e, text, key) => {
    e?.stopPropagation();
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Copy full summary
  const handleCopySummary = () => {
    const lines = [
      `General Ledger Entry: ${vNumber}`,
      `Date: ${formatDate(entry.voucherDate)} ${formatTime(entry.voucherDate)}`,
      `Account: ${accountObj?.accountName || "Account"} (${accountObj?.accountCode || "—"})`,
      `Type: ${voucherType} | Status: ${voucherStatus}`,
      `Amount: ${isDebitEntry ? "Debit (Dr)" : "Credit (Cr)"} ₹${formatCurrency(entryAmount)}`,
      `Running Balance: ₹${formatCurrency(Math.abs(runningBal))} ${isDebitBal ? "DR" : "CR"}`,
      referenceNo ? `Reference: ${referenceNo}` : null,
      entryNarration ? `Narration: ${entryNarration}` : null,
    ].filter(Boolean);

    navigator.clipboard.writeText(lines.join("\n"));
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  // Render voucher type badge
  const renderVoucherTypeBadge = (vType) => {
    const type = String(vType || "").toUpperCase();
    switch (type) {
      case "RECEIPT":
      case "CUSTOMER_RECEIPT":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Receipt
          </span>
        );
      case "PAYMENT":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            Payment
          </span>
        );
      case "CONTRA":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            Contra
          </span>
        );
      case "SALES":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            Sales
          </span>
        );
      case "PURCHASE":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            Purchase
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-surface-alt text-text-muted border border-border">
            {type || "Journal"}
          </span>
        );
    }
  };

  // Double entry lines
  const linesList = Array.isArray(voucherDetails?.lines) ? voucherDetails.lines : [];
  const totalDebit = linesList.reduce((acc, l) => acc + (Number(l.debit) || 0), 0);
  const totalCredit = linesList.reduce((acc, l) => acc + (Number(l.credit) || 0), 0);
  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01;

  return (
    <UIModal isOpen={isOpen} onClose={onClose} size="lg" className="max-w-[780px]">
      {/* Header */}
      <UIModalHeader className="border-b border-border/80 pb-3">
        <div className="flex items-center justify-between w-full pr-6">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <BookOpen className="size-4.5 stroke-[2]" />
            </div>
            <div>
              <UIModalTitle className="text-base font-bold text-text flex items-center gap-2">
                <span>General Ledger Entry</span>
                {renderVoucherTypeBadge(voucherType)}
                <UIBadge
                  variant="soft"
                  color={voucherStatus === "POSTED" ? "success" : "neutral"}
                  className="text-[10px] font-extrabold px-1.5 py-0.2"
                >
                  {voucherStatus}
                </UIBadge>
              </UIModalTitle>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-mono font-semibold text-text-muted">
                  Voucher: {vNumber}
                </span>
                <button
                  type="button"
                  onClick={(e) => handleCopy(e, vNumber, "voucherNo")}
                  className="p-0.5 rounded text-text-muted hover:text-text cursor-pointer transition-colors"
                  title="Copy voucher number"
                >
                  {copiedKey === "voucherNo" ? (
                    <Check className="size-3 text-success" />
                  ) : (
                    <Copy className="size-3" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </UIModalHeader>

      {/* Body */}
      <UIModalBody className="p-4 sm:p-5 space-y-4 max-h-[72vh] overflow-y-auto">
        {/* ── 1. Hero 4-Stat Metric Cards ─────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Card 1: Posting Date */}
          <div className="bg-surface-alt/40 border border-border/70 rounded-xl p-2.5">
            <div className="flex items-center gap-1.5 text-text-muted text-[11px] font-medium mb-1">
              <Calendar className="size-3.5 text-text-muted" />
              <span>Voucher Date</span>
            </div>
            <div className="text-[13px] font-bold text-text font-mono truncate">
              {formatDate(entry.voucherDate)}
            </div>
            <div className="text-[10.5px] text-text-muted font-mono flex items-center gap-1 mt-0.5">
              <Clock className="size-3" />
              <span>{formatTime(entry.voucherDate) || "Recorded"}</span>
            </div>
          </div>

          {/* Card 2: Line Amount & Flow */}
          <div className="bg-surface-alt/40 border border-border/70 rounded-xl p-2.5">
            <div className="flex items-center gap-1.5 text-text-muted text-[11px] font-medium mb-1">
              {isDebitEntry ? (
                <TrendingUp className="size-3.5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <TrendingDown className="size-3.5 text-rose-600 dark:text-rose-400" />
              )}
              <span>{isDebitEntry ? "Debit (Dr)" : "Credit (Cr)"}</span>
            </div>
            <div
              className={cn(
                "text-[14px] font-extrabold font-mono tabular-nums truncate",
                isDebitEntry
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400"
              )}
            >
              {isDebitEntry ? "+" : "-"} ₹{formatCurrency(entryAmount)}
            </div>
            <div className="text-[10.5px] text-text-muted truncate mt-0.5">
              {isDebitEntry ? "Inward / Debit flow" : "Outward / Credit flow"}
            </div>
          </div>

          {/* Card 3: Post-Transaction Running Balance */}
          <div className="bg-surface-alt/40 border border-border/70 rounded-xl p-2.5">
            <div className="flex items-center gap-1.5 text-text-muted text-[11px] font-medium mb-1">
              <Scale className="size-3.5 text-primary" />
              <span>Running Balance</span>
            </div>
            <div className="text-[14px] font-extrabold text-text font-mono tabular-nums flex items-baseline gap-1 truncate">
              <span>₹{formatCurrency(Math.abs(runningBal))}</span>
              <UIBadge
                variant="soft"
                color={isDebitBal ? "success" : "error"}
                className="text-[9px] font-black px-1 py-0"
              >
                {isDebitBal ? "DR" : "CR"}
              </UIBadge>
            </div>
            <div className="text-[10.5px] text-text-muted truncate mt-0.5">
              Post-entry balance
            </div>
          </div>

          {/* Card 4: Ledger Account */}
          <div className="bg-surface-alt/40 border border-border/70 rounded-xl p-2.5">
            <div className="flex items-center gap-1.5 text-text-muted text-[11px] font-medium mb-1">
              <Landmark className="size-3.5 text-primary" />
              <span>Target Account</span>
            </div>
            <div
              className="text-[13px] font-bold text-text truncate"
              title={accountObj?.accountName || "Account"}
            >
              {accountObj?.accountName || "Operating Account"}
            </div>
            <div className="text-[10.5px] text-text-muted font-mono truncate mt-0.5">
              {accountObj?.accountCode ? `(${accountObj.accountCode})` : "General"} · {accountObj?.accountNature || "ASSET"}
            </div>
          </div>
        </div>

        {/* ── 2. Reference & Narration Card ───────────────────────────────── */}
        <div className="bg-surface border border-border rounded-xl p-3 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Reference Document */}
            <div>
              <span className="text-[11px] font-semibold text-text-muted block">
                Reference Document
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-mono font-bold text-text">
                  {referenceNo || "Direct Ledger Posting"}
                </span>
                {referenceNo && (
                  <button
                    type="button"
                    onClick={(e) => handleCopy(e, referenceNo, "refNo")}
                    className="p-0.5 text-text-muted hover:text-text cursor-pointer transition-colors"
                    title="Copy reference number"
                  >
                    {copiedKey === "refNo" ? (
                      <Check className="size-3 text-success" />
                    ) : (
                      <Copy className="size-3" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Posting Status & Type */}
            <div>
              <span className="text-[11px] font-semibold text-text-muted block">
                Voucher Type / Scope
              </span>
              <span className="text-xs font-semibold text-text block mt-0.5">
                {voucherType} · {accountObj?.accountCategory || "General Ledger"}
              </span>
            </div>
          </div>

          {/* Line Narration */}
          {entryNarration && (
            <div className="pt-2 border-t border-border/60">
              <span className="text-[11px] font-semibold text-text-muted block">
                Entry Narration / Note
              </span>
              <p className="text-xs text-text leading-relaxed mt-0.5 italic">
                &ldquo;{entryNarration}&rdquo;
              </p>
            </div>
          )}

          {/* Voucher Header Memo if distinct */}
          {voucherNarration && voucherNarration !== entryNarration && (
            <div className="pt-2 border-t border-border/60">
              <span className="text-[11px] font-semibold text-text-muted block">
                Voucher Header Memo
              </span>
              <p className="text-xs text-text-muted leading-relaxed mt-0.5 italic">
                &ldquo;{voucherNarration}&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* ── 3. Complete Balanced Double-Entry Breakdown Table ───────────── */}
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="p-3 border-b border-border flex items-center justify-between bg-surface-alt/40">
            <div className="flex items-center gap-2">
              <Layers className="size-4 text-primary" />
              <span className="text-xs font-bold text-text">
                Complete Double-Entry Journal Lines
              </span>
            </div>
            {isBalanced && linesList.length > 0 && (
              <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <ShieldCheck className="size-3" />
                Balanced (Dr = Cr)
              </span>
            )}
          </div>

          {isLoadingVoucher ? (
            <div className="p-6 text-center text-xs text-text-muted flex items-center justify-center gap-2">
              <RotateCcw className="size-4 animate-spin text-primary" />
              <span>Loading complete journal voucher lines...</span>
            </div>
          ) : fetchError ? (
            <div className="p-4 text-center text-xs text-amber-600 dark:text-amber-400">
              {fetchError}
            </div>
          ) : linesList.length === 0 ? (
            <div className="p-4 text-center text-xs text-text-muted">
              No additional journal lines available for this voucher.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border bg-surface-alt/20 text-text-muted font-bold text-[11px]">
                    <th className="py-2 px-3 w-8 text-center">#</th>
                    <th className="py-2 px-3">Ledger Account</th>
                    <th className="py-2 px-3 w-28 text-right">Debit (₹ Dr)</th>
                    <th className="py-2 px-3 w-28 text-right">Credit (₹ Cr)</th>
                    <th className="py-2 px-3 min-w-[140px]">Line Memo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {linesList.map((line, idx) => {
                    const lAcc =
                      line.accountId && typeof line.accountId === "object"
                        ? line.accountId
                        : null;
                    const lDebit = Number(line.debit) || 0;
                    const lCredit = Number(line.credit) || 0;
                    const isCurrentAccount =
                      accountObj?._id &&
                      (lAcc?._id === accountObj._id || line.accountId === accountObj._id);

                    return (
                      <tr
                        key={line._id || idx}
                        className={cn(
                          "transition-colors",
                          isCurrentAccount
                            ? "bg-primary/5 font-semibold"
                            : "hover:bg-surface-hover/60"
                        )}
                      >
                        <td className="py-2 px-3 text-center text-text-muted font-mono text-[11px]">
                          {idx + 1}
                        </td>
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-1.5">
                            <span className="text-text font-bold">
                              {lAcc?.accountName || "Account"}
                            </span>
                            {lAcc?.accountCode && (
                              <span className="text-[10.5px] font-mono text-text-muted font-normal">
                                ({lAcc.accountCode})
                              </span>
                            )}
                            {isCurrentAccount && (
                              <span className="text-[9px] font-black uppercase tracking-wider bg-primary/15 text-primary px-1.5 py-0.2 rounded">
                                Active
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-2 px-3 text-right font-mono tabular-nums">
                          {lDebit > 0 ? (
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">
                              ₹{formatCurrency(lDebit)}
                            </span>
                          ) : (
                            <span className="text-text-muted/40 font-normal">—</span>
                          )}
                        </td>
                        <td className="py-2 px-3 text-right font-mono tabular-nums">
                          {lCredit > 0 ? (
                            <span className="font-bold text-rose-600 dark:text-rose-400">
                              ₹{formatCurrency(lCredit)}
                            </span>
                          ) : (
                            <span className="text-text-muted/40 font-normal">—</span>
                          )}
                        </td>
                        <td className="py-2 px-3 text-text-muted text-[11px] italic truncate max-w-[180px]">
                          {line.narration || "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-surface-alt/50 border-t-2 border-border font-bold text-xs">
                    <td colSpan={2} className="py-2.5 px-3 text-right text-text-muted font-medium">
                      Sum of Entries:
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                      ₹{formatCurrency(totalDebit)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-rose-600 dark:text-rose-400">
                      ₹{formatCurrency(totalCredit)}
                    </td>
                    <td className="py-2.5 px-3 text-[11px] text-text-muted font-normal">
                      {isBalanced ? "✓ Balanced" : "⚠ Imbalance"}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        {/* ── 4. Audit & System Identifiers ───────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-text-muted font-mono bg-surface-alt/20 border border-border/60 rounded-xl p-2.5">
          <div className="flex items-center justify-between truncate">
            <span>Entry ID: {entry._id || "—"}</span>
            {entry._id && (
              <button
                type="button"
                onClick={(e) => handleCopy(e, entry._id, "entryId")}
                className="p-0.5 hover:text-text cursor-pointer ml-1"
                title="Copy Entry ID"
              >
                {copiedKey === "entryId" ? (
                  <Check className="size-3 text-success" />
                ) : (
                  <Copy className="size-3" />
                )}
              </button>
            )}
          </div>
          <div className="flex items-center justify-between truncate">
            <span>Voucher ID: {voucherId || "—"}</span>
            {voucherId && (
              <button
                type="button"
                onClick={(e) => handleCopy(e, voucherId, "vchId")}
                className="p-0.5 hover:text-text cursor-pointer ml-1"
                title="Copy Voucher ID"
              >
                {copiedKey === "vchId" ? (
                  <Check className="size-3 text-success" />
                ) : (
                  <Copy className="size-3" />
                )}
              </button>
            )}
          </div>
        </div>
      </UIModalBody>

      {/* Footer */}
      <UIModalFooter className="border-t border-border/80 pt-3 flex items-center justify-between">
        <UIButton
          variant="outline"
          size="sm"
          onClick={handleCopySummary}
          className="gap-1.5 text-xs"
        >
          {copiedSummary ? (
            <>
              <Check className="size-3.5 text-success" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5 text-text-muted" />
              <span>Copy Summary</span>
            </>
          )}
        </UIButton>

        <UIButton variant="primary" size="sm" onClick={onClose}>
          Close
        </UIButton>
      </UIModalFooter>
    </UIModal>
  );
};

export default LedgerEntryDetailsDialog;
