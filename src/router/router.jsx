import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Coverage from "../pages/Coverage/Coverage";
import PrivateRoute from "../Routes/PrivateRoute";
import SendParcel from "../pages/Home/Sendparcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import TrackParcel from "../pages/Dashboard/TrackParcel/TrackParcel";
import BeARider from "../pages/Dashboard/BeARider/BeARider";
import PendingRiders from "../pages/Dashboard/PrendingRiders/PendingRiders";
import ActiveRiders from "../pages/Dashboard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../pages/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "../Routes/AdminRoute";
import AssignRider from "../pages/Dashboard/AssignRider/AssignRider";
import RiderRoute from "../Routes/RiderRoute";
import PendingDeliveries from "../pages/Dashboard/PendingDelveries/PendingDeliveries";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
      },
      {
        path: 'forbidden',
        Component: Forbidden,
      },
      {
        path: 'beARider',
        element:(
          <PrivateRoute>
            <BeARider/>
          </PrivateRoute>
        )
      },
      {
        path: "/sendParcel",
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path:'/dashboard',
    element: <PrivateRoute>
      <DashboardLayout/>
    </PrivateRoute>,
    children:[
      {
        path:'myParcels',
        Component: MyParcels,
      },
      {
        path:'payment/:id',
        Component: Payment,
      },
      {
        path: 'paymentHistory',
        Component: PaymentHistory,
      },
      {
        path:'track',
        Component: TrackParcel,
      },
      // rider only routes
      {
        path: 'pendingDeliveries',
        element: <RiderRoute>
          <PendingDeliveries/>
        </RiderRoute>
      },
      // admin only routes
      {
        path: "assignRider",
        element: 
        <AdminRoute>
          <AssignRider/>
        </AdminRoute>
      },
      {
        path:'PendingRiders',
        element :
        <AdminRoute>
          <PendingRiders/>
        </AdminRoute>
      },
      {
        path: "activeRiders",
        element :
        <AdminRoute>
          <ActiveRiders/>
        </AdminRoute>
      },
      {
        path:"makeAdmin",
        element: 
        <AdminRoute>
          <MakeAdmin/>
        </AdminRoute>,
      }
    ]
  }
]);
