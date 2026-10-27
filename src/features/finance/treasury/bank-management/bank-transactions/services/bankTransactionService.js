import { apiClient, ENDPOINTS } from "@/services";

const bankTransactionService = {
  getBankTransactions(params = {}) {
    return apiClient.get(ENDPOINTS.BANK_TRANSACTION.LIST, {
      params,
    });
  },

  getBankTransactionById(bankTransactionId) {
    return apiClient.get(ENDPOINTS.BANK_TRANSACTION.BY_ID(bankTransactionId));
  },

  deposit(payload) {
    return apiClient.post(ENDPOINTS.BANK_TRANSACTION.DEPOSIT, payload);
  },

  withdraw(payload) {
    return apiClient.post(ENDPOINTS.BANK_TRANSACTION.WITHDRAW, payload);
  },

  cancelBankTransaction(bankTransactionId, payload) {
    return apiClient.post(
      ENDPOINTS.BANK_TRANSACTION.CANCEL(bankTransactionId),
      payload,
    );
  },
};

export default bankTransactionService;
