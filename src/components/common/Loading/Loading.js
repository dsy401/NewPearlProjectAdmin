import React,{Component} from 'react'
import {withRouter} from 'react-router-dom';


class Loading extends Component{

    componentDidMount = () => {
        const token = localStorage.getItem("token")
        if (token){
            this.props.history.push('/dashboard')
        }else{
            this.props.history.push('/login')
        }
    };
    render() {
        return (
            <div>Loading ...</div>
        )
    }
}

export default withRouter(Loading)
