import React,{Component,Fragment} from 'react'
import { Layout,Row,Col,Avatar,Icon,Menu,Dropdown } from 'antd';
import classes from './DashboardBody.css'
import LogoutModal from "../../UI/LogoutModal/LogoutModal";

const { Header, Content } = Layout;


class DashboardBody extends Component{
    state = {
        logoutModalVisible: false
    }

    openLogoutModal = () =>{
        this.setState({
            logoutModalVisible: true
        })
    }

    DropDownMenu = (
        <Menu>
            <Menu.Item key="0">
                <a>Setting</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3" onClick={this.openLogoutModal}>Log Out</Menu.Item>
        </Menu>
    )

    hideLogoutModal = () =>{
        this.setState({
            logoutModalVisible: false
        })
    }

    LogoutHandler = () =>{
        localStorage.removeItem("token")
        localStorage.removeItem('name')
        window.location = "/login"
    };

    render(){
        return (
            <Fragment>
                <Header style={{ background: '#fff'}} >
                            <h1 style={{float:"left",display:"inline-block"}}>{this.props.title}</h1>
                            <div style={{float:"right",display:"inline-block"}}>
                                <Dropdown overlay={this.DropDownMenu} trigger={['click']}>
                                    <div className={classes.user}>
                                        <Avatar icon="user" /> {localStorage.getItem("name")} <Icon type="down" />
                                    </div>
                                </Dropdown>
                            </div>

                </Header>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div style={{ padding: 24, background: '#fff',minHeight:"82vh" }}>
                        {this.props.children}
                    </div>
                </Content>
                <LogoutModal hideModal={this.hideLogoutModal} confirm={this.LogoutHandler} visible={this.state.logoutModalVisible}/>
            </Fragment>
        )
    }
}

export default DashboardBody
