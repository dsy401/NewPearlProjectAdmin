import React from 'react'
import {Modal} from 'antd'
const BrandDeleteModal = (props) =>{

    const handleOk = () =>{
        props.confirm(props.id)
    }

    return (
        <Modal
            title="Delete Confirmation"
            visible={props.visible}
            onOk={handleOk}
            confirmLoading={props.isLoading}
            onCancel={props.hideModal}
        >
            <p>Are u sure to delete?</p>
        </Modal>
    )
}

export default BrandDeleteModal
