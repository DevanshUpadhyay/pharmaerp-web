import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getBankTransactions,
  getBankTransactionById,
  cancelBankTransaction,
  depositBankTransaction,
  withdrawBankTransaction,
} from "../store/bankTransactionThunk";

import {
  clearBankTransactionError,
  clearBankTransactionMessage,
  setCurrentBankTransaction,
  clearCurrentBankTransaction,
  clearBankTransactions,
  clearManagedBankTransaction,
} from "../store/bankTransactionSlice";

import {
  selectBankTransactions,
  selectCurrentBankTransaction,
  selectManagedBankTransaction,
  selectBankTransactionStatus,
  selectBankTransactionError,
  selectBankTransactionMessage,
  selectGetBankTransactionsStatus,
  selectGetBankTransactionStatus,
  selectCancelBankTransactionStatus,
  selectDepositBankTransactionStatus,
  selectWithdrawBankTransactionStatus,
} from "../store/bankTransactionSelector";

const useBankTransaction = () => {
  const dispatch = useDispatch();

  const bankTransactions = useSelector(selectBankTransactions);

  const currentBankTransaction = useSelector(selectCurrentBankTransaction);

  const managedBankTransaction = useSelector(selectManagedBankTransaction);

  const status = useSelector(selectBankTransactionStatus);

  const error = useSelector(selectBankTransactionError);

  const message = useSelector(selectBankTransactionMessage);

  const getBankTransactionsStatus = useSelector(
    selectGetBankTransactionsStatus,
  );

  const getBankTransactionStatus = useSelector(selectGetBankTransactionStatus);

  const cancelBankTransactionStatus = useSelector(
    selectCancelBankTransactionStatus,
  );

  const depositBankTransactionStatus = useSelector(
    selectDepositBankTransactionStatus,
  );

  const withdrawBankTransactionStatus = useSelector(
    selectWithdrawBankTransactionStatus,
  );

  const fetchBankTransactions = useCallback((params = {}) => {
    return dispatch(getBankTransactions(params)).unwrap();
  }, [dispatch]);

  const fetchBankTransactionById = useCallback((bankTransactionId) => {
    return dispatch(getBankTransactionById(bankTransactionId)).unwrap();
  }, [dispatch]);

  const submitCancelBankTransaction = useCallback((bankTransactionId, payload) => {
    return dispatch(
      cancelBankTransaction({
        bankTransactionId,
        payload,
      }),
    ).unwrap();
  }, [dispatch]);

  const submitDepositBankTransaction = useCallback((payload) => {
    return dispatch(depositBankTransaction(payload)).unwrap();
  }, [dispatch]);

  const submitWithdrawBankTransaction = useCallback((payload) => {
    return dispatch(withdrawBankTransaction(payload)).unwrap();
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearBankTransactionError());
  }, [dispatch]);

  const clearMessage = useCallback(() => {
    dispatch(clearBankTransactionMessage());
  }, [dispatch]);

  const saveCurrentBankTransaction = (payload) => {
    dispatch(setCurrentBankTransaction(payload));
  };

  const removeCurrentBankTransaction = () => {
    dispatch(clearCurrentBankTransaction());
  };

  const removeBankTransactions = () => {
    dispatch(clearBankTransactions());
  };

  const removeManagedBankTransaction = () => {
    dispatch(clearManagedBankTransaction());
  };

  return {
    bankTransactions,
    currentBankTransaction,
    managedBankTransaction,

    status,
    error,
    message,

    getBankTransactionsStatus,
    getBankTransactionStatus,
    cancelBankTransactionStatus,
    depositBankTransactionStatus,
    withdrawBankTransactionStatus,

    getBankTransactions: fetchBankTransactions,
    getBankTransactionById: fetchBankTransactionById,
    cancelBankTransaction: submitCancelBankTransaction,
    depositBankTransaction: submitDepositBankTransaction,
    withdrawBankTransaction: submitWithdrawBankTransaction,

    clearError,
    clearMessage,

    setCurrentBankTransaction: saveCurrentBankTransaction,
    clearCurrentBankTransaction: removeCurrentBankTransaction,

    clearBankTransactions: removeBankTransactions,

    clearManagedBankTransaction: removeManagedBankTransaction,
  };
};

export default useBankTransaction;
