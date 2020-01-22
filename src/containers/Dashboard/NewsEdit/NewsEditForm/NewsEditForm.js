import React,{Component} from 'react'
import {Form, Input, Button, Upload, Icon} from 'antd';
import {UploadImage} from "../../../../api/api";

class NewsEditFormWrapper extends Component {

    state={
        imageFileList:[]
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const model = {
                    title: values.title,
                    title_cn: values.title_cn,
                    image: this.props.image
                }

                if (values.image.length !== 0){
                    if (values.image[0].response.is_success){
                        model.image = values.image[0].response.data
                    }
                }

                this.props.submit(model)

            }
        });
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

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                <Form.Item label="Title">
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: 'Please input your title!' }],
                        initialValue: this.props.title
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="标题">
                    {getFieldDecorator('title_cn', {
                        rules: [{ required: true, message: 'Please input your 标题!' }],
                        initialValue: this.props.title_cn
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="Title Image">
                    {getFieldDecorator('image', {
                        valuePropName: 'image',
                        getValueFromEvent: this.imageFile,
                        initialValue: [],
                    })(
                        <Upload action={UploadImage} name="image" listType="picture">
                            {this.state.imageFileList.length===0?(<Button>
                                <Icon type="upload" /> Click to upload
                            </Button>):null}
                        </Upload>
                    )}
                </Form.Item>


                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                    <Button type="primary" htmlType="submit">
                        Next Step
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}


const NewsEditForm = Form.create({ name: 'news_edit_form' })(NewsEditFormWrapper);

export default NewsEditForm
