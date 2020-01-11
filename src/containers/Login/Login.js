import React,{Component} from 'react'
import classes from './Login.css'
import {Form,Icon, Input, Button,Typography } from 'antd';
import {Login} from '../../api/api'
import {withRouter} from 'react-router-dom';

class LoginForm extends Component{

    constructor(props) {
        super(props);
        const token = localStorage.getItem("token")
        if (token){
            window.location = '/dashboard'
        }
    }

    state= {
        height: window.innerHeight,
        isRedirect: false
    };

    componentDidMount = () =>{
        window.addEventListener("resize",()=>{
            this.setState({
                height: window.innerHeight
            })
        })
    };

    componentWillUnmount = () => {
        window.removeEventListener('resize',()=>{
            console.log("window resize event removed")
        })
    };

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let formData = new FormData();
                formData.append("username",values.username)
                formData.append("password",values.password)
                Login(formData).then(res=>{
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("name", res.data.user_name)
                    window.location = '/dashboard'
                }).catch(error=>{
                    alert(error.error_message)

                })
            }
        });
    };
    render() {
            const { getFieldDecorator } = this.props.form;
            const {height} = this.state
            return (
                <div style={{height:height }} className={classes.login}>
                    <div className={classes.loginForm}>
                        <Typography.Title style={{textAlign:"center"}} level={4}>Thriving Building System</Typography.Title>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="loginFormButton">
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            );
        }
}
const LoginTemplate = Form.create({ name: 'normal_login' })(LoginForm);
export default withRouter(LoginTemplate)
