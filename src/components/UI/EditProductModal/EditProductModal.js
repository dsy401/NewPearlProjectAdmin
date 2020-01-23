import React,{Component} from 'react'
import {Modal, Form, Input, Upload, Icon, Button, Row, Col} from 'antd'
import {UploadImage} from "../../../api/api";

const EditProductModal = Form.create({name:"edit_product_modal"})(
    class extends Component{


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
                let fdata = new FormData();
                Object.keys(values).forEach(key=>{
                    console.log(key)
                    if (key!=="image"){
                        fdata.append(key,values[key])
                    }
                });
                fdata.append('product_category_id', this.props.productCategoryId);
                if (values.image.length !== 0){
                    if (values.image[0].response.is_success){
                        fdata.append("image",values.image[0].response.data)
                    }else{
                        fdata.append("image",this.props.values.image)
                    }
                }else{
                    fdata.append("image",this.props.values.image)
                }
                fdata.append('price',"contact us")
                fdata.append('price_cn', "联系我们")

                this.props.updateProduct(this.props.values.id,fdata,()=>{
                    this.props.form.resetFields()
                })
                this.setState({
                    imageFileList:[]
                })
            })
        };


        render(){
            const { form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={this.props.visible}
                    title={`Edit ${this.props.values.code} Information`}
                    okText="Update"
                    width={1000}
                    style={{top:0}}
                    onCancel={()=>{
                        this.onCancel()
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
                                        initialValue: this.props.values.code
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="color">
                                    {getFieldDecorator('color', {
                                        rules: [{ required: true, message: 'Please enter the color!' }],
                                        initialValue: this.props.values.color
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="environment">
                                    {getFieldDecorator('environment', {
                                        rules: [{ required: true, message: 'Please enter the environment!' }],
                                        initialValue: this.props.values.environment
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="finish">
                                    {getFieldDecorator('finish', {
                                        rules: [{ required: true, message: 'Please enter the finish!' }],
                                        initialValue: this.props.values.finish
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="material">
                                    {getFieldDecorator('material', {
                                        rules: [{ required: true, message: 'Please enter the material!' }],
                                        initialValue: this.props.values.material
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="shape">
                                    {getFieldDecorator('shape', {
                                        rules: [{ required: true, message: 'Please enter the shape!' }],
                                        initialValue: this.props.values.shape
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="size">
                                    {getFieldDecorator('size', {
                                        rules: [{ required: true, message: 'Please enter the size!' }],
                                        initialValue: this.props.values.size
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="style">
                                    {getFieldDecorator('style', {
                                        rules: [{ required: true, message: 'Please enter the style!' }],
                                        initialValue: this.props.values.style
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="type">
                                    {getFieldDecorator('type', {
                                        rules: [{ required: true, message: 'Please enter the type!' }],
                                        initialValue: this.props.values.type
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="unit">
                                    {getFieldDecorator('unit', {
                                        rules: [{ required: true, message: 'Please enter the unit!' }],
                                        initialValue: this.props.values.unit
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="颜色">
                                    {getFieldDecorator('color_cn', {
                                        rules: [{ required: true, message: 'Please enter the 颜色!' }],
                                        initialValue: this.props.values.color_cn
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="适用场景">
                                    {getFieldDecorator('environment_cn', {
                                        rules: [{ required: true, message: 'Please enter the 适用场景!' }],
                                        initialValue: this.props.values.environment_cn
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="材料面">
                                    {getFieldDecorator('finish_cn', {
                                        rules: [{ required: true, message: 'Please enter the 材料面!' }],
                                        initialValue: this.props.values.finish_cn
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="材料">
                                    {getFieldDecorator('material_cn', {
                                        rules: [{ required: true, message: 'Please enter the 材料!' }],
                                        initialValue: this.props.values.material_cn
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="形状">
                                    {getFieldDecorator('shape_cn', {
                                        rules: [{ required: true, message: 'Please enter the 形状!' }],
                                        initialValue: this.props.values.shape_cn
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="大小">
                                    {getFieldDecorator('size_cn', {
                                        rules: [{ required: true, message: 'Please enter the 大小!' }],
                                        initialValue: this.props.values.size_cn
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="风格">
                                    {getFieldDecorator('style_cn', {
                                        rules: [{ required: true, message: 'Please enter the 风格!' }],
                                        initialValue: this.props.values.style_cn
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="类型">
                                    {getFieldDecorator('type_cn', {
                                        rules: [{ required: true, message: 'Please enter the 类型!' }],
                                        initialValue: this.props.values.type_cn
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item label="单位">
                                    {getFieldDecorator('unit_cn', {
                                        rules: [{ required: true, message: 'Please enter the 单位!' }],
                                        initialValue: this.props.values.unit_cn
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





export default EditProductModal
