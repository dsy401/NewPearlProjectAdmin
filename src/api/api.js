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
};

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
};

export const GetLocalClient = () =>{
    return server({
        url: url.GetLocalClient,
        method: "GET",
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        }
    })
};

export const DeleteLocalClient =(id) =>{
    return server({
        url: url.DeleteLocalClient(id),
        method: "DELETE",
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        }
    })
}

export const UpdateLocalClient = (id,data) =>{
    return server({
        url: url.UpdateLocalClient(id),
        method: "PUT",
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        },
        data:data
    })
};

export const AddLocalClient = (data) =>{
    return server({
        url: url.AddLocalClient,
        method: "POST",
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        },
        data:data
    })
};

export const GetStaff = () =>{
    return server({
        url: url.GetStaff,
        method: "GET",
    })
};

export const UpdateStaff = (id,data) =>{
    return server({
        url: url.UpdateStaff(id),
        method: 'PUT',
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        },
        data:data
    })
};

export const GetBrands = () =>{
    return server({
        url: url.GetBrands,
        method:"GET",
    })
};

export const PostBrands = (data) =>{
    return server({
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        },
        url: url.PostBrands,
        method: "POST",
        data: data
    })
};

export const GetProductCategory = () =>{
    return server({
        method: "GET",
        url: url.GetProductCategory
    })
};

export const UploadImage = () =>{
    return url.UploadImage
}
