import React,{Component} from 'react'
import {Modal,Form,Input,Upload,Icon,Button} from 'antd'
import {UpdateStaff, UploadImage} from '../../../api/api'
import {SetData} from "../../../redux/actions/StaffInfoAction";
import {connect} from 'react-redux'
const StaffEditModal = Form.create({name:"staff_modal_form"})(
    class extends Component{

        UNSAFE_componentWillReceiveProps = (nextProps) => {
            if (nextProps.values !== this.props.values){
                this.props.form.resetFields();
            }
        };

        state={
            wechatFileList:[],
            imageFileList:[],
            isLoading:false,
        };


        wechatFile = e => {
            this.setState({
                wechatFileList: e.fileList
            });
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
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


        onCancel = () =>{
            this.props.hideModal()
        }



        HandlerSubmit = (e)=>{
            e.preventDefault()
            this.props.form.validateFields((err, values) => {
                if (!err){
                    let fdata = new FormData()
                    fdata.append('role',values.role)
                    fdata.append('role_cn',values.role_cn)
                    fdata.append('facebook',values.facebook)
                    fdata.append('linkedin',values.linkedin)
                    if (values.wechat.length !== 0){
                        if (values.wechat[0].response.is_success){
                            fdata.append("wechat",values.wechat[0].response.data)
                        }
                    }else{
                        fdata.append("wechat",this.props.values.wechat)
                    }

                    if (values.image.length !== 0){
                        if (values.image[0].response.is_success){
                            fdata.append("image",values.image[0].response.data)
                        }
                    }else{
                        fdata.append("image",this.props.values.image)
                    }

                    this.setState({isLoading:true})
                    UpdateStaff(this.props.values.id,fdata).then(res=>{
                        this.setState({isLoading:false},()=>{
                            this.props.hideModalThenFetch()
                        })
                    }).catch(err=>{
                        this.setState({isLoading:false});
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
                    title={`Edit ${this.props.values.name} Information`}
                    okText="Update"
                    onCancel={this.onCancel}
                    onOk={this.HandlerSubmit}
                    confirmLoading={this.state.isLoading}
                >
                    <Form layout="vertical">
                        <Form.Item label="role">
                            {getFieldDecorator('role', {
                                initialValue: this.props.values.role
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item  label="职位">
                            {getFieldDecorator('role_cn',{
                                initialValue: this.props.values.role_cn
                            })(<Input type="textarea" />)}
                        </Form.Item>
                        <Form.Item label="facebook">
                            {getFieldDecorator('facebook',{
                                initialValue: this.props.values.facebook
                            })(<Input  />)}
                        </Form.Item>
                        <Form.Item label="linkedin">
                            {getFieldDecorator('linkedin',{
                                initialValue: this.props.values.linkedin
                            })(<Input  />)}
                        </Form.Item>
                        <Form.Item label="image">
                            {getFieldDecorator('image', {
                                valuePropName: 'image',
                                getValueFromEvent: this.imageFile,
                                initialValue: []
                            })(
                                <Upload action={UploadImage} name="image" listType="picture">
                                    {this.state.imageFileList.length===0?(<Button>
                                        <Icon type="upload" /> Click to upload
                                    </Button>):null}
                                </Upload>,
                            )}
                        </Form.Item>
                        <Form.Item label="wechat">
                            {getFieldDecorator('wechat', {
                                valuePropName: 'wechat',
                                getValueFromEvent: this.wechatFile,
                                initialValue: []
                            })(
                                <Upload action={UploadImage} name="image" listType="picture">
                                    {this.state.wechatFileList.length===0?(<Button>
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

const mapStateToProps = state => {
    return {
        StaffInfoData: state.StaffInfoReducer
    }
};

const mapDispatchToProps = dispatch => {
    return {
        SetData: (value) =>{
            dispatch(SetData(value))
        }
    }
};



export default connect(mapStateToProps,mapDispatchToProps)(StaffEditModal)
