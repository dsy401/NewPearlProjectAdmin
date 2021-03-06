import React, {Component} from 'react'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ImageUploader from "../../../utils/ImageUploader";
import {Input,Button} from 'antd'
import GeneralConfirmModal from "../../../components/UI/GeneralConfirmModal/GeneralConfirmModal";
import {SendEmailToLocalClient, SendTestEmailToPeople} from "../../../api/api";


class EmailSender extends Component{
    state={
        content: "",
        subject: "",
        isLoading: false,
        confirmModalVisible: false,
        test_email: ""
    };

    EditorOnChange = (event,editor)=>{
        const data = editor.getData();
        this.setState({ content: data });
    };


    SubjectOnChange = (e) =>{
        this.setState({
            subject: e.target.value
        })
    };


    SendToAllButtonClickHandler = () =>{
        this.setState({
            confirmModalVisible:true
        })
    };


    ConfirmHandler =() =>{
        const fdata = new FormData()
        fdata.append('subject',this.state.subject);
        fdata.append('content',this.state.content);
        this.setState({isLoading:true})
        SendEmailToLocalClient(fdata).then(res=>{
            this.setState({isLoading:false},()=>{
                alert(res.data)
                window.location.reload()
            })
        }).catch(err=>{
            console.log(err)
            this.setState({isLoading:false})
        })
    };

    TemplateTestSend = () =>{
        if (this.state.test_email === "" || this.state.test_email.length <= 5){
            return;
        }

        const fdata = new FormData()
        fdata.append('subject',this.state.subject);
        fdata.append('content',this.state.content);
        fdata.append('target_email',this.state.test_email)
        this.setState({isLoading:true})
        SendTestEmailToPeople(fdata).then(res=>{
            this.setState({isLoading:false},()=>{
                alert(res.data)
            })
        }).catch(err=>{
            console.log(err)
            this.setState({
                isLoading:false
            })
        })
    };

    render(){
        return(
            <React.Fragment>
                <DashboardBody title={this.props.name}>
                    <div style={{paddingBottom: 30}}>
                        <h3>Email Subject</h3>
                        <Input onChange={this.SubjectOnChange} placeholder="Enter the email subject" value={this.state.subject}/>
                    </div>
                    <div>
                        <h3>Email Content</h3>
                        <CKEditor
                            editor={ClassicEditor}
                            onInit={editor => {
                                editor.plugins.get(
                                    "FileRepository"
                                ).createUploadAdapter = loader => {
                                    return new ImageUploader(loader);
                                };
                            }}
                            onChange={(event, editor) =>
                                this.EditorOnChange(event,editor)
                            }
                            config={{
                                toolbar: [
                                    "heading",
                                    "|",
                                    "align",
                                    "bold",
                                    "italic",
                                    "|",
                                    "link",
                                    "|",
                                    "bulletedList",
                                    "numberedList",
                                    "blockQuote",
                                    "|",
                                    "undo",
                                    "redo"
                                ]
                            }}
                        />
                    </div>
                    <div style={{paddingTop: 30}}>
                        <Input onChange={(event => {
                            this.setState({
                                test_email: event.target.value
                            })
                        })} value={this.state.test_email} placeholder="Enter the email recipient to test template ..."/>
                        <Button onClick={this.TemplateTestSend} loading={this.state.isLoading} style={{marginTop: 10}} type="primary">
                            Send
                        </Button>
                    </div>
                    <div style={{paddingTop: 30}}>
                        <Button onClick={this.SendToAllButtonClickHandler} disabled={this.state.isLoading} type="primary">
                            Send To All
                        </Button>
                    </div>
                </DashboardBody>

                <GeneralConfirmModal
                    title="Email Sending Confirmation"
                    visible={this.state.confirmModalVisible}
                    confirm={this.ConfirmHandler}
                    hideModal={()=>{this.setState({confirmModalVisible:false})}}
                    isLoading={this.state.isLoading}
                    text="Are you sure to send this email to all the local client?"
                />
            </React.Fragment>
        )
    }
}


export default EmailSender;
