import React,{Component} from 'react'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import {GetNewsContent, UpdateNews} from "../../../api/api";
import {Button, Icon, Result, Spin, Steps} from "antd";
import NewsEditForm from "./NewsEditForm/NewsEditForm";
import NewsEditTextEditor from "./NewsEditTextEditor/NewsEditTextEditor";
import {connect} from 'react-redux'
import {ResetAll} from "../../../redux/actions/NewsEditAction";
const { Step } = Steps;

class NewsEdit extends Component{

    state={
        isLoading: false,
        data:{
            title: "",
            title_cn: "",
            news_title_id: "",
            content_cn: "",
            content: "",
            news_content_id: "",
            image: ""
        },
        pos: 0
    };

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            data:{
                ...this.state.data,
                content: nextProps.ContentData.content,
                content_cn: nextProps.ContentData.content_cn
            }
        })
    }



    componentDidMount = () =>{
        const Id = this.props.match.params.newsTitleId
        this.setState({isLoading:true})
        GetNewsContent(Id).then(res=>{
            this.setState({
                data:{
                    title: res.data.news_title.title,
                    title_cn: res.data.news_title.title_cn,
                    news_title_id: res.data.news_title_id,
                    content_cn: res.data.content_cn,
                    content: res.data.content,
                    news_content_id: res.data._id,
                    image: res.data.news_title.image
                },
                isLoading:false
            })
        }).catch(err=>{
            console.log(err);
            this.setState({isLoading:false})
        })
    };

    componentWillUnmount = ()=> {
        this.props.ResetAll()
        this.setState = state=>{
            return;
        }
    };

    EditConfirm = (cb) =>{
        let fdata = new FormData()
        Object.keys(this.state.data).forEach(key=>{
            fdata.append(key,this.state.data[key])
        })

        this.setState({isLoading:true})
        UpdateNews(fdata).then(res=>{
            this.setState({isLoading:false,pos:2})
            cb()
        }).catch(err=>{
            this.setState({isLoading:false})
            console.log(err)
        })
    }

    NewsEditFormSubmit = (obj) =>{
        this.setState({
            data:{
                ...this.state.data,
                title: obj.title,
                title_cn: obj.title_cn,
                image: obj.image
            },
            pos:1
        })
    };

    StepBack = () =>{
        this.setState({pos:0})
    }


    render(){
        return (

            <DashboardBody title={this.props.name}>
                <Spin style={{top:250}} tip="Loading..." spinning={this.state.isLoading}>
                    <Button onClick={()=>{this.props.history.push('/dashboard/news')}} type="primary">
                        <Icon type="left" />
                        Go back
                    </Button>
                    <div style={{marginTop:50}}>
                        <Steps progressDot current={this.state.pos}>
                            <Step title="First Step" description="news title and image" />
                            <Step title="Second Step" description="content of the news" />
                            <Step title="Finished" description="Finished" />
                        </Steps>
                    </div>

                    <div style={{display: this.state.pos===0?'block':'none'}}>
                        <NewsEditForm
                            submit={this.NewsEditFormSubmit}
                            image={this.state.data.image}
                            title={this.state.data.title}
                            title_cn={this.state.data.title_cn}
                        />
                    </div>
                    <div style={{display: this.state.pos===1?'block':'none'}}>
                        <NewsEditTextEditor
                            content={this.state.data.content}
                            content_cn={this.state.data.content_cn}
                            EditConfirm={this.EditConfirm}
                            StepBack={this.StepBack}
                            isLoading={this.state.isLoading}
                        />
                    </div>

                    <div style={{display: this.state.pos===2?'block':'none'}}>
                        <Result
                            icon={<Icon type="smile" theme="twoTone" />}
                            title="Great, we have done all the operations!"
                            extra={<Button onClick={()=>{window.location = '/dashboard/news'}} type="primary">See All News</Button>}
                        />
                    </div>


                </Spin>
            </DashboardBody>
        )
    }
}
const mapStateToProps = state => {
    return {
        ContentData: state.NewsEditReducer
    }
};

const mapDispatchToProps = dispatch =>{
    return {
        ResetAll: () => dispatch(ResetAll())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewsEdit)
