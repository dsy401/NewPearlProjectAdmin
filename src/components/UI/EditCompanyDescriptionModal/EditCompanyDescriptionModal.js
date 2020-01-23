import React,{Component} from 'react'
import {Modal,Form,Input,Upload,Icon,Button} from 'antd'
import {UploadImage} from '../../../api/api'

const EditCompanyDescriptionModal = Form.create({name:"edit_company_description"})(
    class extends Component{

        state={
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
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err){
                    const fdata = new FormData()
                    Object.keys(values).forEach(key=>{
                        if (key==="image"){
                        }else{
                            fdata.append(key,values[key])
                        }
                    })

                    if (values.image.length !== 0){
                        if (values.image[0].response.is_success){
                            fdata.append("image",values.image[0].response.data)
                        }else{
                            fdata.append("image",this.props.values.image)
                        }
                    }else{
                        fdata.append("image",this.props.values.image)
                    }

                    this.props.confirm(this.props.values.id,fdata,()=>{
                        this.props.form.resetFields()
                    })

                    this.setState({
                        imageFileList:[]
                    })
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
                    title={`Add About`}
                    okText="Add"
                    onCancel={()=>{
                        this.props.hideModal()
                        this.setState({
                            imageFileList:[]
                        })
                    }}
                    destroyOnClose={true}
                    onOk={this.HandlerSubmit}
                    confirmLoading={this.props.isLoading}
                >
                    <Form layout="vertical">
                        <Form.Item label="timeline">
                            {getFieldDecorator('timeline', {
                                rules: [{ required: true, message: 'Please enter the timeline!' }],
                                initialValue: this.props.values.timeline
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item  label="时间线">
                            {getFieldDecorator('timeline_cn',{
                                rules: [{ required: true, message: 'Please enter the 时间线!' }],
                                initialValue: this.props.values.timeline_cn
                            })(<Input type="textarea" />)}
                        </Form.Item>
                        <Form.Item label="description">
                            {getFieldDecorator('description',{
                                rules: [{ required: true, message: 'Please enter the description!' }],
                                initialValue: this.props.values.description
                            })(<Input.TextArea rows={4} />)}
                        </Form.Item>
                        <Form.Item label="描述">
                            {getFieldDecorator('description_cn',{
                                rules: [{ required: true, message: 'Please enter the chinese description!' }],
                                initialValue: this.props.values.description_cn
                            })(<Input.TextArea rows={4}/>)}
                        </Form.Item>
                        <Form.Item label="subheading">
                            {getFieldDecorator('subheading',{
                                rules: [{ required: true, message: 'Please enter the chinese subheading!' }],
                                initialValue: this.props.values.subheading
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="子标题">
                            {getFieldDecorator('subheading_cn',{
                                rules: [{ required: true, message: 'Please enter the chinese 子标题!' }],
                                initialValue: this.props.values.subheading_cn
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="image">
                            {getFieldDecorator('image', {
                                valuePropName: 'image',
                                getValueFromEvent: this.imageFile,
                                initialValue:[]
                            })(
                                <Upload action={UploadImage} name="image" listType="picture">
                                    {this.state.imageFileList.length===0?(<Button>
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


export default EditCompanyDescriptionModal



