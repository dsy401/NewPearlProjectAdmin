import {GetProductCategory} from '../../api/api'
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
