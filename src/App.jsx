import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { CartProvider } from '@/components/cart/CartContext';
import Admin from '@/pages/admin/Admin';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminOrders from '@/pages/admin/AdminOrders';
import AdminReviews from '@/pages/admin/AdminReviews';
import AdminCustomOrders from '@/pages/admin/AdminCustomOrders';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';

import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import CustomOrder from '@/pages/CustomOrder';
import Cart from '@/pages/Cart';
import Referrals from '@/pages/Referrals';
import MyOrders from '@/pages/MyOrders';
import Reviews from '@/pages/Reviews';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-stone-200 border-t-amber-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/CustomOrder" element={<CustomOrder />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Referrals" element={<Referrals />} />
        <Route path="/MyOrders" element={<MyOrders />} />
        <Route path="/Reviews" element={<Reviews />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/reviews" element={<AdminReviews />} />
        <Route path="/admin/custom-orders" element={<AdminCustomOrders />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <CartProvider>
          <Router>
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </CartProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App