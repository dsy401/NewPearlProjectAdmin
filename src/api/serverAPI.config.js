/***
 *
 *统一定义接口，有利于维护
 *
 **/


const HOST = 'http://localhost:5000/';

const url = {
    Login: HOST + 'api/login',
    GetLottery: HOST + 'api/lottery',
    DeleteLottery: (id)=>{
        return HOST + 'api/lottery/' +id
    },
    AddLottery: HOST + 'api/lottery',
    UpdateLottery: (id) =>{
        return HOST + 'api/lottery/' +id
    },
    GetWebClient: HOST + 'api/contact',
    DeleteWebClient: (id) =>{
        return HOST + 'api/contact/' + id
    }
};

export default url


