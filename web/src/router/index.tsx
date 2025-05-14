import {createBrowserRouter} from "react-router";
import Product from '../pages/Product'
import Employee from '../pages/Employee'
import Test from '../pages/Test'
import Order from '../pages/Order'
import OrderDetail from '../pages/OrderDetail'
import Color from '../pages/Color'
import Customer from '../pages/Customer'

const router = createBrowserRouter([
  {
    path: "/order",
    element: <Order/>,
  },
  {
    path: "/order/:id",
    element: <OrderDetail/>,
  },
  {
    path: "/color",
    element: <Color/>,
  },
  {
    path: "/customer",
    element: <Customer/>,
  },
  {
    path: "/product",
    element: <Product/>,
  },
  {
    path: "/employee",
    element: <Employee/>,
  },
  {
    path: "/test",
    element: <Test/>,
  },
]);

export default router