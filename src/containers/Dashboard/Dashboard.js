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

class Dashboard extends Component{
    state = {
        screens: [
            {
                name: "Lottery Management",
                component: LotteryManagement,
                icon: "user",
                path: this.props.match.path +"/lotterymanagement",
                pos:0
            },
            {
                name: "Web Client",
                component: WebClient,
                icon: "user",
                path: this.props.match.path +"/webclient",
                pos:1
            }
        ]
    }
    componentDidMount = () => {
        this.props.history.push('/dashboard/lotterymanagement')
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
