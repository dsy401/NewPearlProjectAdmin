const localClientReducer = (state=[],action) =>{
    switch (action.type) {
        case "setData":
            return action.payload
        default:
            return state
    }
}

export default localClientReducer
