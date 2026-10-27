import { apiClient, ENDPOINTS } from "@/services";

const REPORT_ENDPOINT_MAP = {
  "daily-sales": ENDPOINTS.REPORTS.DAILY_SALES,
  "near-expiry": ENDPOINTS.REPORTS.NEAR_EXPIRY,
  "low-stock-reorder": ENDPOINTS.REPORTS.LOW_STOCK_REORDER,
  "stock-valuation": ENDPOINTS.REPORTS.STOCK_VALUATION,
  "customer-outstanding": ENDPOINTS.REPORTS.CUSTOMER_OUTSTANDING,
  "supplier-payables": ENDPOINTS.REPORTS.SUPPLIER_PAYABLES,
  "purchase-register": ENDPOINTS.REPORTS.PURCHASE_REGISTER,
  "doctor-referral": ENDPOINTS.REPORTS.DOCTOR_REFERRAL,
  "schedule-h-register": ENDPOINTS.REPORTS.SCHEDULE_H_REGISTER,
  "upi-settlement": ENDPOINTS.REPORTS.UPI_SETTLEMENT,
  "cash-register-tally": ENDPOINTS.REPORTS.CASH_REGISTER_TALLY,

  // Financial Statements
  "trial-balance": ENDPOINTS.REPORTS.TRIAL_BALANCE,
  "general-ledger": ENDPOINTS.REPORTS.GENERAL_LEDGER,
  "customer-ledger": ENDPOINTS.REPORTS.CUSTOMER_LEDGER,
  "supplier-ledger": ENDPOINTS.REPORTS.SUPPLIER_LEDGER,
  "cash-book": ENDPOINTS.REPORTS.CASH_BOOK,
  "bank-book": ENDPOINTS.REPORTS.BANK_BOOK,
  "profit-loss": ENDPOINTS.REPORTS.PROFIT_LOSS,
  "balance-sheet": ENDPOINTS.REPORTS.BALANCE_SHEET,
  "gst-report": ENDPOINTS.REPORTS.GST_REPORT,
};

const pharmacyReportsService = {
  getReport(reportKey, params = {}) {
    const endpoint = REPORT_ENDPOINT_MAP[reportKey] || `/reports/${reportKey}`;
    return apiClient.get(endpoint, { params });
  },

  getDailySales(params = {}) {
    return apiClient.get(ENDPOINTS.REPORTS.DAILY_SALES, { params });
  },

  getNearExpiry(params = {}) {
    return apiClient.get(ENDPOINTS.REPORTS.NEAR_EXPIRY, { params });
  },

  getLowStockReorder(params = {}) {
    return apiClient.get(ENDPOINTS.REPORTS.LOW_STOCK_REORDER, { params });
  },

  getStockValuation(params = {}) {
    return apiClient.get(ENDPOINTS.REPORTS.STOCK_VALUATION, { params });
  },

  getCustomerOutstanding(params = {}) {
    return apiClient.get(ENDPOINTS.REPORTS.CUSTOMER_OUTSTANDING, { params });
  },

  getSupplierPayables(params = {}) {
    return apiClient.get(ENDPOINTS.REPORTS.SUPPLIER_PAYABLES, { params });
  },

  getPurchaseRegister(params = {}) {
    return apiClient.get(ENDPOINTS.REPORTS.PURCHASE_REGISTER, { params });
  },

  getDoctorReferral(params = {}) {
    return apiClient.get(ENDPOINTS.REPORTS.DOCTOR_REFERRAL, { params });
  },

  getScheduleHRegister(params = {}) {
    return apiClient.get(ENDPOINTS.REPORTS.SCHEDULE_H_REGISTER, { params });
  },

  getUpiSettlement(params = {}) {
    return apiClient.get(ENDPOINTS.REPORTS.UPI_SETTLEMENT, { params });
  },

  getCashRegisterTally(params = {}) {
    return apiClient.get(ENDPOINTS.REPORTS.CASH_REGISTER_TALLY, { params });
  },
};

export default pharmacyReportsService;
