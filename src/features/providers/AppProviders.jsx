import { FinanceProvider } from '../context/FinanceContext';

export default function AppProviders({ children }) {
  return <FinanceProvider>{children}</FinanceProvider>;
}