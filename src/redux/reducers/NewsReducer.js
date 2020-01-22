const initialState = {
    newsTitle: {
        title: "",
        title_cn:"",
        image:""
    },
    newsContent:{
        content: "",
        content_cn: ""
    },
    stepPosition: 0,
    finalConfirmModalVisible: false
}

const NewsReducer = (state=initialState,action) =>{
    switch (action.type) {
        case "TitleStepNextClick":
            return {newsTitle: action.payload, StepPosition: 1, newsContent: state.newsContent,finalConfirmModalVisible:false};
        case "ContentStepBackClick":
            return {newsTitle: state.newsTitle,StepPosition: 0, newsContent: state.newsContent,finalConfirmModalVisible:false};
        case "ContentConfirmClick":
            return {newsTitle: state.newsTitle,StepPosition: 1,newsContent: action.payload,finalConfirmModalVisible:true};
        case "CloseFinalConfirmModal":
            return {newsTitle: state.newsTitle,StepPosition: 1,newsContent: state.payload,finalConfirmModalVisible:false};
        case "FinishPublish":
            return {...initialState,StepPosition: 2};
        case "ResetAll":
            return {...initialState}
        default:
            return state
    }
};

export default NewsReducer
