import React,{Component} from 'react'
import {Modal,Form,Input,Upload,Icon,Button} from 'antd'
import {UploadImage} from '../../../api/api'

const AddMemberModal = Form.create({name:"add_member_modal"})(
    class extends Component{

        state={
            imageFileList:[]
        };




        HandlerSubmit = (e)=>{
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err){
                    const fdata = new FormData();
                    Object.keys(values).forEach(key=>{
                        fdata.append(key,values[key])
                    });
                    this.props.onOk(fdata)

                }
            })
        };


        render(){
            const { form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    style={{top:10}}
                    visible={this.props.visible}
                    title={`Add Member`}
                    okText="Add"
                    onCancel={()=>{this.props.close(()=>{})}}
                    onOk={this.HandlerSubmit}
                    confirmLoading={this.props.loading}
                    destroyOnClose={true}
                >
                    <Form layout="vertical">
                        <Form.Item label="Name">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please enter the name!' }],
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item  label="Phone Number">
                            {getFieldDecorator('phone',{
                                rules: [{ required: true, message: 'Please enter the phone number!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Address">
                            {getFieldDecorator('address',{
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Email">
                            {getFieldDecorator('email',{
                                rules: [{ required: true, message: 'Please enter the email!' }],
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="Company">
                            {getFieldDecorator('company',{
                            })(<Input />)}
                        </Form.Item>
                    </Form>
                </Modal>
            )
        }
    }
);


export default AddMemberModal



