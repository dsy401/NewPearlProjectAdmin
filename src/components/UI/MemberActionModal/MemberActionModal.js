import React, {Component} from 'react'
import {Form, Modal, Input, Descriptions, Icon, Spin,Button} from 'antd';
import MemberDescription from "../../common/MemberDescription/MemberDescription";


const MemberActionModal = Form.create({name:"member_action_modal"})(
    class extends Component{

        state = {
            isLoading: false
        };


        OnCloseHandler = () =>{
            this.props.CloseMemberActionModal()
        };

        render(){
            return (
                <Modal
                    title='View Member'
                    style={{top:30}}
                    visible={this.props.visible}
                    onCancel={this.OnCloseHandler}
                    footer={null}
                    maskClosable={false}
                    destroyOnClose={true}
                >

                    <div style={{marginTop: 20}}>
                        <div>
                            <MemberDescription
                                title='Member Info'
                                MemberData={this.props.MemberData}
                                OnCloseHandler={this.OnCloseHandler}
                            />
                        </div>

                    </div>
                </Modal>
            )
        }
    }
);

export default MemberActionModal
