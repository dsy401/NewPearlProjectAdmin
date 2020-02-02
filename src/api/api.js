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
export const ChangePassWord=(data,id)=>{
    return server({
        url:url.CHANGEPASSWORD(id),
        method:'POST',
        data:data,
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        }
    })
}


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

export const UpdateProductCategory = (id,data) =>{
    return server({
        method: "PUT",
        url: url.UpdateProductCategory(id),
        data: data,
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        }
    })
};

export const FirstProductCategory = (id) =>{
    return server({
        method:"GET",
        url: url.FirstProductCategory(id),
    })
};

export const DeleteBrand = (id) =>{
    return server({
        method: 'DELETE',
        url: url.DeleteBrand(id),
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        }
    })
};

export const UpdateBrand = (id,data) =>{
    return server({
        method: "PUT",
        url: url.UpdateBrand(id),
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        },
        data:data
    })
};

export const GetProductsById = (id) =>{
    return server({
        method: 'GET',
        url: url.GetProducts(id)
    })
};

export const AddProduct = (data) =>{
    return server({
        method: "POST",
        data:data,
        url: url.AddProduct,
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        },
    })
};

export const UpdateProduct = (id,data)=>{
    return server({
        method: "PUT",
        data:data,
        url: url.UpdateProduct(id),
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        }
    })
}

export const AddStaff = (data) =>{
    return server({
        method: "POST",
        url: url.AddStaff,
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        },
        data:data,
    })
}

export const DeleteStaff = (id) =>{
    return server({
        method: "DELETE",
        url: url.DeleteStaff(id),
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        }
    })
}

export const DeleteProduct = (id) =>{
    return server({
        method: "DELETE",
        url: url.DeleteProduct(id),
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        }
    })
};

export const AddNews = (data) =>{
    return server({
        method:"POST",
        url: url.AddNews,
        data:data,
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        }
    })
}

export const GetNews = () =>{
    return server({
        method: "GET",
        url: url.GetNews
    })
}

export const DeleteNews = (id) =>{
    return server({
        method: "DELETE",
        url: url.DeleteNews(id),
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        }
    })
}

export const GetNewsContent = (id) =>{
    return server({
        method: "GET",
        url: url.GetsNewsContent(id),
    })
};

export const UpdateNews = (data) =>{
    return server({
        method: "PUT",
        data:data,
        url: url.UpdateNews,
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        }
    })
}

export const GetAbout = () =>{
    return server({
        method:"GET",
        url: url.GetAbout
    })
}

export const AddAbout = (data) =>{
    return server({
        method: "POST",
        url: url.PostAbout,
        data:data,
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        }
    })
}

export const DeleteAbout = (id) =>{
    return server({
        method: "DELETE",
        url: url.DeleteAbout(id),
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        }
    })
}

export const UpdateAbout = (id,data) =>{
    return server({
        method: "PUT",
        url: url.UpdateAbout(id),
        data: data,
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        }
    })
}

export const SendEmailToLocalClient = (data) =>{
    return server({
        method: 'POST',
        url: url.SendEmailToLocalClient,
        data: data,
        headers: {
            Authorization: ' Basic '+ Base64Encoder(localStorage.getItem('token'))
        }
    })
}
