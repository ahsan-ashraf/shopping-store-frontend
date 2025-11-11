import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/main-layout";
import Home from "../pages/home";
import About from "../pages/about";
import Contact from "../pages/contact";
import { AppRoutes } from "./routes-metadata";
import ProductDetails from "../pages/product/product-details";
import Wishlist from "../pages/wishlist";
import Cart from "../pages/cart";
import Profile from "../pages/profile/profile";
import BuyerOrders from "../pages/buyer-orders/buyer-orders";
import OrdersToDeliver from "../pages/orders-to-deliver";
import OrderReturnRequests from "../pages/order-return-requests";
import OrdersHistory from "../pages/order-history";
import UserRegistration from "../pages/registration/user-registration";
import PublishProduct from "../pages/product/publish-product";
import StoreRegistration from "../pages/store-registration";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Home} element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={AppRoutes.About} element={<About />} />
          <Route path={AppRoutes.Contact} element={<Contact />} />
          <Route path={AppRoutes.Registration} element={<UserRegistration />} />

          {/* protected routes */}
          <Route path={AppRoutes.Profile} element={<Profile />} />
          <Route path={AppRoutes.Wishlist} element={<Wishlist />} />
          <Route path={AppRoutes.Cart} element={<Cart />} />
          <Route path={AppRoutes.BuyerOrders} element={<BuyerOrders />} />
          <Route path={AppRoutes.ProductDetails} element={<ProductDetails />} />
          <Route path={AppRoutes.PublishProduct} element={<PublishProduct />} />
          <Route
            path={AppRoutes.RegisterStore}
            element={<StoreRegistration />}
          />
          <Route
            path={AppRoutes.RiderOrdersToDeliver}
            element={<OrdersToDeliver />}
          />
          <Route
            path={AppRoutes.RiderOrdersReturnRequests}
            element={<OrderReturnRequests />}
          />
          <Route
            path={AppRoutes.RiderOrderHistory}
            element={<OrdersHistory />}
          />
          <Route
            path={AppRoutes.Invalid}
            element={<Navigate to={AppRoutes.Home} replace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
