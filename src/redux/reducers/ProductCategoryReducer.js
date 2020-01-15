const ProductCategoryReducer = (state={isLoading:false,data:[]},action) =>{
    switch (action.type) {
        case "BeforeFetchData":
            return {isLoading: true, data: []};
        case "FetchDataSuccess":
            return  {isLoading: false, data: action.payload};
        case "FetchDataFail":
            let data = state.data;
            return {isLoading: false,data: data};
        default:
            return state
    }
};

export default ProductCategoryReducer
