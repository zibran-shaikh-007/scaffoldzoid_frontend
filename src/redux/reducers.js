import { combineReducers } from 'redux';
import authUser from './auth/reducer';
import sellerProduct from "./product/reducers"


const reducers = combineReducers({
  
  authUser,
  sellerProduct
 
});

export default reducers;
