import React, {Component} from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ImageUploader from "../../../../utils/ImageUploader";
import {Button} from 'antd'
import {connect} from 'react-redux'
import {ContentStepBackClick, ContentConfirmClick, CloseFinalConfirmModal,FinishPublish} from "../../../../redux/actions/NewsAction";
import GeneralConfirmModal from "../../../../components/UI/GeneralConfirmModal/GeneralConfirmModal";
import {AddNews} from "../../../../api/api";

class TextEditor extends Component{

    state={
        content: "",
        content_cn: "",
        isLoading: false
    };

    EditorOnChange = (event,editor)=>{
        const data = editor.getData();
        this.setState({ content: data });
    };

    EditorCNOnchange = (event,editor)=>{
        const data = editor.getData();
        this.setState({ content_cn: data });
    };


    ConfirmHandler = () =>{
        const {content,content_cn} = this.state;
        this.props.ContentConfirmClick({content: content,content_cn: content_cn})
    };


    ModalConfirmHandler = () =>{
        const {newsTitle,newsContent} = this.props.NewsData
        const model = {...newsTitle,...newsContent}
        const fdata = new FormData()
        Object.keys(model).forEach(key=>{
            fdata.append(key,model[key])
        });
        this.setState({isLoading:true})
        AddNews(fdata).then(res=>{
            this.setState({isLoading:false},()=>{
                this.props.FinishPublish()
            });
            console.log(res)
        }).catch(err=>{
            this.setState({isLoading:false})
            console.log(err)
        })
    };

    render(){
        return(
            <div>
                <h3>Content</h3>
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
                            "imageUpload",
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

                <h3 style={{paddingTop: 30}}>内容</h3>
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
                        this.EditorCNOnchange(event,editor)
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
                            "imageUpload",
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
                <Button onClick={this.props.ContentStepBackClick} style={{marginTop:15,marginRight:15}} type="primary">Back</Button>
                <Button onClick={this.ConfirmHandler} style={{marginTop:15}} type="primary">Publish</Button>
                <GeneralConfirmModal
                    title="Publish Confirmation"
                    visible={this.props.NewsData.finalConfirmModalVisible}
                    confirm={this.ModalConfirmHandler}
                    hideModal={this.props.CloseFinalConfirmModal}
                    isLoading={this.state.isLoading}
                    text="Are you sure to publish this news?"
                />
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return {
        NewsData: state.NewsReducer
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        ContentStepBackClick: () =>{
            dispatch(ContentStepBackClick())
        },
        ContentConfirmClick: (value)=>{
            dispatch(ContentConfirmClick(value))
        },
        CloseFinalConfirmModal: ()=>{
            dispatch(CloseFinalConfirmModal())
        },
        FinishPublish: ()=>{
            dispatch(FinishPublish())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TextEditor)
