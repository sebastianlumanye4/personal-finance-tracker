import { useMemo } from 'react';

export function useTransactions(transactions) {
  const totalIncome = useMemo(
    () => transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const totalExpenses = useMemo(
    () => transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const balance = totalIncome - totalExpenses;

  return { totalIncome, totalExpenses, balance };
}