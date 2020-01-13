import React,{Component} from 'react'
import {Modal,Form,Input,Upload,Icon,Button} from 'antd'



const BrandAddModal = Form.create({name:"brand_add_modal"})(
    class extends Component{

        state={
            isLoading:false,
            imageFileList:[]
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



        HandlerSubmit = (e)=>{
            e.preventDefault()
            this.props.form.validateFields((err, values) => {
                if (!err){
                    console.log(values)
                }
            })
        };


        render(){
            const { form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={this.props.visible}
                    title={`Add brands`}
                    okText="Add"
                    onCancel={this.props.hideModal}
                    onOk={this.HandlerSubmit}
                    confirmLoading={this.state.isLoading}
                >
                    <Form layout="vertical">
                        <Form.Item label="name">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please enter the name!' }],
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item  label="名字">
                            {getFieldDecorator('name_cn',{
                                rules: [{ required: true, message: 'Please enter the chinese name!' }],
                            })(<Input type="textarea" />)}
                        </Form.Item>
                        <Form.Item label="description">
                            {getFieldDecorator('description',{
                                rules: [{ required: true, message: 'Please enter the description!' }],
                            })(<Input  />)}
                        </Form.Item>
                        <Form.Item label="描述">
                            {getFieldDecorator('description_cn',{
                                rules: [{ required: true, message: 'Please enter the chinese description!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="image">
                            {getFieldDecorator('image', {
                                valuePropName: 'image',
                                getValueFromEvent: this.imageFile,
                            })(
                                <Upload name="image" listType="picture">
                                    {this.state.imageFileList.length===0?(<Button>
                                        <Icon type="upload" /> Click to upload
                                    </Button>):null}
                                </Upload>,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            )
        }
    }
);

export default BrandAddModal



