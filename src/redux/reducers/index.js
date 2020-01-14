import { combineReducers } from "redux";
import menuBarReducer from './menuBarReducer'
import lotteryReducer from './lotteryReducer'
import localClientReducer from "./localClientReducer";
import StaffInfoReducer from './StaffInfoReducer'
import BrandReducer from './BrandReducer'
export default combineReducers({
    menuBarReducer,lotteryReducer,localClientReducer,StaffInfoReducer,BrandReducer
});
