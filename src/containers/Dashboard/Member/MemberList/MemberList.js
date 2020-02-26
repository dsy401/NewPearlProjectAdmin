import { Table, Button } from 'antd';
import React, {Component} from 'react'
import {AddMember, DeleteMember, EditMember, GetMemberByPageNumber} from "../../../../api/api";
import moment from 'moment'
import MemberSearchModal from "../../../../components/UI/MemberSearchModal/MemberSearchModal";
import AddMemberModal from "../../../../components/UI/AddMemberModal/AddMemberModal";
import MemberActionModal from "../../../../components/UI/MemberActionModal/MemberActionModal";
import {MemberLevelConverter} from "../../../../utils/MemberLevelConverter";
import MemberEditModal from "../../../../components/UI/MemberEditModal/MemberEditModal";
import GeneralConfirmModal from "../../../../components/UI/GeneralConfirmModal/GeneralConfirmModal";


class MemberList extends Component {
    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: "Point",
            dataIndex: 'point'
        },
        {
          title: "Level",
          dataIndex: 'member_level',
        },
        {
            title: 'End Date',
            dataIndex: 'end_date'
        },
        {
            title: "Info",
            key: "info",
            render: (text,record)=>(
                <a onClick={
                    ()=>{
                        this.setState({
                            ActionModalMemberData: text
                        },()=>{
                            this.OpenMemberActionModal()
                        })
                    }
                }>View</a>
            )
        },
        {
            title: "Action",
            key: "action",
            render: (text,record)=>(
                <div>
                    <a onClick={()=>{
                        this.setState({
                            EditMemberData: text
                        },()=>{
                            this.EditModalOpen()
                        })
                    }} style={{marginRight:5}}>Edit</a>
                    <a onClick={()=>{
                        this.setState({
                            DeleteMemberModalVisible: true,
                            DeleteId: text.key
                        })
                    }}>Delete</a>
                </div>
            )
        }
    ];

    componentDidMount = () =>{
        this.GetData()
    };


    GetData = () =>{
        this.setState({loading:true})
        GetMemberByPageNumber(this.state.current_page_num).then(res=>{
            this.setState({
                data: res.data.data.map(s=>{
                    return {key: s._id.$oid,name: s.name,phone: s.phone,
                        email: s.email,
                        address: s.address,company: s.company,
                        point:s.point,end_date: moment(s.end_date.$date).format('L'),
                        member_level: MemberLevelConverter(s.member_level),total_consumption: s.total_consumption
                    }
                }),
                total: res.data.total,
                loading:false
            })
        }).catch(err=>{
            console.log(err);
            this.setState({
                loading:false
            })
        })
    };

    componentWillUnmount = () => {
        this.setState = (state)=>{
            return;
        }
    };

    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        current_page_num: 1,
        data: [],
        total: 1,
        searchModalVisible: false,
        AddMemberModalVisible: false,
        MemberActionModalVisible:false,
        ActionModalMemberData:null,
        EditMemberModalVisible: false,
        DeleteMemberModalVisible:false,
        DeleteId: "",
        EditMemberData: {
            key: "",
            name: "",
            phone: "",
            email: "",
            company: ""
        }
    };



    pageChange = (page,size) =>{
        this.setState({
            loading: true
        });
        GetMemberByPageNumber(page).then(res=>{
            this.setState({
                loading: false
            },()=>{
                this.setState({
                    data: res.data.data.map(s=>{
                        return {key: s._id.$oid,name: s.name,phone: s.phone,
                            address: s.address,company: s.company,
                            email: s.email,
                            point:s.point,end_date: moment(s.end_date.$date).format('L'),member_level: MemberLevelConverter(s.member_level),
                            total_consumption:s.total_consumption
                        }
                    }),
                    total: res.data.total,
                    current_page_num: page,
                    loading: false
                })
            })
        }).catch(err=>{
            this.setState({
                loading: false
            });
            alert("Server Error")
        })
    };

    SearchModalClose = (cb) =>{
        this.setState({
            searchModalVisible: false
        },()=>{
            cb();
            this.GetData()
        })
    };

    SearchModalOpen = ()=>{
        this.setState({
            searchModalVisible: true
        })
    };

    AddMemberModalClose = (cb)=>{
        this.setState({
            AddMemberModalVisible: false
        },()=>{
            cb()
        })
    };


    AddMemberModalOpen = () =>{
        this.setState({
            AddMemberModalVisible: true
        })
    };

    AddMemberHandler = (model) =>{
        this.setState({loading: true});
        AddMember(model).then(res=>{
            this.setState({
                loading: false,
                AddMemberModalVisible: false
            },()=>{
                this.GetData()
            })
        }).catch(err=>{
            this.setState({
                loading:false
            });
            alert(err.error_message)
        })
    };


    CloseMemberActionModal = ()=>{
        this.setState({
            MemberActionModalVisible:false
        },()=>{
            this.GetData()
        })
    };

    OpenMemberActionModal = () =>{
        this.setState({
            MemberActionModalVisible: true
        })
    };

    EditMemberModalClose = (cb) =>{
        this.setState({
            EditMemberModalVisible:false
        },()=>{
            cb()
        })
    };

    EditModalOpen = () =>{
        this.setState({
            EditMemberModalVisible: true
        })
    };

    EditMemberHandler = (id,model) =>{
        this.setState({loading: true});
        EditMember(id,model).then(res=>{
            this.setState({
                loading: false,
                EditMemberModalVisible: false
            },()=>{
                this.GetData()
            })
        }).catch(err=>{
            this.setState({
                loading:false
            });
            alert(err.error_message)
        })
    };

    DeleteConfirmHandler = () =>{
        this.setState({loading: true})
        DeleteMember(this.state.DeleteId).then(res=>{
            this.setState({
                loading:false,
                DeleteMemberModalVisible:false
            },()=>{
                this.GetData()
            })
        }).catch(err=>{
            this.setState({
                loading:false
            });
            console.log(err)
        })
    };


    render() {
        const { loading } = this.state;
        return (
            <div>
                <div style={{ marginBottom: 16 ,float:'left'}}>
                    <Button disabled={this.state.loading} onClick={this.AddMemberModalOpen} type='primary'>Add Member</Button>
                </div>
                <div style={{ marginBottom: 16 ,float:'right'}}>
                    <Button disabled={this.state.loading} type="primary" onClick={this.SearchModalOpen}>
                        Search
                    </Button>
                </div>
                <div style={{clear: 'both'}}/>
                <Table
                    columns={this.columns}
                    dataSource={this.state.data}
                    loading={this.state.loading}
                    pagination={{
                        defaultPageSize: 10,
                        onChange: this.pageChange,
                        total: this.state.total,
                        current: this.state.current_page_num
                    }}
                />
                <MemberSearchModal
                    visible={this.state.searchModalVisible}
                    OnSearchModalClose={this.SearchModalClose}
                />
                <AddMemberModal
                    visible={this.state.AddMemberModalVisible}
                    close={this.AddMemberModalClose}
                    onOk={this.AddMemberHandler}
                    loading={this.state.loading}
                />
                <MemberActionModal
                    visible={this.state.MemberActionModalVisible}
                    CloseMemberActionModal={this.CloseMemberActionModal}
                    MemberData={this.state.ActionModalMemberData}
                />
                <MemberEditModal
                    visible={this.state.EditMemberModalVisible}
                    close={this.EditMemberModalClose}
                    onOk={this.EditMemberHandler}
                    loading={this.state.loading}
                    initData={this.state.EditMemberData}
                />
                <GeneralConfirmModal
                    title='Delete Confirmation'
                    visible={this.state.DeleteMemberModalVisible}
                    confirm={this.DeleteConfirmHandler}
                    hideModal={()=>{this.setState({DeleteMemberModalVisible:false})}}
                    isLoading={this.state.loading}
                    text='Are you sure to delete this member?'
                />
            </div>
        );
    }
}


export default MemberList
