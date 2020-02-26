import React,{Component} from 'react'
import {Modal,Form,Input,Upload,Icon,Button} from 'antd'

const MemberEditModal = Form.create({name:"add_member_modal"})(
    class extends Component{

        HandlerSubmit = (e)=>{
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err){
                    const fdata = new FormData();
                    Object.keys(values).forEach(key=>{
                        fdata.append(key,values[key])
                    });
                    this.props.onOk(this.props.initData.key,fdata)

                }
            })
        };


        render(){
            const { form,initData } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    style={{top:10}}
                    visible={this.props.visible}
                    title={`Edit Member`}
                    okText="Edit"
                    onCancel={()=>{this.props.close(()=>{})}}
                    onOk={this.HandlerSubmit}
                    confirmLoading={this.props.loading}
                    destroyOnClose={true}
                >
                    <Form layout="vertical">
                        <Form.Item label="Name">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please enter the name!' }],
                                initialValue: initData.name
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item  label="Phone Number">
                            {getFieldDecorator('phone',{
                                rules: [{ required: true, message: 'Please enter the phone number!' }],
                                initialValue: initData.phone
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Address">
                            {getFieldDecorator('address',{
                                initialValue: initData.address
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Email">
                            {getFieldDecorator('email',{
                                rules: [{ required: true, message: 'Please enter the email!' }],
                                initialValue: initData.email
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="Company">
                            {getFieldDecorator('company',{
                                initialValue: initData.company
                            })(<Input />)}
                        </Form.Item>
                    </Form>
                </Modal>
            )
        }
    }
);


export default MemberEditModal



