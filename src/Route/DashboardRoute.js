import Home from "../containers/Dashboard/Home/Home";
import LotteryManagement from "../containers/Dashboard/LotteryManagement/LotteryManagement";
import WebClient from "../containers/Dashboard/WebClient/WebClient";
import LocalClient from "../containers/Dashboard/LocalClient/LocalClient";
import StaffInfo from "../containers/Dashboard/StaffInfo/StaffInfo";
import CompanyDescription from "../containers/Dashboard/CompanyDescription/CompanyDescription";
import Brand from "../containers/Dashboard/Brand/Brand";
import ProductCategory from "../containers/Dashboard/ProductCategory/ProductCategory";
import ChangePassword from "../containers/Dashboard/ChangePassword/ChangePassword";
import Product from "../containers/Dashboard/Product/Product";
import News from "../containers/Dashboard/Publish/Publish";
import NewsInfo from "../containers/Dashboard/NewsInfo/NewsInfo";
import NewsEdit from "../containers/Dashboard/NewsEdit/NewsEdit";

const match = "/dashboard";
export const DashboardRoute = [
    {
        name: "Home",
        component: Home,
        path: match +"/home",
        pos:0
    },
    {
        name: "Lottery Management",
        component: LotteryManagement,
        path: match +"/lotterymanagement",
        pos:1
    },
    {
        name: "Web Client",
        component: WebClient,
        path: match +"/webclient",
        pos:2
    },
    {
        name: "Local Client",
        component: LocalClient,
        path: match +"/localclient",
        pos:3
    },
    {
        name: "Staff Information",
        component: StaffInfo,
        path: match +"/staffinfo",
        pos:4
    },
    {
        name: "Company Description",
        component: CompanyDescription,
        path: match +"/companydescription",
        pos:5
    },
    {
        name: "Brand",
        component: Brand,
        path: match +"/brand",
        pos:6
    },
    {
        name: "Product Category",
        component: ProductCategory,
        path: match + "/productcategory",
        pos: 7
    },
    {
        name: "Change Password",
        component: ChangePassword,
        path: match + '/changepassword',
        pos: null,
    },
    {
        name: "Product",
        component: Product,
        path: match + "/product/:productCategoryId",
        pos:null
    },
    {
        name: "Publish News",
        component: News,
        path: match + '/publish',
        pos: 8
    },
    {
        name: "News Information",
        component: NewsInfo,
        path: match + '/news',
        pos: 9
    },
    {
        name: "News Edit",
        component: NewsEdit,
        path: match + '/newsedit/:newsTitleId',
        pos:null
    }
];

export const menu = [
    {
        name: "Home",
        component: Home,
        icon: "home",
        path: match +"/home",
        pos:0
    },
    {
        name: "Lottery Management",
        component: LotteryManagement,
        icon: "smile",
        path: match +"/lotterymanagement",
        pos:1
    },
    {
        name: "Web Management",
        icon: "global",
        key: "sub1",
        items: [
            {
                name: "Web Client",
                component: WebClient,
                icon: "contacts",
                path: match +"/webclient",
                pos:2
            },
            {
                name: "Staff Info",
                component: StaffInfo,
                icon: "team",
                path: match +"/staffinfo",
                pos:4
            },
            {
                name: "About",
                component: CompanyDescription,
                icon: "info",
                path: match +"/companydescription",
                pos:5
            },
            {
                name: "Brand",
                component: Brand,
                icon: "folder",
                path: match +"/brand",
                pos:6
            },
            {
                name: "Product",
                component: ProductCategory,
                icon: "shop",
                path: match + "/productcategory",
                pos: 7
            },
            {
                name: "Publish",
                component: News,
                icon: "form",
                path: match + '/publish',
                pos: 8
            },
            {
                name: "News Info",
                component: NewsInfo,
                icon: "bulb",
                path: match + '/news',
                pos: 9
            }
        ]
    },
    {
        name: "Local Management",
        icon: "calendar",
        key: "sub2",
        items:[
            {
                name: "Local Client",
                component: LocalClient,
                icon: "user",
                path: match +"/localclient",
                pos:3
            }
        ]
    }
];
