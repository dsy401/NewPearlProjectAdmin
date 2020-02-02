import React from 'react'
import {Modal} from "antd";


const ProductPreviewModal = (props) =>{
    return (
        <Modal
            title={'Image Preview'}
            visible={props.visible}
            onCancel={props.hideModal}
            onOk={props.hideModal}
        >
            {props.image?(
                props.image.map(s=>{
                    return <a href={s}><img style={{width: 300,height:300}} src={s} alt=""/></a>
                })
            ):null}
        </Modal>
    )
};

export default ProductPreviewModal
