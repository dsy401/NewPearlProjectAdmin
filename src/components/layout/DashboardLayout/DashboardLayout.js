import React, {Component} from 'react'
import classes from './DashboardLayout.css'
import new_pearl_logo from '../../../asserts/image/new_pearl_logo.png'
import { Layout, Menu, Icon } from 'antd';
import {
    withRouter
} from "react-router-dom";
import {connect} from 'react-redux'
import Aux from "../../../hoc/Aux";
import LogoutModal from "../../common/LogoutModal/LogoutModal";

class DashboardLayout extends Component{


    state = {

        logoutModalVisible: false
    }


    ClickHandler = (s) =>{
        this.props.history.push(s)
    }

    LogoutHandler = () =>{
        localStorage.removeItem("token")
        window.location = "/login"
    };

    openLogoutModal = () =>{
        this.setState({
            logoutModalVisible: true
        })
    }

    hideLogoutModal = () =>{
        this.setState({
            logoutModalVisible: false
        })
    }



    render(){
        const {Footer, Sider } = Layout;
        return (
            <Aux>
                <Layout>
                    <Sider
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                        }}
                    >
                        <div className={classes.logo}>
                            <img style={{width:"90%",height:"90%"}} src={new_pearl_logo} alt=""/>
                        </div>
                        {/*这里问题*/}
                        <Menu theme="dark" mode="inline" selectedKeys={[`${this.props.menuBarPos}`]}>
                            {this.props.screens.map((s,i)=>{
                                return (
                                    <Menu.Item key={i.toString()} onClick={()=>{this.ClickHandler(s.path)}}>
                                        <Icon type={s.icon} />
                                        <span className="nav-text">{s.name}</span>
                                    </Menu.Item>
                                )
                            })}

                            <Menu.Item style={{marginTop:"100px"}} key="log_out" onClick={this.openLogoutModal}>
                                <Icon type="logout"/>
                                <span className="nav-text">Log out</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ marginLeft: 200 }}>
                        {this.props.children}
                        <Footer style={{ textAlign: 'center' }}>Thriving Building Ltd ©{new Date().getFullYear()} Created by Oliver Deng</Footer>
                    </Layout>
                </Layout>
                <LogoutModal openModal={this.openLogoutModal} hideModal={this.hideLogoutModal} confirm={this.LogoutHandler} visible={this.state.logoutModalVisible}/>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        menuBarPos: state.menuBarReducer
    }
};

export default connect(mapStateToProps)(withRouter(DashboardLayout))
