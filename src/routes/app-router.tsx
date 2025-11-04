import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/main-layout";
import Home from "../pages/home";
import About from "../pages/about";
import Contact from "../pages/contact";
import { AppRoutes } from "./routes-metadata";
import ProductDetails from "../pages/product-details";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Home} element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={AppRoutes.About} element={<About />} />
          <Route path={AppRoutes.Contact} element={<Contact />} />
          <Route path={AppRoutes.ProductDetails} element={<ProductDetails />} />
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
