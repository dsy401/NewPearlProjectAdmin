import React,{Component} from 'react'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import {Button, Popconfirm, Table} from 'antd';
import {GetWebClient,DeleteWebClient} from '../../../api/api'
import {Decoder} from "../../../utils/ObjectIdDecoder";
import moment from 'moment'

class Home extends Component{
    render(){
        return (
            <DashboardBody title={this.props.name}>
                <div>

                </div>
            </DashboardBody>
        )
    }

}
export default Home
