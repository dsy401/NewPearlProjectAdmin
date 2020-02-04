import React, {useState} from 'react'
import { Modal, Button,Form,Select,Input} from 'antd';
import {AddLocalClient} from '../../../api/api'
import {connect} from 'react-redux'
import {SetData} from "../../../redux/actions/localClientAction";

const AddLotteryForm = (props) =>{
    const { getFieldDecorator } = props.form;

    const SubmitHandler = (e) => {
        props.submit(e, () => {
            props.form.validateFields((err, values) => {
                if (!err) {
                    let data = new FormData()
                    data.append("name",values.name)
                    data.append("address",values.address)
                    data.append("phone",values.phone)
                    data.append("email",values.email)
                    props.setIsLoading(true);
                    AddLocalClient(data).then(res=>{
                        props.setIsLoading(false)
                        setTimeout(()=>{
                            props.closeModal()
                            props.refreshPage()
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
            <Form.Item label="address">
                {getFieldDecorator('address', {
                    rules: [{ required: true, message: 'Please enter the address!' }],
                })(
                    (<Input placeholder="address ..."/>)
                )}
            </Form.Item>
            <Form.Item label="email">
                {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Please enter the email!' }],
                })(
                    (<Input placeholder="email ..."/>)
                )}
            </Form.Item>

            <Form.Item>
                <Button style={{marginRight:"10px"}} key="back" onClick={props.closeModal}>
                    Cancel
                </Button>
                <Button htmlType="submit" type="primary" loading={props.isLoading}>
                    Submit
                </Button>
            </Form.Item>

        </Form>
    )
};



const mapStateToProps = state => {
    return {
        localClientData: state.localClientReducer
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

const LocalClientAddModal = (props) =>{
    const HandleOk = (e,cb) =>{
        e.preventDefault()
        cb()
    };

    const [isLoading,setIsLoading] = useState(false);

    return (
        <Modal
            visible={props.visible}
            title="Add Local Client"
            onOk={HandleOk}
            onCancel={props.closeModal}
            footer={[]}
        >
            <AddLotteryFormTemplate refreshPage={props.refreshPage} isLoading={isLoading} submit={HandleOk} setIsLoading={setIsLoading} closeModal={props.closeModal}/>
        </Modal>
    )
};

export default LocalClientAddModal
