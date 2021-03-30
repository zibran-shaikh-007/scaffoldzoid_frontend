import React from "react";
import { BrowserRouter as Router,/*  HashRouter as Router */ Switch } from "react-router-dom"
import PublicRoute from "./routes/public";
import PrivateRoute from "./routes/private"
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';



//authenticated related pages
import Buyer from "./pages/buyer/buyer"
import Seller from "./pages/seller/seller"
import Profile from "./pages/seller/profile"
import SellerNavbar from "./pages/seller/sellerNav"
import Product from "./pages/seller/products"
import ProductAdd from "./pages/seller/productsAdd"
import productsUpdate from "./pages/seller/productsUpdate";
import SellerChart from "./pages/buyer/sellerChart"



//public pages
import Register from "./pages/authentication/register"
import Homepage from "./pages/homepage/homepage"
import Login from "./pages/authentication/login"




const App = () => {
  

  return (
    <>

      <NotificationContainer />
      <Router>

        <Switch>
          <PublicRoute restricted={false} component={Homepage} path="/" exact />
          <PublicRoute restricted={true} component={Register} path="/register/:role" exact />
          <PublicRoute restricted={true} component={Login} path="/login" exact />

         
           
              <PrivateRoute component={Buyer} path="/buyer" exact />
              <PrivateRoute component={SellerChart} path="/buyer/seller-profile/:user_id" exact />
           
           

         
            <SellerNavbar>
              <PrivateRoute component={Seller} path="/seller" exact />
              <PrivateRoute component={Profile} path="/seller/profile" exact />
              <PrivateRoute component={Product} path="/seller/product" exact />
              <PrivateRoute component={ProductAdd} path="/seller/product/add" exact />
              <PrivateRoute component={productsUpdate} path="/seller/product/edit/:id" exact />
            </SellerNavbar>
            

        </Switch>
      </Router>

    </>
  )


}

export default App;
