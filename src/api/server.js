import axios from 'axios';

//取消请求
// let CancelToken = axios.CancelToken
axios.create({
    timeout: 15000 ,// 请求超时时间
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
});

//拦截请求
axios.interceptors.request.use(config=>{
    // let requestName = config.url;
    // if(requestName) {
    //     if(axios[requestName]&&axios[requestName].cancel){
    //         axios[requestName].cancel()
    //     }
    //     config.cancelToken = new CancelToken(c => {
    //         axios[requestName] = {};
    //         axios[requestName].cancel = c
    //     })
    // }
    return config
},error=>{
    return Promise.reject(error)
});



axios.interceptors.response.use(
    response=>{
        const res = response.data;

        return res
    }

,error => {
        return Promise.reject(error.response.data)
    });



export default axios
