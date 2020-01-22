import React,{Component} from 'react'
import {Modal,Form,Input,Upload,Icon,Button} from 'antd'
import {PostBrands, UploadImage} from '../../../api/api'
import {connect} from 'react-redux'
import {SetData} from "../../../redux/actions/BrandAction";

const BrandAddModal = Form.create({name:"brand_add_modal"})(
    class extends Component{

        UNSAFE_componentWillReceiveProps = () =>{
            if (this.props.visible === false){
                this.props.form.resetFields();
            }
        };

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
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err){
                    let fdata = new FormData()
                    fdata.append('name',values.name)
                    fdata.append('name_cn',values.name_cn)
                    fdata.append('description',values.description)
                    fdata.append('description_cn',values.description_cn)

                    if (values.image.length !== 0){
                        if (values.image[0].response.is_success){
                            fdata.append("image",values.image[0].response.data)
                        }else{
                            fdata.append("image","")
                        }
                    }else{
                        fdata.append("image","")
                    }

                    this.setState({isLoading:true})
                    PostBrands(fdata).then(res=>{
                        this.setState({isLoading:false},()=>{
                            this.props.hideModal()
                            this.props.SetData(res.data)
                        })
                    }).catch(err=>{
                        console.log(err);
                        this.setState({isLoading:false})
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
                                initialValue: []
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

const mapStateToProps = state => {
    return {
        BrandData: state.BrandReducer
    }
};

const mapDispatchToProps = dispatch => {
    return {
        SetData: (value) =>{
            dispatch(SetData(value))
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(BrandAddModal)



