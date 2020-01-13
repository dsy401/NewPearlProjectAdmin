import React,{Component} from 'react'


class DashboardRedirect extends Component{
    componentDidMount = () => {
        this.props.history.push('/dashboard/home')
    };
    render(){
        return (
            <div/>
        )
    }
}


export default DashboardRedirect
