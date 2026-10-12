import { useMemo } from 'react';
import { CATEGORIES } from '../../utils/constants';

export function useBudget(transactions, monthlyLimit) {
  const totalExpenses = useMemo(
    () => transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const byCategory = useMemo(
    () =>
      CATEGORIES.filter((c) => c !== 'Income')
        .map((category) => ({
          category,
          total: transactions
            .filter((t) => t.type === 'expense' && t.category === category)
            .reduce((sum, t) => sum + t.amount, 0),
        }))
        .filter((c) => c.total > 0),
    [transactions]
  );

  const rawPercent = monthlyLimit > 0 ? (totalExpenses / monthlyLimit) * 100 : 0;
  const percent = Math.min(rawPercent, 100);

  const barColor =
    rawPercent >= 100 ? 'var(--color-danger)' :
    rawPercent >= 80  ? 'var(--color-warning)' :
    'var(--color-success)';

  return { totalExpenses, byCategory, rawPercent, percent, barColor };
}