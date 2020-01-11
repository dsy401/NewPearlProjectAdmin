import React,{Component} from 'react'


class DashboardRedirect extends Component{
    componentDidMount = () => {
        this.props.history.push('/dashboard/lotterymanagement')
    };
    render(){
        return (
            <div/>
        )
    }
}


export default DashboardRedirect
