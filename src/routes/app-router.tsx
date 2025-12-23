import React, { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppRoutes } from "./routes-metadata";
import MainLayout from "../layouts/main-layout";
import FallbackLoader from "../components/fallback-loader";

const Home = lazy(() => import("../pages/home"));
const About = lazy(() => import("../pages/about"));
const Contact = lazy(() => import("../pages/contact"));
const ProductDetails = lazy(() => import("../pages/product/product-details"));
const Wishlist = lazy(() => import("../pages/wishlist"));
const Cart = lazy(() => import("../pages/cart"));
const Profile = lazy(() => import("../pages/profile/profile"));
const BuyerOrders = lazy(() => import("../pages/buyer-orders/buyer-orders"));
const OrdersToDeliver = lazy(() => import("../pages/orders-to-deliver"));
const OrderReturnRequests = lazy(() => import("../pages/order-return-requests"));
const OrdersHistory = lazy(() => import("../pages/order-history"));
const UserRegistration = lazy(() => import("../pages/registration/user-registration"));
const LoginForm = lazy(() => import("../pages/login/login-form"));
const PublishProduct = lazy(() => import("../pages/product/publish-product"));
const StoreRegistration = lazy(() => import("../pages/store-registration"));
const StoreDetails = lazy(() => import("../pages/store-details/store-details"));
const SellerDashboard = lazy(() => import("../pages/seller-dashboard/seller-dashboard"));
const AdminDashboard = lazy(() => import("../pages/admin/admin-dashboard"));

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<FallbackLoader />}>
        <Routes>
          <Route path={AppRoutes.Home} element={<MainLayout />}>
            {/* public routes */}
            <Route index element={<Home />} />
            <Route path={AppRoutes.About} element={<About />} />
            <Route path={AppRoutes.Contact} element={<Contact />} />
            <Route path={AppRoutes.Login} element={<LoginForm />} />
            <Route path={`${AppRoutes.Registration}/:role`} element={<UserRegistration />} />

            {/* protected routes */}
            <Route path={AppRoutes.Admin} element={<AdminDashboard />} />
            <Route path={AppRoutes.Profile} element={<Profile />} />
            <Route path={AppRoutes.Wishlist} element={<Wishlist />} />
            <Route path={AppRoutes.Cart} element={<Cart />} />
            <Route path={AppRoutes.BuyerOrders} element={<BuyerOrders />} />
            <Route path={AppRoutes.StoreDetails} element={<StoreDetails />} />
            <Route path={AppRoutes.ProductDetails} element={<ProductDetails isOrderView={false} />} />
            <Route path={AppRoutes.OrderDetails} element={<ProductDetails isOrderView={true} />} />
            <Route path={AppRoutes.PublishProduct} element={<PublishProduct />} />
            <Route path={AppRoutes.SellerDashboard} element={<SellerDashboard />} />
            <Route path={AppRoutes.RegisterStore} element={<StoreRegistration />} />
            <Route path={AppRoutes.RiderOrdersToDeliver} element={<OrdersToDeliver />} />
            <Route path={AppRoutes.RiderOrdersReturnRequests} element={<OrderReturnRequests />} />
            <Route path={AppRoutes.RiderOrderHistory} element={<OrdersHistory />} />
            <Route path={AppRoutes.Invalid} element={<Navigate to={AppRoutes.Home} replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
