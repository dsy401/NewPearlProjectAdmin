import React, {Component} from 'react'
import {Form, Modal, Input, Descriptions, Icon, Spin,Button} from 'antd';
import {SearchMemberByPhoneNumber} from "../../../api/api";
import moment from "moment";
import MemberDescription from "../../common/MemberDescription/MemberDescription";


const MemberSearchModal = Form.create({name:"member_search_modal"})(
    class extends Component{

        state = {
            MemberData : null,
            isLoading: false
        };

        OnSearchHandler = (value) =>{
            this.setState({isLoading:true})
            SearchMemberByPhoneNumber(value).then(res=>{
                const s = res.data;
                this.setState({
                    MemberData:
                        {key: s._id.$oid,name: s.name,phone: s.phone,
                            email: s.email,
                            address: s.address,company: s.company,
                            point:s.point,end_date: moment(s.end_date.$date).format('L'),
                            member_level: s.member_level
                        }
                    ,
                    isLoading:false
                })
            }).catch(err=>{
                this.setState({isLoading:false})
                console.log(err)
            })
        };

        OnCloseHandler = () =>{
            this.props.OnSearchModalClose(()=>{
                this.setState({
                    MemberData : null,
                    isLoading: false
                })
            })
        };

        render(){
            return (
                <Modal
                    title='Search Member'
                    style={{top:30}}
                    visible={this.props.visible}
                    onCancel={this.OnCloseHandler}
                    footer={null}
                    maskClosable={false}
                    destroyOnClose={true}
                >
                    <Input.Search
                        placeholder="Enter your phone number"
                        enterButton="Search"
                        size="large"
                        onSearch={this.OnSearchHandler}
                    />


                    <div style={{marginTop: 20}}>
                        {this.state.MemberData?(
                            <div>
                                <MemberDescription
                                    title='Member Info'
                                    MemberData={this.state.MemberData}
                                    OnCloseHandler={this.OnCloseHandler}
                                />
                            </div>
                        ):
                            this.state.isLoading?(
                                <div style={{textAlign: 'center'}}>
                                    <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
                                </div>
                                )
                                :
                            <h1 style={{textAlign:'center'}}>No Result</h1>
                        }
                    </div>
                </Modal>
            )
        }
    }
);

export default MemberSearchModal
