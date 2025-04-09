import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
const NewProduct = lazy(() => import("./pages/admin/NewProduct"));
const ProductManagement = lazy(() => import("./pages/admin/ProductManagement"));
const TransactionManagement = lazy(() => import("./pages/admin/TransactionManagement"));
const BarCharts = lazy(() => import("./pages/admin/BarChart"));
const PieCharts = lazy(() => import("./pages/admin/PieCharts"));
const LineCharts = lazy(() => import("./pages/admin/LineCharts"));
const StopWatch = lazy(() => import("./pages/admin/StopWatch"));
const Coupon = lazy(() => import("./pages/admin/Coupon"));
const Toss = lazy(() => import("./pages/admin/Toss"));

const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Products = lazy(() => import("./pages/admin/Products"));
const Customers = lazy(() => import("./pages/admin/Customers"));
const Transaction = lazy(() => import("./pages/admin/Transaction"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/transactions" element={<Transaction />} />

          {/* chart */}
          <Route path="/admin/chart/bar" element={<BarCharts />} />
          <Route path="/admin/chart/pie" element={<PieCharts />} />
          <Route path="/admin/chart/line" element={<LineCharts />} />

          {/* app */}
          <Route path="/admin/app/stopwatch" element={<StopWatch />} />
          <Route path="/admin/app/coupon" element={<Coupon />} />
          <Route path="/admin/app/toss" element={<Toss />} />

          {/* management */}
          <Route path="/admin/product/new" element={<NewProduct />} />
          <Route path="/admin/product/:id" element={<ProductManagement />} />
          <Route
            path="/admin/transaction/:id"
            element={<TransactionManagement />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
