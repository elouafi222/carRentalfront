import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./styles.css";
import Home from "./pages/Home";
import { pathsNav, pathsFooter } from "./lib/util";
import Footer from "./components/Footer";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Booking from "./pages/Booking";
import Cars from "./pages/Cars";
import Profile from "./pages/Profile";
import AdminHome from "./pages/adminstration/AdminHome";
import { useSelector } from "react-redux";
import CarsList from "./components/CarsList";
import CarsTable from "./pages/adminstration/List/CarsTable";
import LocationTable from "./pages/adminstration/List/LocationTable";
import UsersTable from "./pages/adminstration/List/UsersTable";
import CitiesTable from "./pages/adminstration/List/CitiesTable";
import RequestTable from "./pages/adminstration/List/RequestTable";
import BookingsTable from "./pages/adminstration/List/BookingsTable";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import Payment from "./pages/Payment";
import ListPayment from "./pages/adminstration/List/ListPayment";
function NavigationNavbar() {
  const location = useLocation();
  const isNavbarVisible = !pathsNav.includes(location.pathname);
  return isNavbarVisible ? <Navbar /> : null;
}
function NavigationFooter() {
  const location = useLocation();

  const isFooterVisible = !pathsFooter.includes(location.pathname);
  return isFooterVisible ? <Footer /> : null;
}

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Toaster />
      <NavigationNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="adminstration">
          <Route
            index
            element={
              user?.role === 1 || user?.role === 2 ? (
                <AdminHome />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="requests"
            element={
              user?.role === 1 || user?.role === 2 ? (
                <RequestTable />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="bookingsHistory"
            element={
              user?.role === 1 || user?.role === 2 ? (
                <BookingsTable />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="cars"
            element={
              user?.role === 1 || user?.role === 2 ? (
                <CarsTable />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="payments"
            element={
              user?.role === 1 || user?.role === 2 ? (
                <ListPayment />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="locations"
            element={user?.role === 1 ? <LocationTable /> : <Navigate to="/" />}
          />
          <Route
            path="customers"
            element={user?.role === 1 ? <UsersTable /> : <Navigate to="/" />}
          />
          <Route
            path="cities"
            element={user?.role === 1 ? <CitiesTable /> : <Navigate to="/" />}
          />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<Forgot />} />
        <Route path="/resetPassword" element={<Reset />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <NavigationFooter />
    </BrowserRouter>
  );
}

export default App;
