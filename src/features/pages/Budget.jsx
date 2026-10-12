import { useFinance } from '../context/FinanceContext';
import useForm from '../../hooks/useForm';
import { useBudget } from '../budget/hooks/useBudget';
import BudgetSummary from '../budget/components/BudgetSummary';
import { Button, Input } from '../lib/components';
import { formatCurrency } from '../utils/formatCurrency';
import styles from './Budget.module.css';

function validate({ monthlyLimit }) {
  const errors = {};
  if (monthlyLimit === '') errors.monthlyLimit = 'Limit is required';
  else if (Number.isNaN(Number(monthlyLimit)) || Number(monthlyLimit) <= 0)
    errors.monthlyLimit = 'Limit must be a positive number';
  return errors;
}

export default function Budget() {
  const { transactions, budget, dispatch } = useFinance();
  const { totalExpenses, byCategory, rawPercent, percent, barColor } = useBudget(
    transactions,
    budget.monthlyLimit
  );

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: { monthlyLimit: String(budget.monthlyLimit) },
    validate,
    onSubmit: ({ monthlyLimit }) =>
      dispatch({ type: 'UPDATE_BUDGET', payload: Number(monthlyLimit) }),
  });

  return (
    <div>
      <h1>Monthly Budget</h1>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          label="Monthly spending limit (Ksh)"
          name="monthlyLimit"
          type="number"
          value={values.monthlyLimit}
          onChange={handleChange}
          error={errors.monthlyLimit}
        />
        <Button type="submit">Update Budget</Button>
      </form>

      <BudgetSummary
        totalExpenses={totalExpenses}
        monthlyLimit={budget.monthlyLimit}
        percent={percent}
        rawPercent={rawPercent}
        barColor={barColor}
      />

      <section className={styles.breakdown}>
        <h2>Spending by Category</h2>
        {byCategory.length === 0 ? (
          <p>No expenses recorded yet.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Category</th>
                <th className={styles.right}>Amount Spent</th>
              </tr>
            </thead>
            <tbody>
              {byCategory.map(({ category, total }) => (
                <tr key={category}>
                  <td>{category}</td>
                  <td className={styles.right}>{formatCurrency(total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}