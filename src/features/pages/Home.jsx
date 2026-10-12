import { Link } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';
import { useTransactions } from '../transactions/hooks/useTransactions';
import useFetch from '../../hooks/useFetch';
import { formatCurrency } from '../utils/formatCurrency';
import styles from './Home.module.css';

const FALLBACK_QUOTE = {
  content: 'A budget is telling your money where to go instead of wondering where it went.',
  author: 'Dave Ramsey',
};

export default function Home() {
  const { user, transactions } = useFinance();
  const { totalIncome, totalExpenses, balance } = useTransactions(transactions);
  const { data, loading, error } = useFetch('https://api.quotable.io/random?tags=money');

  const quote = Array.isArray(data) ? data[0] : data;
  const displayQuote = error || !quote?.content ? FALLBACK_QUOTE : quote;

  return (
    <div>
      <h1>Welcome back, {user.name} </h1>

      <div className={styles.cards}>
        <div className={styles.card}>
          <span className={styles.label}>Total Income</span>
          <span className={styles.income}>{formatCurrency(totalIncome)}</span>
        </div>
        <div className={styles.card}>
          <span className={styles.label}>Total Expenses</span>
          <span className={styles.expense}>{formatCurrency(totalExpenses)}</span>
        </div>
        <div className={styles.card}>
          <span className={styles.label}>Balance</span>
          <span className={balance >= 0 ? styles.income : styles.expense}>
            {formatCurrency(balance)}
          </span>
        </div>
      </div>

      <blockquote className={styles.quote}>
        {loading ? (
          <p>Loading quote…</p>
        ) : (
          <>
            <p>“{displayQuote.content}”</p>
            <footer>— {displayQuote.author}</footer>
          </>
        )}
      </blockquote>

      <div className={styles.links}>
        <Link to="/transactions">View Transactions →</Link>
        <Link to="/budget">Manage Budget →</Link>
      </div>
    </div>
  );
}