import React,{Component} from 'react'
import Aux from "../../../hoc/Aux";
import { Layout,Row,Col,Avatar,Icon,Menu,Dropdown } from 'antd';
import classes from './DashboardBody.css'
import LogoutModal from "../LogoutModal/LogoutModal";

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
            <Aux>
                <Header style={{ background: '#fff'}} >
                    <Row>
                        <Col span={20}>
                            <h1>{this.props.title}</h1>
                        </Col>
                        <Col span={4}>
                            <Dropdown overlay={this.DropDownMenu} trigger={['click']}>
                                <div className={classes.user}>
                                    <Avatar icon="user" /> {localStorage.getItem("name")} <Icon type="down" />
                                </div>
                            </Dropdown>
                        </Col>
                    </Row>
                </Header>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div style={{ padding: 24, background: '#fff',minHeight:"82vh" }}>
                        {this.props.children}
                    </div>
                </Content>
                <LogoutModal hideModal={this.hideLogoutModal} confirm={this.LogoutHandler} visible={this.state.logoutModalVisible}/>
            </Aux>
        )
    }
}

export default DashboardBody
