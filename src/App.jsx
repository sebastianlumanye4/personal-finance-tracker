import { Routes, Route } from 'react-router-dom';
import RootLayouts from './features/layouts/RootLayouts';
import Home from './features/pages/Home';
import Transactions from './features/pages/Transactions';
import Budget from './features/pages/Budget';
import NotFound from './features/pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayouts />}>
        <Route index element={<Home />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="budget" element={<Budget />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}