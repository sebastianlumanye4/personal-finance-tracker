import { createContext, useContext, useEffect, useReducer, useMemo } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
const initialTransactions = [
  { id: 1, description: 'Salary',         category: 'Income',    amount: 85000, type: 'income',  date: '2026-06-01' },
  { id: 2, description: 'Rent',           category: 'Housing',   amount: 25000, type: 'expense', date: '2026-06-02' },
  { id: 3, description: 'Groceries',      category: 'Food',      amount: 8500,  type: 'expense', date: '2026-06-05' },
  { id: 4, description: 'Electricity',    category: 'Utilities', amount: 3200,  type: 'expense', date: '2026-06-07' },
  { id: 5, description: 'Freelance Work', category: 'Income',    amount: 15000, type: 'income',  date: '2026-06-10' },
  { id: 6, description: 'Matatu fare',    category: 'Transport', amount: 1500,  type: 'expense', date: '2026-06-12' },
  { id: 7, description: 'Airtime',        category: 'Utilities', amount: 500,   type: 'expense', date: '2026-06-14' },
  { id: 8, description: 'Dinner out',     category: 'Food',      amount: 2200,  type: 'expense', date: '2026-06-15' },
];

const initialUser = { name: 'Alice Kamau' };
const initialBudget = { monthlyLimit: 50000 };

function financeReducer(state, action) {
  switch (action.type) {
    case 'ADD_TRANSACTION': {
      const nextId = state.transactions.reduce((max, t) => Math.max(max, t.id), 0) + 1;
      return {
        ...state,
        transactions: [...state.transactions, { ...action.payload, id: nextId }],
      };
    }
    case 'REMOVE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    case 'UPDATE_BUDGET':
      return { ...state, budget: { ...state.budget, monthlyLimit: action.payload } };
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, name: action.payload.name } };
    default:
      return state;
  }
}

const FinanceContext = createContext(null);

export function FinanceProvider({ children }) {
  const [storedTransactions, setStoredTransactions] = useLocalStorage(
    'finance-transactions',
    initialTransactions
  );
  const [storedBudget, setStoredBudget] = useLocalStorage('finance-budget', initialBudget);

  const [state, dispatch] = useReducer(financeReducer, {
    transactions: storedTransactions,
    budget: storedBudget,
    user: initialUser,
  });

  // Sync reducer state back to localStorage after each change
  useEffect(() => {
    setStoredTransactions(state.transactions);
  }, [state.transactions, setStoredTransactions]);

  useEffect(() => {
    setStoredBudget(state.budget);
  }, [state.budget, setStoredBudget]);

  const value = useMemo(() => ({ ...state, dispatch }), [state]);

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === null) {
    throw new Error('useFinance must be used inside a FinanceProvider');
  }
  return context;
}