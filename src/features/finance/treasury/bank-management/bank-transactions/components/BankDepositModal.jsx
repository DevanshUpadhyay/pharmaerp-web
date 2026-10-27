// src/features/finance/treasury/bank-management/bank-transactions/components/BankDepositModal.jsx

import React, { useState, useEffect, useMemo } from "react";
import {
  UIModal,
  UIModalHeader,
  UIModalTitle,
  UIModalBody,
  UIModalFooter,
  UIButton,
  UIInput,
  UISelect,
  UIDatePicker,
  UIAlert,
  UIBadge,
} from "@/components/ui";
import {
  ArrowDownToLine,
  Landmark,
  Banknote,
  Building2,
  Zap,
  Smartphone,
  QrCode,
  FileText,
  Layers,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import useBankAccount from "@/features/finance/treasury/bank-management/bank-accounts/hooks/useBankAccount";
import useBankTransaction from "../hooks/useBankTransaction";
import useAccount from "@/features/finance/chart-of-accounts/accounts/hooks/useAccount";

const PAYMENT_MODES = [
  { value: "CASH", label: "Cash", icon: Banknote, desc: "Bank counter / CDM" },
  { value: "NEFT", label: "NEFT", icon: Building2, desc: "Bank wire" },
  { value: "RTGS", label: "RTGS", icon: Zap, desc: "High value wire" },
  { value: "IMPS", label: "IMPS", icon: Smartphone, desc: "Instant transfer" },
  { value: "UPI", label: "UPI", icon: QrCode, desc: "Virtual payment" },
  { value: "CHEQUE", label: "Cheque", icon: FileText, desc: "Personal cheque" },
  { value: "OTHER", label: "Other", icon: Layers, desc: "Direct transfer" },
];

const CATEGORY_OPTIONS = [
  {
    value: "CAPITAL_INFUSION",
    label: "Personal Funds / Owner's Capital Infusion",
    subtext: "Owner infusing personal capital into the company bank account",
  },
  {
    value: "DIRECT_INCOME",
    label: "Direct / Miscellaneous Income",
    subtext: "Direct income or non-sale credit received directly into bank",
  },
  {
    value: "OTHER",
    label: "Other Ledger Account (Custom)",
    subtext: "Choose a custom account from Chart of Accounts",
  },
];

const formatCurrency = (val) =>
  `₹ ${Number(val || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const getTodayISTString = () => {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
};

export const BankDepositModal = ({ isOpen, onClose, onSuccess }) => {
  const { bankAccounts, getBankAccounts } = useBankAccount();
  const { depositBankTransaction, depositBankTransactionStatus, clearError } =
    useBankTransaction();
  const { accounts, getAccounts } = useAccount();

  const [selectedBankAccountId, setSelectedBankAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("CASH");
  const [category, setCategory] = useState("CAPITAL_INFUSION");
  const [counterpartyAccountId, setCounterpartyAccountId] = useState("");
  const [transactionDate, setTransactionDate] = useState(getTodayISTString);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [narration, setNarration] = useState("");
  const [validationError, setValidationError] = useState("");

  const isSubmitting = depositBankTransactionStatus === "loading";

  // Pre-load bank accounts catalog when modal opens
  useEffect(() => {
    if (isOpen) {
      getBankAccounts({ all: true }).catch((err) =>
        console.warn("Failed to load bank accounts:", err)
      );
      if (typeof clearError === "function") clearError();
      setAmount("");
      setPaymentMode("CASH");
      setCategory("CAPITAL_INFUSION");
      setCounterpartyAccountId("");
      setReferenceNumber("");
      setNarration("");
      setValidationError("");
      setTransactionDate(getTodayISTString());
    }
  }, [isOpen, getBankAccounts, clearError]);

  // If accounts catalog is needed for "OTHER" category, fetch accounts
  useEffect(() => {
    if (category === "OTHER" && accounts?.length === 0) {
      getAccounts({ all: true }).catch((err) =>
        console.warn("Failed to load chart of accounts:", err)
      );
    }
  }, [category, accounts, getAccounts]);

  // Set default bank account to primary bank account if not selected
  useEffect(() => {
    if (isOpen && bankAccounts?.length > 0 && !selectedBankAccountId) {
      const primaryBank = bankAccounts.find((b) => b.isPrimary) || bankAccounts[0];
      if (primaryBank?._id) {
        setSelectedBankAccountId(primaryBank._id);
      }
    }
  }, [isOpen, bankAccounts, selectedBankAccountId]);

  // Selected Bank Account object and its live balance
  const selectedBankAccount = useMemo(() => {
    if (!Array.isArray(bankAccounts)) return null;
    return bankAccounts.find((b) => b._id === selectedBankAccountId) || null;
  }, [bankAccounts, selectedBankAccountId]);

  const currentBankBalance = Number(selectedBankAccount?.balance || 0);
  const numericAmount = parseFloat(amount) || 0;
  const projectedNewBalance = currentBankBalance + numericAmount;

  const bankAccountSelectOptions = useMemo(() => {
    const list = Array.isArray(bankAccounts) ? bankAccounts : [];
    return list.map((b) => {
      const bankTitle = b.bankMasterId?.name || b.accountName || "Bank";
      const last4 = b.accountNumber ? `•••• ${String(b.accountNumber).slice(-4)}` : "";
      const bal = formatCurrency(b.balance || 0);
      return {
        label: `${bankTitle} ${last4} (${bal})`,
        value: b._id,
      };
    });
  }, [bankAccounts]);

  const customAccountSelectOptions = useMemo(() => {
    const list = Array.isArray(accounts) ? accounts : [];
    return [
      { label: "Select Counterparty Ledger Account...", value: "" },
      ...list.map((a) => ({
        label: `${a.accountName} (${a.accountCode || a.accountNature || ""})`,
        value: a._id,
      })),
    ];
  }, [accounts]);

  const handleAmountChange = (e) => {
    const val = e.target.value;
    if (val === "" || /^\d*\.?\d{0,2}$/.test(val)) {
      setAmount(val);
      setValidationError("");
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!selectedBankAccountId) {
      setValidationError("Please select a target bank account.");
      return;
    }
    if (numericAmount <= 0) {
      setValidationError("Deposit amount must be greater than zero.");
      return;
    }
    if (category === "OTHER" && !counterpartyAccountId) {
      setValidationError("Please select a counterparty ledger account for custom category.");
      return;
    }

    const todayIST = getTodayISTString();
    let finalTxDate;
    if (!transactionDate || transactionDate === todayIST) {
      finalTxDate = new Date().toISOString();
    } else {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour12: false });
      finalTxDate = new Date(`${transactionDate}T${timeStr}+05:30`).toISOString();
    }

    const payload = {
      bankAccountId: selectedBankAccountId,
      amount: numericAmount,
      paymentMode,
      category,
      counterpartyAccountId: category === "OTHER" ? counterpartyAccountId : undefined,
      transactionDate: finalTxDate,
      referenceNumber: referenceNumber.trim() || undefined,
      narration: narration.trim() || undefined,
    };


    try {
      await depositBankTransaction(payload);
      // Refresh catalog balances
      if (typeof getBankAccounts === "function") {
        getBankAccounts({ all: true });
      }
      if (typeof onSuccess === "function") {
        onSuccess();
      }
      onClose();
    } catch (err) {
      setValidationError(err || "Failed to post direct deposit.");
    }
  };

  if (!isOpen) return null;

  return (
    <UIModal
      isOpen={isOpen}
      onClose={isSubmitting ? undefined : onClose}
      size="2xl"
      className="w-[900px] max-w-[96vw] max-h-[92vh] flex flex-col overflow-hidden select-none shadow-2xl"
    >
      {/* ── Modal Header: Emerald Theme + Icon + Live Direct Post Tag ── */}
      <UIModalHeader className="border-b border-border/80 px-6 py-4 bg-surface shrink-0">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="size-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 shrink-0">
              <ArrowDownToLine className="size-5.5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <UIModalTitle className="text-xl font-bold text-text tracking-tight">
                  Bank Direct Deposit
                </UIModalTitle>
                <UIBadge
                  variant="soft"
                  color="success"
                  icon={<ShieldCheck className="size-3" />}
                  className="font-bold text-[10.5px] uppercase tracking-wide"
                >
                  Directly Posted
                </UIBadge>
              </div>
              <p className="text-xs text-text-muted mt-0.5">
                Record funds deposited into bank account. Updates bank balance immediately. Independent of shifts.
              </p>
            </div>
          </div>
        </div>
      </UIModalHeader>

      {/* ── Modal Body: Scrollable Content Area ── */}
      <UIModalBody className="p-6 overflow-y-auto space-y-5 bg-bg flex-1">
        {/* Error Alert */}
        {validationError && (
          <UIAlert
            intent="danger"
            title="Validation Error"
            description={validationError}
            onClose={() => setValidationError("")}
          />
        )}

        {/* ── 1. Bank Account Selection & Current Balance Card ── */}
        <div className="rounded-2xl border border-border bg-surface p-4 shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-xs font-bold text-text uppercase tracking-wider flex items-center gap-1.5">
              <Landmark className="size-4 text-emerald-600 dark:text-emerald-400" />
              Target Corporate Bank Account
            </label>
            {selectedBankAccount && (
              <span className="text-xs text-text-muted">
                IFSC: <span className="font-mono font-bold text-text">{selectedBankAccount.ifscCode}</span>
                {selectedBankAccount.branchName && ` · ${selectedBankAccount.branchName}`}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <div className="md:col-span-2">
              <UISelect
                value={selectedBankAccountId}
                onChange={(val) => setSelectedBankAccountId(val)}
                options={bankAccountSelectOptions}
                placeholder="Choose Bank Account"
                size="lg"
                className="w-full"
              />
            </div>

            {/* Live Account Balance Pill */}
            <div className="bg-surface-alt border border-border/80 rounded-xl px-3.5 py-2 flex flex-col justify-center">
              <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider">
                Current Ledger Balance
              </span>
              <span className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
                {formatCurrency(currentBankBalance)}
              </span>
            </div>
          </div>
        </div>

        {/* ── 2. Payment Type / Channel Pill Grid (Descriptive Tag Only) ── */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-text uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="size-4 text-primary" />
            Payment Instrument / Channel
            <span className="text-[11px] font-normal text-text-muted lowercase">
              (descriptive reference tag only · no denomination math)
            </span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {PAYMENT_MODES.map((mode) => {
              const Icon = mode.icon;
              const isSelected = paymentMode === mode.value;
              return (
                <button
                  type="button"
                  key={mode.value}
                  onClick={() => setPaymentMode(mode.value)}
                  className={cn(
                    "flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all duration-150 cursor-pointer",
                    isSelected
                      ? "border-emerald-600 bg-emerald-50/70 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-500 shadow-xs scale-[1.02] ring-1 ring-emerald-500/30"
                      : "border-border bg-surface text-text hover:bg-surface-alt hover:border-border/90"
                  )}
                >
                  <Icon className={cn("size-5 mb-1 stroke-[2]", isSelected ? "text-emerald-600 dark:text-emerald-400" : "text-text-muted")} />
                  <span className="text-xs font-bold tracking-tight">{mode.label}</span>
                  <span className="text-[9px] text-text-muted truncate max-w-full mt-0.5">{mode.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 3. Deposit Amount & Live Projected Balance Card ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Amount Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text uppercase tracking-wider">
              Deposit Amount (₹) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg font-bold text-text-muted">
                ₹
              </span>
              <input
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                autoFocus
                className="w-full h-12 pl-8 pr-4 rounded-xl border border-border bg-surface text-xl font-bold font-mono tabular-nums text-text placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-2xs"
              />
            </div>
            <p className="text-[11px] text-text-muted">
              Enter the exact amount credited to your bank account.
            </p>
          </div>

          {/* Live Projected Balance Calculation Card */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span className="font-medium flex items-center gap-1.5">
                <TrendingUp className="size-4 text-emerald-600 dark:text-emerald-400" />
                Projected New Balance
              </span>
              <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                +{formatCurrency(numericAmount)}
              </span>
            </div>
            <div className="text-2xl font-black font-mono text-emerald-700 dark:text-emerald-300 tabular-nums my-1">
              {formatCurrency(projectedNewBalance)}
            </div>
            <div className="text-[10px] text-text-muted">
              Current: {formatCurrency(currentBankBalance)} + Deposit: {formatCurrency(numericAmount)}
            </div>
          </div>
        </div>

        {/* ── 4. Deposit Reason / Category Presets ── */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-text uppercase tracking-wider">
            Deposit Category / Accounting Offset
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {CATEGORY_OPTIONS.map((cat) => {
              const isSelected = category === cat.value;
              return (
                <div
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={cn(
                    "p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between select-none",
                    isSelected
                      ? "border-emerald-600 bg-emerald-500/10 dark:bg-emerald-950/30 text-text ring-1 ring-emerald-500/30"
                      : "border-border bg-surface text-text hover:bg-surface-alt"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{cat.label}</span>
                    {isSelected && <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                  </div>
                  <span className="text-[10px] text-text-muted mt-1 leading-tight">{cat.subtext}</span>
                </div>
              );
            })}
          </div>

          {/* If Custom Category Selected: Ledger Account Dropdown */}
          {category === "OTHER" && (
            <div className="mt-2.5 p-3 rounded-xl border border-dashed border-primary/40 bg-primary/5 space-y-1.5 animate-in fade-in-50 duration-200">
              <label className="text-xs font-semibold text-text">
                Select Chart of Accounts Ledger to Credit: <span className="text-rose-500">*</span>
              </label>
              <UISelect
                value={counterpartyAccountId}
                onChange={(val) => setCounterpartyAccountId(val)}
                options={customAccountSelectOptions}
                placeholder="Choose Ledger Account"
                size="md"
              />
            </div>
          )}
        </div>

        {/* ── 5. Reference, Date & Narration ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Reference Number / UTR / Cheque Number */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-text flex items-center justify-between">
              <span>
                {paymentMode === "CHEQUE"
                  ? "Cheque Number & Bank"
                  : paymentMode === "UPI"
                  ? "UPI Transaction ID / Ref #"
                  : "UTR / Bank Reference Number"}
              </span>
              <span className="text-[10px] text-text-muted font-normal">(Optional)</span>
            </label>
            <UIInput
              type="text"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              placeholder={
                paymentMode === "CHEQUE"
                  ? "e.g. CHQ-445892 (HDFC)"
                  : paymentMode === "UPI"
                  ? "e.g. 428987654321"
                  : "e.g. UTR / Ref # from bank"
              }
              size="md"
            />
          </div>

          {/* Transaction Date */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-text flex items-center gap-1.5">
              <Calendar className="size-3.5 text-text-muted" />
              Deposit Date
            </label>
            <UIDatePicker
              value={transactionDate}
              onChange={(val) => setTransactionDate(val || "")}
              placeholder="Select date"
              size="md"
            />
          </div>
        </div>

        {/* Narration */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-text flex items-center justify-between">
            <span>Narration / Reason Details</span>
            <span className="text-[10px] text-text-muted font-normal">(Optional)</span>
          </label>
          <UIInput
            type="text"
            value={narration}
            onChange={(e) => setNarration(e.target.value)}
            placeholder="e.g. Personal capital deposited for working capital..."
            size="md"
          />
        </div>
      </UIModalBody>

      {/* ── Modal Footer: Cancel & Post Direct Deposit ── */}
      <UIModalFooter className="border-t border-border/80 px-6 py-3.5 bg-surface flex items-center justify-between shrink-0">
        <div className="text-[11px] text-text-muted hidden sm:flex items-center gap-1.5">
          <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
          <span>Creates a posted Receipt Voucher · Updates ledger immediately</span>
        </div>

        <div className="flex items-center gap-2.5 ml-auto">
          <UIButton
            variant="outline"
            size="md"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4"
          >
            Cancel
          </UIButton>

          <UIButton
            variant="primary"
            size="md"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            disabled={isSubmitting || numericAmount <= 0}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 shadow-sm shadow-emerald-600/20"
          >
            Post Direct Deposit
          </UIButton>
        </div>
      </UIModalFooter>
    </UIModal>
  );
};

export default BankDepositModal;
