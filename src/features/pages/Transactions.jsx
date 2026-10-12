import { useMemo, useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import useDebounce from '../../hooks/useDebounce';
import TransactionCard from '../transactions/components/TransactionCard';
import TransactionForm from '../transactions/components/TransactionForm';
import { Input } from '../lib/components';
import { CATEGORIES } from '../utils/constants';
import styles from './Transactions.module.css';

export default function Transactions() {
  const { transactions, dispatch } = useFinance();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const debouncedSearch = useDebounce(search, 400);

  const filtered = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    return [...transactions]
      .filter((t) => t.description.toLowerCase().includes(term))
      .filter((t) => category === 'All' || t.category === category)
      .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
  }, [transactions, debouncedSearch, category]);

  const handleAdd = (transaction) => dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  const handleRemove = (id) => dispatch({ type: 'REMOVE_TRANSACTION', payload: id });

  return (
    <div className={styles.layout}>
      <section>
        <h1>Transactions</h1>

        <div className={styles.filters}>
          <Input
            name="search"
            type="search"
            placeholder="Search description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search transactions"
          />
          <Input
            name="categoryFilter"
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Input>
        </div>

        {filtered.length === 0 ? (
          <p className={styles.empty}>No transactions found</p>
        ) : (
          <ul className={styles.list}>
            {filtered.map((t) => (
              <TransactionCard key={t.id} transaction={t} onRemove={handleRemove} />
            ))}
          </ul>
        )}
      </section>

      <aside>
        <TransactionForm onAdd={handleAdd} />
      </aside>
    </div>
  );
}