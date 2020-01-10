import React from 'react'
import Aux from "../../../hoc/Aux";
import { Layout,Typography } from 'antd';

const { Header, Content } = Layout;
const DashboardBody = (props) =>{
    return (
        <Aux>
            <Header style={{ background: '#fff', paddingTop: "23px",minHeight:"10vh"}} >
                <Typography.Title level={3} style={{textAlign:"center"}}>{props.title}</Typography.Title>
            </Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div style={{ padding: 24, background: '#fff',minHeight:"80vh" }}>
                    {props.children}
                </div>
            </Content>
        </Aux>
    )
}

export default DashboardBody
