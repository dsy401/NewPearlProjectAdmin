import server from './server'
import url from './serverAPI.config'
import {Base64Encoder} from '../utils/Base64Encoder'

//Login
export const Login = (data) =>{
    return server({
        url: url.Login,
        method: "POST",
        data :data
    })
};


export const GetLottery = () =>{
    return server({
        url: url.GetLottery,
        method: 'GET',
    })
}

export const DeleteLottery = (id) =>{
    return server({
        url: url.DeleteLottery(id),
        method: "DELETE",
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        }
    })
};

export const AddLottery = (data) =>{
    return server({
        url: url.AddLottery,
        method: "POST",
        data: data,
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        }
    })
};

export const UpdateLottery = (id,data) =>{
    return server({
        url: url.UpdateLottery(id),
        method: "PUT",
        data: data,
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        }
    })
};

export const GetWebClient = () =>{
    return server({
        url: url.GetWebClient,
        method: "GET",
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        }
    })
};

export const DeleteWebClient = (id) =>{
    return server({
        url: url.DeleteWebClient(id),
        method: "Delete",
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        }
    })
};

export const TokenValidate = () =>{
    return server({
        url: url.TokenValidate,
        method: "GET",
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        }
    })
}
