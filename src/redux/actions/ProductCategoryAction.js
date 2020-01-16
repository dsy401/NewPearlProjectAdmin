import {GetProductCategory,UpdateProductCategory} from '../../api/api'
export const FetchProductCategory = () =>{
    return (dispatch)=>{
        dispatch({
            type: "BeforeFetchData"
        });

        GetProductCategory().then(res=>{
            return dispatch({
                type: "FetchDataSuccess",
                payload: res.data
            })
        }).catch(err=>{
            console.log(err)
            return dispatch({
                type: "FetchDataFail"
            })
        })
    }
}

export const UpdateAndFetchProductCategory = (id,data,cb) =>{
    return dispatch=>{
        dispatch({
            type: "BeforeFetchData"
        });
        UpdateProductCategory(id,data).then(res=>{
            dispatch({
                type: "FetchDataSuccess",
                payload: res.data
            })

            cb()
        }).catch(err=>{
            console.log(err)
            dispatch({
                type: "FetchDataFail"
            })
        })
    }
};
