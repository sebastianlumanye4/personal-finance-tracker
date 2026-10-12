import { Button, Badge } from '../../lib/components';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import styles from './TransactionCard.module.css';

export default function TransactionCard({ transaction, onRemove }) {
  const { id, description, category, amount, date, type } = transaction;
  const isIncome = type === 'income';

  return (
    <li className={styles.card}>
      <div className={styles.info}>
        <strong>{description}</strong>
        <span className={styles.meta}>
          {category} · {formatDate(date)}
        </span>
      </div>
      <Badge variant={isIncome ? 'success' : 'danger'}>{type}</Badge>
      <span className={isIncome ? styles.income : styles.expense}>
        {isIncome ? '+' : '-'}
        {formatCurrency(amount)}
      </span>
      <Button variant="danger" onClick={() => onRemove(id)}>
        Remove
      </Button>
    </li>
  );
}