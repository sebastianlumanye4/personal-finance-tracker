import { Badge } from '../../lib/components';
import { formatCurrency } from '../../utils/formatCurrency';
import styles from './BudgetSummary.module.css';

export default function BudgetSummary({
  totalExpenses,
  monthlyLimit,
  percent,
  rawPercent,
  barColor,
}) {
  return (
    <section className={styles.summary}>
      <div className={styles.header}>
        <h2>Spending Progress</h2>
        {rawPercent >= 100 && <Badge variant="danger">Budget exceeded</Badge>}
        {rawPercent >= 80 && rawPercent < 100 && (
          <Badge variant="warning">Over 80% used</Badge>
        )}
      </div>

      <p className={styles.figures}>
        {formatCurrency(totalExpenses)} of {formatCurrency(monthlyLimit)} spent (
        {Math.round(rawPercent)}%)
      </p>

      <div className={styles.track}>
        <div
          className={styles.bar}
          style={{ width: `${percent}%`, background: barColor }}
          role="progressbar"
          aria-valuenow={Math.round(percent)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </section>
  );
}