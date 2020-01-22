import React, {Component} from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ImageUploader from "../../../../utils/ImageUploader";
import {Button} from 'antd'
import GeneralConfirmModal from "../../../../components/UI/GeneralConfirmModal/GeneralConfirmModal";
import {connect} from 'react-redux'
import {ConfirmContent,ResetAll} from "../../../../redux/actions/NewsEditAction";

class NewsEditTextEditor extends Component{

    state={
        modalVisible: false,
        content: "",
        content_cn: ""
    };

    EditorOnChange = (event,editor)=>{
        const data = editor.getData();
        this.setState({
            content: data
        })
    };

    EditorCNOnchange = (event,editor)=>{
        const data = editor.getData();
        this.setState({
            content_cn: data
        })
    };


    ConfirmHandler = () =>{
        this.setState({
            modalVisible: true
        },()=>{
            this.props.ConfirmContent({content:this.state.content,content_cn:this.state.content_cn})
        })
    };


    ModalConfirmHandler = () =>{
        this.props.EditConfirm(()=>{
            this.setState({modalVisible: false},()=>{

                //call back
            })
        })
    };

    render(){
        return(
            <div>
                <h3>Content</h3>
                <CKEditor
                    data={this.props.content}
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
                    data={this.props.content_cn}
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
                <Button onClick={this.props.StepBack} style={{marginTop:15,marginRight:15}} type="primary">Back</Button>
                <Button onClick={this.ConfirmHandler} style={{marginTop:15}} type="primary">Edit</Button>
                <GeneralConfirmModal
                    title="Edit Confirmation"
                    visible={this.state.modalVisible}
                    confirm={this.ModalConfirmHandler}
                    hideModal={()=>{this.setState({modalVisible:false})}}
                    isLoading={this.props.isLoading}
                    text="Are you sure to Edit this news?"
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return {
        ConfirmContent: (value) =>{
            dispatch(ConfirmContent(value))
        },
        ResetAll: () =>{
            dispatch(ResetAll())
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(NewsEditTextEditor)
