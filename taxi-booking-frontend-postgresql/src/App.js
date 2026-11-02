import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import CustomerDashboard from "./pages/customer/CustomerDashboard";
import BookRide from "./pages/customer/BookRide";
import BookingHistory from "./pages/customer/BookingHistory";
import Profile from "./pages/customer/Profile";

import DriverDashboard from "./pages/driver/DriverDashboard";
import AssignedRides from "./pages/driver/AssignedRides";
import DriverProfile from "./pages/driver/DriverProfile";
import Earnings from "./pages/driver/Earnings";

import AdminDashboard from "./pages/admin/AdminDashboard";
import VehicleManagement from "./pages/admin/VehicleManagement";
import DriverManagement from "./pages/admin/DriverManagement";
import BookingManagement from "./pages/admin/BookingManagement";
import Reports from "./pages/admin/Reports";
import UserManagement from "./pages/admin/UserManagement";
import Settings from "./pages/admin/Settings";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/customer"
          element={
            <ProtectedRoute requiredRole="CUSTOMER">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookride"
          element={
            <ProtectedRoute requiredRole="CUSTOMER">
              <BookRide />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute requiredRole="CUSTOMER">
              <BookingHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute requiredRole="CUSTOMER">
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver"
          element={
            <ProtectedRoute requiredRole="DRIVER">
              <DriverDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver/rides"
          element={
            <ProtectedRoute requiredRole="DRIVER">
              <AssignedRides />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver/profile"
          element={
            <ProtectedRoute requiredRole="DRIVER">
              <DriverProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver/earnings"
          element={
            <ProtectedRoute requiredRole="DRIVER">
              <Earnings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/drivers"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <DriverManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehicles"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <VehicleManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <BookingManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
