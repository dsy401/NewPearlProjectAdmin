import React, {Component} from 'react'
import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import {
    Switch,
    Route,
    Redirect,
    withRouter
} from "react-router-dom";
import ComponentWithParameter from "../../hoc/ComponentWithParameter";
import {connect} from 'react-redux'
import {SetPos} from "../../redux/actions/menuBarAction";
import DashboardRedirect from "./DashboardRedirect/DashboardRedirect";
import {TokenValidate} from '../../api/api'
import {DashboardRoute,menu} from '../../Route/DashboardRoute'

class Dashboard extends Component{
    constructor(props) {
        super(props);
        TokenValidate().then(res=>{
            console.log("token 没过期")
        })
    }

    render(){
        return (
            <DashboardLayout screens={menu}>
                <Switch>
                    {DashboardRoute.map((s,i)=>{
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
