const menuBarReducer = (state=0,action) =>{
    switch (action.type) {
        case "SetPos":
            return action.payload
        default:
            return state
    }
}

export default menuBarReducer
