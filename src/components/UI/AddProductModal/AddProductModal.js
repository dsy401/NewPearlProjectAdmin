import React,{Component} from 'react'
import {Modal,Form,Input,Upload,Icon,Button,Row,Col} from 'antd'
import {UploadImage} from '../../../api/api'

const ProductAddModal = Form.create({name:"product_add_modal"})(
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
                    let fdata = new FormData();
                    Object.keys(values).forEach(key=>{
                        if (key!=="image"){
                            fdata.append(key,values[key])
                        }
                    });
                    fdata.append('product_category_id', this.props.productCategoryId);
                    if (values.image.length !== 0){
                        if (values.image[0].response.is_success){
                            fdata.append("image",values.image[0].response.data)
                        }else{
                            fdata.append("image","")
                        }
                    }else{
                        fdata.append("image","")
                    }
                    fdata.append('price',"contact us")
                    fdata.append('price_cn', "联系我们")

                    this.props.AddProduct(fdata,()=>{
                        this.props.form.resetFields()
                        this.setState({
                            imageFileList:[]
                        })
                    })

                }
            })
        };


        render(){
            const { form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    style={{top:0}}
                    width={1000}
                    visible={this.props.visible}
                    title={`Add Product`}
                    okText="Add"
                    onCancel={()=>{
                        this.props.hideModal()
                        this.setState({
                            imageFileList:[]
                        })
                    }}
                    onOk={this.HandlerSubmit}
                    confirmLoading={this.props.isLoading}
                    destroyOnClose={true}
                >
                    <Form layout="vertical">
                        <Row type="flex" justify="space-around">
                            <Col span={9}>
                                <Form.Item label="code">
                                    {getFieldDecorator('code', {
                                        rules: [{ required: true, message: 'Please enter the code!' }],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="color">
                                    {getFieldDecorator('color', {
                                        rules: [{ required: true, message: 'Please enter the color!' }],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="environment">
                                    {getFieldDecorator('environment', {
                                        rules: [{ required: true, message: 'Please enter the environment!' }],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="finish">
                                    {getFieldDecorator('finish', {
                                        rules: [{ required: true, message: 'Please enter the finish!' }],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="material">
                                    {getFieldDecorator('material', {
                                        rules: [{ required: true, message: 'Please enter the material!' }],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="shape">
                                    {getFieldDecorator('shape', {
                                        rules: [{ required: true, message: 'Please enter the shape!' }],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="size">
                                    {getFieldDecorator('size', {
                                        rules: [{ required: true, message: 'Please enter the size!' }],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="style">
                                    {getFieldDecorator('style', {
                                        rules: [{ required: true, message: 'Please enter the style!' }],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="type">
                                    {getFieldDecorator('type', {
                                        rules: [{ required: true, message: 'Please enter the type!' }],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="unit">
                                    {getFieldDecorator('unit', {
                                        rules: [{ required: true, message: 'Please enter the unit!' }],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="颜色">
                                    {getFieldDecorator('color_cn', {
                                        rules: [{ required: true, message: 'Please enter the 颜色!' }],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="适用场景">
                                    {getFieldDecorator('environment_cn', {
                                        rules: [{ required: true, message: 'Please enter the 适用场景!' }],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="材料面">
                                    {getFieldDecorator('finish_cn', {
                                        rules: [{ required: true, message: 'Please enter the 材料面!' }],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="材料">
                                    {getFieldDecorator('material_cn', {
                                        rules: [{ required: true, message: 'Please enter the 材料!' }],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="形状">
                                    {getFieldDecorator('shape_cn', {
                                        rules: [{ required: true, message: 'Please enter the 形状!' }],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="大小">
                                    {getFieldDecorator('size_cn', {
                                        rules: [{ required: true, message: 'Please enter the 大小!' }],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="风格">
                                    {getFieldDecorator('style_cn', {
                                        rules: [{ required: true, message: 'Please enter the 风格!' }],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="类型">
                                    {getFieldDecorator('type_cn', {
                                        rules: [{ required: true, message: 'Please enter the 类型!' }],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="单位">
                                    {getFieldDecorator('unit_cn', {
                                        rules: [{ required: true, message: 'Please enter the 单位!' }],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
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
                            </Col>
                        </Row>

                    </Form>
                </Modal>
            )
        }
    }
);


export default ProductAddModal



