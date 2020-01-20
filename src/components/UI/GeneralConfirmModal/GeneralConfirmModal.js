import React from 'react'
import { Modal,Typography } from 'antd';

const GeneralConfirmModal = (props) =>{

    return (
        <Modal
            title={props.title}
            visible={props.visible}
            onOk={props.confirm}
            onCancel={props.hideModal}
            okText="Confirm"
            cancelText="Cancel"
            confirmLoading={props.isLoading}
        >
            <Typography.Title level={3}>{props.text}</Typography.Title>
        </Modal>
    )
}

export default GeneralConfirmModal
