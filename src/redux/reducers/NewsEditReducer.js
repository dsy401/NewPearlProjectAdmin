const initialState = {
    content: "",
    content_cn: ""
}

const NewsEditReducer = (state=initialState,action) =>{
    switch (action.type) {
        case "ConfirmContent":
            return {content: action.payload.content,content_cn: action.payload.content_cn}
        case "ResetAll":
            return initialState
        default:
            return state
    }
};

export default NewsEditReducer
