import { NavLink, Outlet } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';
import { useTransactions } from '../transactions/hooks/useTransactions';
import { formatCurrency } from '../utils/formatCurrency';
import styles from './RootLayout.module.css';

export default function RootLayout() {
  const { transactions } = useFinance();
  const { balance } = useTransactions(transactions);

  const linkClass = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ''}`;

  return (
    <>
      <header className={styles.navbar}>
        <span className={styles.brand}> FinTrack</span>
        <nav className={styles.nav}>
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/transactions" className={linkClass}>Transactions</NavLink>
          <NavLink to="/budget" className={linkClass}>Budget</NavLink>
        </nav>
        <span className={balance >= 0 ? styles.positive : styles.negative}>
          {formatCurrency(balance)}
        </span>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}