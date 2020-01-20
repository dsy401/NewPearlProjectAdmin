import React,{Component} from 'react'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import {Input,Button,Form} from 'antd'
import {ChangePassWord} from '../../../api/api'
import ChangepasswordModal from '../../../components/UI/ChangePassword/changepasswordModal';


class ChangePassword extends Component{
    state={
        confirmDirty: false,
        newpassword:'',
        oldpassword:'',
        changeModalVisible: false
    }
    openchangepasswordModal = () =>{
        this.setState({
            changeModalVisible: true
        })
    }
    hidechangepasswordModal = () =>{
        this.setState({
            changeModalVisible: false
        })
    }
     passwordchanged=()=>{
        let id =window.localStorage.getItem('user_id');
        let formData = new FormData();
        formData.append("old_password",this.state.oldpassword)
        formData.append("new_password",this.state.newpassword)
         ChangePassWord(formData,id).then(
            res=>{
                console.log(res)
            }
        ).then(()=>{
            localStorage.removeItem("token")
            localStorage.removeItem('name')
            localStorage.removeItem('user_id')
            window.location = "/login"
        }).catch(error=>{
            alert(error.error_message)
        })
    }

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      };
      validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
       this.setState({oldpassword:form.getFieldValue('old_password')})
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }if (value && value == form.getFieldValue('old_password')) {
            callback('The new password should be inconsistent with the old password!');
          } else {
              this.setState({
                  newpassword:value
              })
            callback();
          }
        callback();

      };
      compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      };
      submitpassword=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.setState({
                changeModalVisible: true
            })
          }else{
              return ''
          }
        });
      }

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <DashboardBody title={this.props.name}>
            <Form>

             <Form.Item label="Old Password" hasFeedback>
                                {getFieldDecorator('old_password', {
                                    rules: [{ required: true, message: 'Please input your Old Password!' }],
                                })
                                (
                                    <Input.Password/>,
                                )}
                            </Form.Item>
            <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,

              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item >

            <Button  type="primary" htmlType="submit" onClick={this.submitpassword} style={{marginLeft:'45%'}}>
                   submit
            </Button>
            </Form.Item>
            <ChangepasswordModal hideModal={this.hidechangepasswordModal} confirm={this.passwordchanged} visible={this.state.changeModalVisible}/>

            </Form>
            </DashboardBody>
        )
    }
}
const Changepassword = Form.create({ name: 'change' })(ChangePassword);
export default Changepassword
