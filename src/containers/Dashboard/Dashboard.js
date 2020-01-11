import React, {Component} from 'react'
import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import {
    Switch,
    Route,
    Redirect,
    withRouter
} from "react-router-dom";
import LotteryManagement from "./LotteryManagement/LotteryManagement";
import WebClient from "./WebClient/WebClient";
import ComponentWithParameter from "../../hoc/ComponentWithParameter";
import {connect} from 'react-redux'
import {SetPos} from "../../redux/actions/menuBarAction";
import DashboardRedirect from "./DashboardRedirect/DashboardRedirect";
import {TokenValidate} from '../../api/api'
import LocalClient from "./LocalClient/LocalClient";
import Home from "./Home/Home";


class Dashboard extends Component{
    state = {
        screens: [
            {
                name: "Home",
                component: Home,
                icon: "user",
                path: this.props.match.path +"/home",
                pos:0
            },
            {
                name: "Lottery Management",
                component: LotteryManagement,
                icon: "user",
                path: this.props.match.path +"/lotterymanagement",
                pos:1
            },
            {
                name: "Web Client",
                component: WebClient,
                icon: "user",
                path: this.props.match.path +"/webclient",
                pos:2
            },
            {
                name: "Local Client",
                component: LocalClient,
                icon: "user",
                path: this.props.match.path +"/localclient",
                pos:3
            }
        ]
    }
    componentDidMount = () => {
       TokenValidate().then(res=>{
           console.log("token 没过期")
       })
    };
    render(){
        return (
            <DashboardLayout screens={this.state.screens}>
                <Switch>
                    {this.state.screens.map((s,i)=>{
                        return (
                            <Route key={i.toString()} path={s.path} component={ComponentWithParameter(s.component,this.props.SetPos,s.pos,s.name)}/>
                        )
                    })}
                    <Route path={`${this.props.match.path}/`} component={DashboardRedirect}/>
                    <Redirect from={"*"} to={"/404"}/>
                </Switch>
            </DashboardLayout>
        )
    }
}

const mapStateToProps = state => {
    return {
        menuBarPos: state.menuBarReducer
    }
};

const mapDispatchToProps = dispatch => {
    return {
        SetPos: (value) =>{
            dispatch(SetPos(value))
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Dashboard))
