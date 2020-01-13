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
    },
    TokenValidate: HOST + "api/token_validate",
    GetLocalClient: HOST + 'api/local_client',
    DeleteLocalClient: (id) =>{
        return HOST + "api/local_client/" + id
    },
    UpdateLocalClient: (id) =>{
        return HOST + "api/local_client/" + id
    },
    AddLocalClient: HOST + 'api/local_client',
    GetStaff: HOST + 'api/staff',
    UpdateStaff: (id) =>{
        return HOST + 'api/staff/' + id
    }

};

export default url


