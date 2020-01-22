import { Result, Icon, Button } from 'antd';
import React from 'react'
import {
    ResetAll
} from "../../../../redux/actions/NewsAction";
import {connect} from 'react-redux'

const FinishResult = (props) =>{
    return (
        <Result
            icon={<Icon type="smile" theme="twoTone" />}
            title="Great, we have done all the operations!"
            extra={<Button onClick={()=>{window.location = '/dashboard/publish'}} type="primary">Keep adding News</Button>}
        />
    )
};


const mapStateToProps = state=>{
    return {
        NewsData: state.NewsReducer
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        ResetAll: ()=>{
            dispatch(ResetAll())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FinishResult)
