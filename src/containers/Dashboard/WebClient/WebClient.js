import React,{Component} from 'react'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import {Button, Popconfirm, Table} from 'antd';
import {GetWebClient,DeleteWebClient} from '../../../api/api'
import {Decoder} from "../../../utils/ObjectIdDecoder";
import moment from 'moment'

class WebClient extends Component{


    DeleteHandler = (row) =>{
        DeleteWebClient(row._id.$oid).then(res=>{
            this.setState({
                clients: res.data.map((s,i)=>{
                    s.key = i.toString()
                    return s
                })
            })
        }).catch(err=>{
            console.log(err)
        })
    };



    columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: "Date", dataIndex: 'date', key: 'date'},
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (row) => (
                <Popconfirm title="Sure to Delete?" onConfirm={() =>this.DeleteHandler(row)}>
                    <a>
                        Delete
                    </a>
                </Popconfirm>
            ),
        },
    ];

    state={
        clients: [],
        isLoading: false
    };

    componentDidMount = () =>{
        this.FetchClients()
    }

    FetchClients = () =>{
        this.setState({
            isLoading:true
        },()=>{
            GetWebClient().then(res=>{
                this.setState({
                    clients: res.data.map((s,i)=>{
                        s.key = i.toString()
                        s.date = moment(Decoder(s._id.$oid)).format('MMMM Do YYYY, h:mm:ss a')
                        return s
                    }),
                    isLoading: false
                })
            }).catch(err=>{
                console.log(err);
                this.setState({
                    isLoading: false
                })
            })
        })
    };

    render(){
        return (

            <DashboardBody title={this.props.name}>
                <div>
                    <Button loading={this.state.isLoading} onClick={this.FetchClients} type="primary" style={{ marginBottom: 16 }}>
                        Refresh
                    </Button>
                    <Table
                        columns={this.columns}
                        expandedRowRender={record => <p style={{ margin: 0 }}>{record.message}</p>}
                        dataSource={this.state.clients}
                    />
                </div>
            </DashboardBody>
        )
    }
}

export default WebClient




