import React,{Component} from 'react'
import {Modal,Form,Input,Upload,Icon,Button} from 'antd'
import {UploadImage} from '../../../api/api'

const StaffAddModal = Form.create({name:"staff_add_modal"})(
    class extends Component{


        state={
            imageFileList:[],
            wechatFileList:[]
        };

        imageFile = e => {
            this.setState({
                imageFileList: e.fileList
            });
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        };


        wechatFile = e =>{
            this.setState({
                wechatFileList: e.fileList
            });
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        };



        HandlerSubmit = (e)=>{
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err){
                    let fdata = new FormData()
                    fdata.append('name',values.name)
                    fdata.append('role',values.role)
                    fdata.append('role_cn',values.role_cn)
                    fdata.append('facebook',values.facebook)
                    fdata.append('linkedin',values.linkedin)
                    if (values.wechat.length !== 0){
                        if (values.wechat[0].response.is_success){
                            fdata.append("wechat",values.wechat[0].response.data)
                        }
                    }else{
                        fdata.append("wechat","")
                    }

                    if (values.image.length !== 0){
                        if (values.image[0].response.is_success){
                            fdata.append("image",values.image[0].response.data)
                        }
                    }else{
                        fdata.append("image","")
                    }

                    this.props.AddStaff(fdata,()=>{
                        this.props.form.resetFields()
                        this.props.hideModal()
                    })

                    this.setState({
                        imageFileList:[],
                        wechatFileList:[]
                    })
                }
            })
        };


        render(){
            const { form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={this.props.visible}
                    title={`Add Staff`}
                    okText="Add"
                    style={{top:30}}
                    onCancel={()=>{
                        this.props.hideModal()
                        this.setState({
                            imageFileList:[],
                            wechatFileList:[]
                        })
                    }}
                    destroyOnClose={true}
                    onOk={this.HandlerSubmit}
                    confirmLoading={this.props.isLoading}
                >
                    <Form layout="vertical">
                        <Form.Item label="name">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please enter the name!' }],
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="role">
                            {getFieldDecorator('role', {
                                rules: [{ required: true, message: 'Please enter the role!' }],
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item  label="职位">
                            {getFieldDecorator('role_cn',{
                                rules: [{ required: true, message: 'Please enter the 职位!' }],
                            })(<Input type="textarea" />)}
                        </Form.Item>
                        <Form.Item label="facebook">
                            {getFieldDecorator('facebook',{
                                rules: [{ required: true, message: 'Please enter the facebook!' }],
                            })(<Input  />)}
                        </Form.Item>
                        <Form.Item label="linkedin">
                            {getFieldDecorator('linkedin',{
                                rules: [{ required: true, message: 'Please enter the linkedin!' }],
                            })(<Input  />)}
                        </Form.Item>
                        <Form.Item label="image">
                            {getFieldDecorator('image', {
                                valuePropName: 'image',
                                getValueFromEvent: this.imageFile,
                                initialValue: [],
                                rules: [{ required: true, message: 'Please upload the image!' }],
                            })(
                                <Upload action={UploadImage} name="image" listType="picture">
                                    {this.state.imageFileList.length===0?(<Button>
                                        <Icon type="upload" /> Click to upload
                                    </Button>):null}
                                </Upload>
                            )}
                        </Form.Item>
                        <Form.Item label="wechat">
                            {getFieldDecorator('wechat', {
                                valuePropName: 'wechat',
                                getValueFromEvent: this.wechatFile,
                                initialValue: [],
                                rules: [{ required: true, message: 'Please upload the wechat QR code image!' }],
                            })(
                                <Upload action={UploadImage} name="image" listType="picture">
                                    {this.state.wechatFileList.length===0?(<Button>
                                        <Icon type="upload" /> Click to upload
                                    </Button>):null}
                                </Upload>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            )
        }
    }
);


export default StaffAddModal


