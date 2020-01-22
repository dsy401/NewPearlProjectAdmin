import { combineReducers } from "redux";
import menuBarReducer from './menuBarReducer'
import lotteryReducer from './lotteryReducer'
import localClientReducer from "./localClientReducer";
import StaffInfoReducer from './StaffInfoReducer'
import BrandReducer from './BrandReducer'
import ProductCategoryReducer from "./ProductCategoryReducer";
import NewsReducer from './NewsReducer'
import NewsEditReducer from "./NewsEditReducer";
export default combineReducers({
    menuBarReducer,lotteryReducer,localClientReducer,StaffInfoReducer,BrandReducer,
    ProductCategoryReducer,NewsReducer,NewsEditReducer
});
