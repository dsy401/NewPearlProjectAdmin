import { combineReducers } from "redux";
import menuBarReducer from './menuBarReducer'
import lotteryReducer from './lotteryReducer'
import localClientReducer from "./localClientReducer";
import StaffInfoReducer from './StaffInfoReducer'
import BrandReducer from './BrandReducer'
import ProductCategoryReducer from "./ProductCategoryReducer";
export default combineReducers({
    menuBarReducer,lotteryReducer,localClientReducer,StaffInfoReducer,BrandReducer,
    ProductCategoryReducer
});
