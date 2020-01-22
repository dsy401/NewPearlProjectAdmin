export const TitleStepNextClick = (value) =>{
    return {
        type: "TitleStepNextClick",
        payload: value
    }
}

export const ContentStepBackClick = () =>{
    return {
        type: "ContentStepBackClick"
    }
}

export const ContentConfirmClick = (value) =>{
    return {
        type: "ContentConfirmClick",
        payload: value
    }
}


export const CloseFinalConfirmModal =()=>{
    return {
        type: "CloseFinalConfirmModal"
    }
}

export const FinishPublish = () =>{
    return {
        type: "FinishPublish"
    }
}

export const ResetAll = () =>{
    return {
        type: "ResetAll"
    }
}
