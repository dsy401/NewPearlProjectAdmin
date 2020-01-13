import Home from "../containers/Dashboard/Home/Home";
import LotteryManagement from "../containers/Dashboard/LotteryManagement/LotteryManagement";
import WebClient from "../containers/Dashboard/WebClient/WebClient";
import LocalClient from "../containers/Dashboard/LocalClient/LocalClient";
import StaffInfo from "../containers/Dashboard/StaffInfo/StaffInfo";

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
    }
];

export const menu = [
    {
        name: "Home",
        component: Home,
        icon: "user",
        path: match +"/home",
        pos:0
    },
    {
        name: "Lottery Management",
        component: LotteryManagement,
        icon: "user",
        path: match +"/lotterymanagement",
        pos:1
    },
    {
        name: "Web Management",
        icon: "user",
        key: "sub1",
        items: [
            {
                name: "Web Client",
                component: WebClient,
                icon: "user",
                path: match +"/webclient",
                pos:2
            },
            {
                name: "Staff Info",
                component: StaffInfo,
                icon: "user",
                path: match +"/staffinfo",
                pos:4
            }
        ]
    },
    {
        name: "Local Management",
        icon: "user",
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
