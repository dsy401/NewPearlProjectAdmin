import React,{Component} from 'react'
import {Modal,Form,Input,Upload,Icon,Button} from 'antd'
import {connect} from 'react-redux'
import {UploadImage} from "../../../api/api";
import {UpdateAndFetchProductCategory} from "../../../redux/actions/ProductCategoryAction";
const ProductCategoryEditModal = Form.create({name:"product_category_edit_modal"})(
    class extends Component{

        UNSAFE_componentWillReceiveProps = (nextProps) => {
            if (nextProps.values !== this.props.values){
                this.props.form.resetFields();
            }
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

        state={
            imageFileList:[],
        };


        onCancel = () =>{
            this.props.hideModal()
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
                            fdata.append("image",this.props.values.image)
                        }
                    }else{
                        fdata.append("image",this.props.values.image)
                    }
                    this.props.UpdateAndFetchProductCategory(this.props.values.id,fdata,()=>{
                        this.onCancel()
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
                    visible={this.props.visible}
                    title={`Edit ${this.props.values.name} Information`}
                    okText="Update"
                    onCancel={()=>{
                        this.onCancel()
                        this.setState({
                            imageFileList:[]
                        })
                    }}
                    destroyOnClose={true}
                    onOk={this.HandlerSubmit}
                    confirmLoading={this.props.Data.isLoading}
                >
                    <Form layout="vertical">
                        <Form.Item label="name">
                            {getFieldDecorator('name', {
                                initialValue: this.props.values.name
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="名字">
                            {getFieldDecorator('name_cn', {
                                initialValue: this.props.values.name_cn
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="description">
                            {getFieldDecorator('description', {
                                initialValue: this.props.values.description
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="描述">
                            {getFieldDecorator('description_cn', {
                                initialValue: this.props.values.description_cn
                            })(<Input/>)}
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
                    </Form>
                </Modal>
            )
        }
    }
);

const mapStateToProps = state => {
    return {
        Data: state.ProductCategoryReducer
    }
};

const mapDispatchToProps = dispatch => {
    return {
        UpdateAndFetchProductCategory: (id,data,cb)=> dispatch(UpdateAndFetchProductCategory(id,data,cb))
    }
};





export default connect(mapStateToProps,mapDispatchToProps)(ProductCategoryEditModal)
