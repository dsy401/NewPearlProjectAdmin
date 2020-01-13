import React, {Component} from 'react'
import {GetStaff} from '../../../api/api'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import {Descriptions,Spin} from 'antd'
import classes from './StaffInfo.css'
import Aux from "../../../hoc/Aux";
import StaffEditModal from "../../../components/UI/StaffEditModal/StaffEditModal";
import {connect} from 'react-redux'
class StaffInfo extends Component{
    state={
        data:[],
        modalVisible: false,
        propsToModal: {
            name: "",
            role: "",
            role_cn:"",
            facebook:"",
            linkedin: "",
            id:""
        },
        isLoading:false
    };

    componentDidMount = () =>{
        this.FetchStaff()
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.StaffInfoData !== this.props.StaffInfoData){
            this.setState({
                data: nextProps.StaffInfoData
            })
        }
    }

    FetchStaff = () =>{
        this.setState({isLoading: true})
        GetStaff().then(res=>{
            this.setState({isLoading: false},()=>{
                this.setState({
                    data: res.data
                })
            })
        }).catch(err=>{
            this.setState({isLoading: false})
            console.log(err)
        })
    }

    openModal = (obj) =>{
        this.setState({
            propsToModal: {
                name: obj.name,
                role: obj.role,
                role_cn:obj.role_cn,
                facebook: obj.face,
                linkedin: obj.linkedin,
                id: obj._id.$oid
            }
        },()=>{
            console.log(this.state.propsToModal)
            this.setState({
                modalVisible: true
            })
        })
    };

    hideModal = () =>{
            this.setState({
                modalVisible: false
            })
    }


    render(){
        return (
            <Aux>
                <DashboardBody title={this.props.name}>
                    <Spin style={{top:250}} tip="Loading..." spinning={this.state.isLoading}>
                        <div>
                            {this.state.data.map((s,i)=>{
                                return (
                                    <div key={i.toString()} className={classes.card}>
                                        <Descriptions  style={{paddingBottom:"10px",margin:10}} title={s.name} size='default'>
                                            <Descriptions.Item label="Role">{s.role}</Descriptions.Item>
                                            <Descriptions.Item label="职位">{s.role_cn}</Descriptions.Item>
                                            <Descriptions.Item label=""><div className={classes.edit} onClick={()=>{this.openModal(s)}}>Edit</div></Descriptions.Item>
                                        </Descriptions>
                                    </div>
                                )
                            })}
                        </div>
                    </Spin>
                </DashboardBody>
                {/*有问题*/}
                <StaffEditModal visible={this.state.modalVisible} hideModal={this.hideModal} values={this.state.propsToModal}/>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        StaffInfoData: state.StaffInfoReducer
    }
};



export default connect(mapStateToProps)(StaffInfo)
