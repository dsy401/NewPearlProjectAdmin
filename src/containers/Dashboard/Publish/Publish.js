import React,{Component} from 'react'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import TextEditor from "./TextEditor/TextEditor";
import NewsTitleForm from "./NewsTitleForm/NewsTitleForm";
import { Steps } from 'antd';
import {connect} from 'react-redux'
import FinishResult from "./FinishResult/FinishResult";


const { Step } = Steps;


class Publish extends Component{
    static getDerivedStateFromProps(props, state) {
        if (props.NewsData.stepPosition !== state.pos){
            return {...state,pos:props.NewsData.StepPosition}
        }

        return null
    }

    state={
        pos:0
    };



    render(){
        return(
                <DashboardBody title={this.props.name}>
                    <div style={{paddingBottom:50}}>
                        <Steps progressDot current={this.state.pos}>
                            <Step title="First Step" description="news title and image" />
                            <Step title="Second Step" description="content of the news" />
                            <Step title="Finished" description="Finished" />
                        </Steps>
                    </div>
                    <div style={{display: this.state.pos===0?'block':'none'}}>
                        <NewsTitleForm/>
                    </div>
                    <div style={{display: this.state.pos===1?'block':'none'}}>
                        <TextEditor/>
                    </div>
                    <div style={{display: this.state.pos===2?'block':'none'}}>
                        <FinishResult/>
                    </div>
                </DashboardBody>
        )
    }
}


const mapStateToProps = state=>{
    return {
        NewsData: state.NewsReducer
    }
}


export default connect(mapStateToProps)(Publish)
