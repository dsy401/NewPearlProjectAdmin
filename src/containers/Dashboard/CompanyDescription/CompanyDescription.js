import React, {Component} from 'react'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import {Button, List, Spin} from "antd";
import {GetAbout, AddAbout, DeleteAbout, UpdateAbout} from "../../../api/api";
import AddCompanyDescription from "../../../components/UI/AddCompanyDescriptionModal/AddCompanyDescriptionModal";
import GeneralConfirmModal from "../../../components/UI/GeneralConfirmModal/GeneralConfirmModal";
import EditCompanyDescriptionModal
    from "../../../components/UI/EditCompanyDescriptionModal/EditCompanyDescriptionModal";

class CompanyDescription extends Component{


    state = {
        isLoading:false,
        data: [],
        AddModalVisible:false,
        DeleteModalVisible: false,
        EditModalVisible:false,
        DeleteId: "",
        passToModal: {
            id:"",
            timeline:"",
            timeline_cn:"",
            image: "",
            description: "",
            description_cn:"",
            subheading: "",
            subheading_cn:"",
        }
    };

    componentWillUnmount = () =>{
        this.setState = state=>{
            return;
        }
    };

    componentDidMount = () =>{
        this.setState({
            isLoading:true
        });
        GetAbout().then(res=>{
            this.setState({
                isLoading:false,
                data:res.data
            })
        }).catch(err=>{
            console.log(err)
            this.setState({
                isLoading:false
            })
        })
    };

    OpenAddModal = () =>{
        this.setState({
            AddModalVisible: true
        })
    };

    hideAddModal = () =>{
        this.setState({
            AddModalVisible: false
        })
    }

    AddAboutHandler = (data)=>{
        this.setState({isLoading:true})
        AddAbout(data).then(res=>{
            this.setState({
                isLoading:false,
                data:res.data,
                AddModalVisible:false
            })
        }).catch(err=>{
            console.log(err)
            this.setState({isLoading:false})
        })
    }

    DeleteAboutHandler =() =>{
        this.setState({isLoading: true})
        DeleteAbout(this.state.DeleteId).then(res=>{
            this.setState({
                isLoading:false,
                data:res.data,
                DeleteModalVisible: false,
                DeleteId: ""
            })
        }).catch(err=>{
            console.log(err)
            this.setState({
                isLoading:false
            })
        })
    }

    hideDeleteModal = () =>{
        this.setState({
            DeleteModalVisible: false
        })
    };

    OpenDeleteModal = (id) =>{
        this.setState({
            DeleteModalVisible:true,
            DeleteId: id
        })
    };

    hideEditModal = () =>{
        this.setState({
            EditModalVisible: false
        })
    }

    OpenEditModal = (obj) =>{
        this.setState({
            EditModalVisible: true,
        },()=>{
            this.setState({
                passToModal: {
                    id:obj._id.$oid,
                    timeline:obj.timeline,
                    timeline_cn:obj.timeline_cn,
                    image: obj.image,
                    description: obj.description,
                    description_cn:obj.description_cn,
                    subheading: obj.subheading,
                    subheading_cn:obj.subheading_cn,
                }
            })
        })
    }

    EditHandler = (id,data,cb) =>{
        this.setState({isLoading:true})
        UpdateAbout(id,data).then(res=>{
            this.setState({
                isLoading:false,
                EditModalVisible:false,
                data:res.data,
                passToModal: {
                    id:"",
                    timeline:"",
                    timeline_cn:"",
                    image: "",
                    description: "",
                    description_cn:"",
                    subheading: "",
                    subheading_cn:"",
                }
            },()=>{
                cb()
            })
        }).catch(err=>{
            console.log(err)
            this.setState({isLoading:false})
        })
    }


    render(){
        return (
            <React.Fragment>
                <DashboardBody title={this.props.name}>
                    <Spin style={{top:250}} tip="Loading..." spinning={this.state.isLoading}>
                        <Button onClick={this.OpenAddModal} type="primary">
                            Add more description
                        </Button>
                        <List
                            itemLayout="vertical"
                            size="large"
                            dataSource={this.state.data}
                            renderItem={item=>(
                                <List.Item
                                    actions={[<a onClick={()=>{this.OpenEditModal(item)}} key="list-loadmore-edit">edit</a>, <a onClick={()=>{this.OpenDeleteModal(item._id.$oid)}} key="list-loadmore-more">delete</a>]}
                                    extra={<img alt="" width={272} src={item.image}/>}
                                >
                                    <List.Item.Meta
                                        title={item.subheading}
                                        description={item.timeline}
                                    />
                                    {item.description}
                                </List.Item>
                            )}
                        />
                    </Spin>
                </DashboardBody>
                <AddCompanyDescription
                    hideModal={this.hideAddModal}
                    visible={this.state.AddModalVisible}
                    isLoading={this.state.isLoading}
                    confirm={this.AddAboutHandler}
                />
                <GeneralConfirmModal
                    title="Delete Confirmation"
                    visible={this.state.DeleteModalVisible}
                    confirm={this.DeleteAboutHandler}
                    hideModal={this.hideDeleteModal}
                    isLoading={this.state.isLoading}
                    text="Are you sure to delete it?"
                />
                <EditCompanyDescriptionModal
                    hideModal={this.hideEditModal}
                    visible={this.state.EditModalVisible}
                    isLoading={this.state.isLoading}
                    values={this.state.passToModal}
                    confirm={this.EditHandler}
                />
            </React.Fragment>
        )
    }
}

export default CompanyDescription
