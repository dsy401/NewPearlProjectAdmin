import React, {Component,Fragment} from 'react'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import {Card, Row, Col, Spin} from 'antd'
import classes from './Brand.css'
import {GetBrands} from '../../../api/api'
import BrandAddModal from "../../../components/UI/BrandAddModal/BrandAddModal";
import {connect} from 'react-redux'
import config from '../../../config'

class Brand extends Component{

    state = {
        data: [],
        isLoading: false,
        AddModalVisible: false
    };

    componentDidMount = () =>{
        this.FetchBrands()
    };

    UNSAFE_componentWillReceiveProps = (nextProps) =>{
        if (this.props.BrandData !== nextProps.BrandData){
            this.setState({
                data: nextProps.BrandData
            })
        }
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

    render(){
        return (
            <Fragment>
                <DashboardBody title={this.props.name}>
                    <Spin style={{top:250}} tip="Loading..." spinning={this.state.isLoading}>
                        <Row gutter={[0,20]}>
                            {this.state.data.map(s=>{
                                return (
                                    <Col span={8}>
                                        <Card
                                            title={s.name}  style={{ width: 300 }} extra={<a>Edit</a>}>
                                            <img style={{width:"100%",height:"150px"}} alt="" src={`${config.Host}${s.image}`}/>
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
                <BrandAddModal visible={this.state.AddModalVisible} hideModal={this.hideAddModal}/>
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
