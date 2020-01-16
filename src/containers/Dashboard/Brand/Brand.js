import React, {Component,Fragment} from 'react'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import {Card, Row, Col, Spin} from 'antd'
import classes from './Brand.css'
import {GetBrands,DeleteBrand,UpdateBrand} from '../../../api/api'
import BrandAddModal from "../../../components/UI/BrandAddModal/BrandAddModal";
import {connect} from 'react-redux'
import BrandDeleteModal from "../../../components/UI/BrandDeleteModal/BrandDeleteModal";
import BrandEditModal from "../../../components/UI/BrandEditModal/BrandEditModal";


class Brand extends Component{

    state = {
        data: [],
        isLoading: false,
        AddModalVisible: false,
        DeleteConfirmModalVisible: false,
        EditModalVisible: false,
        currentBrandId: "",
        propsToModal: {
            id: "",
            name: "",
            name_cn:"",
            description:"",
            description_cn:"",
            image:""
        }
    };

    componentDidMount = () =>{
        this.FetchBrands()
    };

    UpdateBrandHandler = (id,data) =>{
        this.setState({isLoading: true})
        UpdateBrand(id,data).then(res=>{
            this.setState({isLoading:false},()=>{
                this.setState({
                    data: res.data,
                    EditModalVisible: false
                })
            })
        }).catch(err=>{
            this.setState({isLoading:false})
            console.log(err)
        })
    };

    ConfirmDeleteBrandHandler = (id) =>{
        this.setState({isLoading:true})
        DeleteBrand(id).then(res=>{
            this.setState({isLoading:false},()=>{
                this.setState({data: res.data,DeleteConfirmModalVisible:false})
            })
        }).catch(err=>{
            console.log(err)
            this.setState({isLoading:false})
        })
    };

    UNSAFE_componentWillReceiveProps = (nextProps) =>{
        if (this.props.BrandData !== nextProps.BrandData){
            this.setState({
                data: nextProps.BrandData
            })
        }
    };

    hideDeleteConfirmModal = () =>{
        this.setState({
            DeleteConfirmModalVisible: false
        })
    }

    OpenAddModal = () =>{
        this.setState({
            AddModalVisible: true
        })
    };

    hideAddModal = () =>{
        this.setState({
            AddModalVisible: false
        })
    };

    hideEditModal = () =>{
        this.setState({
            EditModalVisible: false
        })
    };

    openEditModal = (obj) =>{
        this.setState({
            propsToModal: {
                id: obj._id.$oid,
                name: obj.name,
                name_cn: obj.name_cn,
                description: obj.description,
                description_cn: obj.description_cn,
                image: obj.image
            }
        },()=>{
            this.setState({EditModalVisible:true})
        })
    }



    FetchBrands = () =>{
        this.setState({isLoading:true})
        GetBrands().then(res=>{
            this.setState({isLoading:false})
            this.setState({
                data:res.data
            })
        }).catch(err=>{
            this.setState({isLoading:false})
            console.log(err)
        })
    }


    componentWillUnmount = ()=> {
        this.setState = (state) =>{
            return;
        }
    }


    OpenDeleteConfirmModal = (id) =>{
        this.setState({currentBrandId:id},()=>{
            this.setState({DeleteConfirmModalVisible: true})
        })
    };

    render(){
        return (
            <Fragment>
                <DashboardBody title={this.props.name}>
                    <Spin style={{top:170}} tip="Loading..." spinning={this.state.isLoading}>
                        <Row gutter={[0,20]}>
                            {this.state.data.map((s,i)=>{
                                return (
                                    <Col key={i.toString()} span={8}>
                                        <Card
                                            title={s.name}  style={{ width: 300 }} extra={
                                            <div>
                                                <a onClick={()=>{this.openEditModal(s)}}>Edit</a>
                                                <a onClick={()=>{this.OpenDeleteConfirmModal(s._id.$oid)}} style={{marginLeft:10}}>Delete</a>
                                            </div>
                                        }>
                                            <img style={{width:"100%",height:"150px"}} alt="" src={`${s.image}`}/>
                                        </Card>
                                    </Col>

                                )
                            })}
                            <Col span={8}>
                                <div onClick={this.OpenAddModal} style={{opacity:this.state.isLoading?"0":"1"}} className={classes.add}/>
                            </Col>
                        </Row>
                    </Spin>
                </DashboardBody>
                <BrandEditModal visible={this.state.EditModalVisible} hideModal={this.hideEditModal} updataBrand={this.UpdateBrandHandler} isLoading={this.state.isLoading} values={this.state.propsToModal} />
                <BrandAddModal visible={this.state.AddModalVisible} hideModal={this.hideAddModal}/>
                <BrandDeleteModal visible={this.state.DeleteConfirmModalVisible} isLoading={this.state.isLoading} id={this.state.currentBrandId} hideModal={this.hideDeleteConfirmModal} confirm={this.ConfirmDeleteBrandHandler}/>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        BrandData: state.BrandReducer
    }
};


export default connect(mapStateToProps)(Brand)
