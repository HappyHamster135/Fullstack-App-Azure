import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import GuestRoute from "./auth/GuestRoute.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import Layout from "./components/Layout.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import SubscriptionsPage from "./pages/SubscriptionsPage.jsx";

const DashboardPage = lazy(() => import("./pages/DashboardPage.jsx"));

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route element={<GuestRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path="dashboard"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <DashboardPage />
              </Suspense>
            }
          />
          <Route path="subscriptions" element={<SubscriptionsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
