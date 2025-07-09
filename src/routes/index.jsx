import { lazy, Suspense } from 'react';
import PageTransition from '../components/PageTransition';
import LoadingSpinner from '../components/LoadingSpinner';

// Lazy loaded pages
const Home = lazy(() => import('../pages/Home'));
const Rooms = lazy(() => import('../pages/Rooms'));
const Login = lazy(() => import('../pages/Login'));
const Restaurant = lazy(() => import('../pages/Restaurant'));
const Staff = lazy(() => import('../pages/Staff'));
const Signup = lazy(() => import('../pages/Signup'));
const NotFound = lazy(() => import('../components/NotFound'));

// Directly imported pages
import OrderList from '../pages/OrderList';
import RoomBookingsAdmin from '../pages/RoomBookingsAdmin';
import Maintenance from '../pages/Maintenance';
import AddRequirement from '../pages/AddRequirement';
import Events from '../pages/Events';
import EmployeeList from '../pages/EmployeeList';
import Contact from '../contents/Contact';
import About from '../contents/About';

const wrapWithTransition = (Component) => (
  <PageTransition>
    <Component />
  </PageTransition>
);

const wrapWithSuspense = (Component) => (
  <PageTransition>
    <Suspense fallback={<LoadingSpinner />}>
      {Component}
    </Suspense>
  </PageTransition>
);

export const routes = [
  {
    path: '/',
    element: wrapWithSuspense(<Home />),
  },
  {
    path: '/orders',
    element: wrapWithTransition(<OrderList />),
  },
  {
    path: '/employee-list',
    element: wrapWithTransition(<EmployeeList />),
  },
  {
    path: '/about',
    element: wrapWithTransition(<About />),
  },
  {
    path: '/privacy',
    element: wrapWithTransition(<Contact />),
  },
  {
    path: '/terms',
    element: wrapWithTransition(<Contact />),
  },
  {
    path: '/contact',
    element: wrapWithTransition(<Contact />),
  },
  {
    path: '/rooms',
    element: wrapWithSuspense(<Rooms />),
  },
  {
    path: '/events',
    element: wrapWithTransition(<Events />),
  },
  {
    path: '/restaurant',
    element: wrapWithSuspense(<Restaurant />),
  },
  {
    path: '/add-requirement',
    element: wrapWithTransition(<AddRequirement />),
  },
  {
    path: '/staff',
    element: wrapWithSuspense(<Staff />),
  },
  {
    path: '/login',
    element: wrapWithSuspense(<Login />),
  },
  {
    path: '/admin/room-bookings',
    element: wrapWithTransition(<RoomBookingsAdmin />),
  },
  {
    path: '/maintenance',
    element: wrapWithTransition(<Maintenance />),
  },
  {
    path: '/signup',
    element: wrapWithSuspense(<Signup />),
  },
  {
    path: '*',
    element: wrapWithSuspense(<NotFound />),
  },
]; 