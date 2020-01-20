/***
 *
 *统一定义接口，有利于维护
 *
 **/
import config from '../config'

const HOST = config.Host;

const url = {
    Login: HOST + '/api/login',
    GetLottery: HOST + '/api/lottery',
    DeleteLottery: (id)=>{
        return HOST + '/api/lottery/' +id
    },
    AddLottery: HOST + '/api/lottery',
    UpdateLottery: (id) =>{
        return HOST + '/api/lottery/' +id
    },
    GetWebClient: HOST + '/api/contact',
    DeleteWebClient: (id) =>{
        return HOST + '/api/contact/' + id
    },
    TokenValidate: HOST + "/api/token_validate",
    GetLocalClient: HOST + '/api/local_client',
    DeleteLocalClient: (id) =>{
        return HOST + "/api/local_client/" + id
    },
    UpdateLocalClient: (id) =>{
        return HOST + "/api/local_client/" + id
    },
    AddLocalClient: HOST + '/api/local_client',
    GetStaff: HOST + '/api/staff',
    UpdateStaff: (id) =>{
        return HOST + '/api/staff/' + id
    },
    GetBrands: HOST + '/api/brand',
    PostBrands: HOST + '/api/brand',
    GetProductCategory: HOST + '/api/product_category',
    UploadImage: HOST +'/api/upload_image',
    UpdateProductCategory: (id) => {
        return HOST + '/api/product_category/' + id
    },
    FirstProductCategory: (id) =>{
        return HOST + '/api/product_category/' + id
    },
    DeleteBrand: (id) =>{
        return HOST + '/api/brand/'+ id
    },
    UpdateBrand: (id) =>{
        return HOST + "/api/brand/" +id
    },
    GetProducts: (id) =>{
        return HOST + '/api/product/' +id
    },
    AddProduct: HOST + '/api/product',
    UpdateProduct: (id) =>{
        return HOST + '/api/product/' +id
    },
    AddStaff: HOST + '/api/staff',
    DeleteStaff: (id) =>{
        return HOST + '/api/staff/' + id
    },
    DeleteProduct: (id) =>{
        return HOST + '/api/product/' +id
    }
};

export default url


