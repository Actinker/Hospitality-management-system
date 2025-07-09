// src/App.jsx
import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import { AnimatePresence } from 'framer-motion';
import OrderList from './pages/OrderList';
import RoomBookingsAdmin from './pages/RoomBookingsAdmin';
import Maintenance from './pages/Maintenance';
import AddRequirement from './pages/AddRequirement'; 
import Events from './pages/Events';
import EmployeeList from './pages/EmployeeList';
import Contact from './contents/Contact';
import About from './contents/About';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const Rooms = lazy(() => import('./pages/Rooms'));
const Login = lazy(() => import('./pages/Login'));
const Restaurant = lazy(() => import('./pages/Restaurant'));
const Staff = lazy(() => import('./pages/Staff'));
const Signup = lazy(() => import('./pages/Signup'));
const NotFound = lazy(() => import('./components/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <ScrollToTop />
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Suspense fallback={<div className="text-center">Loading...</div>}>
                <Home />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/orders"
          element={
            <PageTransition>
              <Suspense fallback={<div className="text-center">Loading...</div>}>
                <OrderList />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/employee-list"
          element={
            <PageTransition>
              <Suspense fallback={<div className="text-center">Loading...</div>}>
                <EmployeeList />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <Suspense fallback={<div className="text-center">Loading...</div>}>
                <About />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/privacy"
          element={
            <PageTransition>
              <Suspense fallback={<div className="text-center">Loading...</div>}>
              <Contact />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/terms"
          element={
            <PageTransition>
              <Suspense fallback={<div className="text-center">Loading...</div>}>
              <Contact />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Suspense fallback={<div className="text-center">Loading...</div>}>
                <Contact />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/rooms"
          element={
            <PageTransition>
              <Suspense fallback={<div className="text-center">Loading...</div>}>
                <Rooms />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/events"
          element={
            <PageTransition>
              <Suspense fallback={<div className="text-center">Loading...</div>}>
                <Events />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/restaurant"
          element={
            <PageTransition>
              <Suspense fallback={<div className="text-center">Loading...</div>}>
                <Restaurant />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/add-requirement"
          element={
            <PageTransition>
              <Suspense fallback={<div className="text-center">Loading...</div>}>
                <AddRequirement />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/staff"
          element={
            <PageTransition>
              <Suspense fallback={<div className="text-center">Loading...</div>}>
                <Staff />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <Suspense fallback={<div className="text-center">Loading...</div>}>
                <Login />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/admin/room-bookings"
          element={
            <PageTransition>
              <Suspense fallback={<div className="text-center">Loading...</div>}>
                <RoomBookingsAdmin />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/maintenance"
          element={
            <PageTransition>
              <Suspense fallback={<div className="text-center">Loading...</div>}>
                <Maintenance />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/signup"
          element={
            <PageTransition>
              <Suspense fallback={<div className="text-center">Loading...</div>}>
                <Signup />
              </Suspense>
            </PageTransition>
          }
        />
        {/* NotFound Route */}
        <Route
          path="*"
          element={
            <PageTransition>
              <Suspense fallback={<div className="text-center">Loading...</div>}>
                <NotFound />
              </Suspense>
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Layout>
          <AnimatedRoutes />
        </Layout>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
