import React, {useState} from 'react'
import { Modal, Button,Form,Select,Input} from 'antd';
import {AddLottery} from '../../../api/api'
import {connect} from 'react-redux'
import {SetData} from "../../../redux/actions/lotteryAction";
const { Option } = Select;

const AddLotteryForm = (props) =>{
    const { getFieldDecorator } = props.form;

    const SubmitHandler = (e) => {
        props.submit(e, () => {
            props.form.validateFields((err, values) => {
                if (!err) {
                    let data = new FormData()
                    data.append("name",values.name)
                    data.append("gender",values.gender)
                    data.append("phone",values.phone)
                    props.setIsLoading(true)
                    AddLottery(data).then(res=>{
                        props.setIsLoading(false)
                        setTimeout(()=>{
                            props.closeModal()
                            props.SetData(res.data)
                        },300)

                    }).catch(error=>{
                        alert("Server Error")
                    })
                }
            })
        })
    }
    return (
        <Form onSubmit={SubmitHandler}>
            <Form.Item label="name">
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please enter the name!' }],
                })(<Input placeholder="name ..."/>)}
            </Form.Item>
            <Form.Item label="phone">
                {getFieldDecorator('phone', {
                    rules: [{ required: true, message: 'Please enter the phone!' },{min:7, message: "Phone number doesn't less than 7 digits"}],
                })(<Input placeholder="phone number ..."/>)}
            </Form.Item>
            <Form.Item label="gender">
                {getFieldDecorator('gender', {
                    rules: [{ required: true, message: 'Please select the gender!' }],
                })(
                    <Select>
                        <Option value="0">male</Option>
                        <Option value="1">female</Option>
                    </Select>
                )}
            </Form.Item>
            <Form.Item>
                <Button key="back" onClick={props.closeModal}>
                    Cancel
                </Button>,
                <Button htmlType="submit" type="primary" loading={props.isLoading}>
                    Submit
                </Button>,
            </Form.Item>

        </Form>
    )
};



const mapStateToProps = state => {
    return {
        lotteryData: state.lotteryReducer
    }
};

const mapDispatchToProps = dispatch => {
    return {
        SetData: (value) =>{
            dispatch(SetData(value))
        }
    }
};

const AddLotteryFormTemplate = Form.create({ name: 'normal_login' })(connect(mapStateToProps,mapDispatchToProps)(AddLotteryForm));

const LotteryAddModal = (props) =>{
    const HandleOk = (e,cb) =>{
        e.preventDefault()
        cb()
    };

    const [isLoading,setIsLoading] = useState(false);

    return (
        <Modal
            visible={props.visible}
            title="Title"
            onOk={HandleOk}
            onCancel={props.closeModal}
            footer={[]}
        >
            <AddLotteryFormTemplate isLoading={isLoading} submit={HandleOk} setIsLoading={setIsLoading} closeModal={props.closeModal}/>
        </Modal>
    )
}

export default LotteryAddModal
