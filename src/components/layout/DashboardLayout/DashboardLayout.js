import React, {Component,Fragment} from 'react'
import classes from './DashboardLayout.css'
import new_pearl_logo from '../../../asserts/image/new_pearl_logo.png'
import { Layout, Menu, Icon } from 'antd';
import {
    withRouter
} from "react-router-dom";
import {connect} from 'react-redux'


const DashboardLayout = (props) =>{
    const ClickHandler = (s) =>{
        props.history.push(s)
    };

    const {Footer, Sider } = Layout;
    const {screens} = props.screens;
    return (
        <Fragment>
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

                    <Menu theme="dark" mode="inline" defaultOpenKeys={['sub1','sub2']} selectedKeys={[`${props.menuBarPos}`]}>
                        {props.screens.map((s,i)=>{
                            if (s.items){
                                return (
                                    <Menu.SubMenu key={s.key} title={<span>
                                        <Icon type={s.icon}/>
                                        <span>{s.name}</span>
                                    </span>}>
                                        {s.items.map(q=>{
                                            return (
                                                <Menu.Item key={q.pos.toString()} onClick={()=>{ClickHandler(q.path)}}>
                                                    <Icon type={q.icon} />
                                                    <span className="nav-text">{q.name}</span>
                                                </Menu.Item>
                                            )
                                        })}
                                    </Menu.SubMenu>
                                )
                            }else{
                                return (
                                    <Menu.Item key={s.pos.toString()} onClick={()=>{ClickHandler(s.path)}}>
                                        <Icon type={s.icon} />
                                        <span className="nav-text">{s.name}</span>
                                    </Menu.Item>
                                )
                            }
                        })}
                    </Menu>
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    {props.children}
                    <Footer style={{ textAlign: 'center' }}>Thriving Building Ltd ©{new Date().getFullYear()} Created by Oliver Deng</Footer>
                </Layout>
            </Layout>
        </Fragment>
    )
};



const mapStateToProps = state => {
    return {
        menuBarPos: state.menuBarReducer
    }
};

export default connect(mapStateToProps)(withRouter(DashboardLayout))
