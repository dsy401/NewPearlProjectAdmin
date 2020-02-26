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
    CHANGEPASSWORD:(id)=>{
        return HOST + '/api/change_password/' +id
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
    },
    AddNews: HOST + '/api/news',
    GetNews: HOST + '/api/news',
    DeleteNews: (id) =>{
        return HOST + '/api/news/' + id
    },
    GetsNewsContent: (id) =>{
        return HOST + '/api/news/' +id
    },
    UpdateNews: HOST + '/api/news',
    GetAbout: HOST + '/api/about',
    PostAbout: HOST + '/api/about',
    DeleteAbout: (id) =>{
        return HOST + '/api/about/' + id
    },
    UpdateAbout: (id) =>{
        return HOST + '/api/about/' + id
    },
    SendEmailToLocalClient: HOST + '/api/contact/local_client',
    SendTestEmailToPeople: HOST+ '/api/contact/local_client/test',
    GetLocalClientByPageNumber: (num) =>{
        return HOST+ "/api/local_client/pagination/"+ num
    },
    GetMemberByPageNumber: (num) =>{
        return HOST + '/api/member/pagination/' + num
    },
    SearchMemberByPhoneNumber: (phone) =>{
        return HOST + '/api/member/search/' + phone
    },
    AddMember: HOST + '/api/member',
    MemberSpend: (id,amount,use_point)=>{
        return HOST + '/api/member/spend/' + id + '/' + amount + '/' +use_point
    },
    GetMemberTransaction: (member_id) =>{
        return HOST + '/api/member_transaction/' + member_id
    },
    EditMember: (id)=>{
        return HOST + '/api/member/' + id
    },
    DeleteMember: (id) =>{
        return HOST + '/api/member/' + id
    }
};

export default url


