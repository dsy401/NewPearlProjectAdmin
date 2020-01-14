import React,{Component} from 'react'
import {Modal,Form,Input,Upload,Icon,Button} from 'antd'
import {PostBrands} from '../../../api/api'
import {connect} from 'react-redux'
import {SetData} from "../../../redux/actions/BrandAction";

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
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err){
                    let fdata = new FormData()
                    fdata.append('name',values.name)
                    fdata.append('name_cn',values.name_cn)
                    fdata.append('description',values.description)
                    fdata.append('description_cn',values.description_cn)

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



