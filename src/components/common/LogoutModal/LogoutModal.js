import React from 'react'
import { Modal, Button,Typography } from 'antd';

const LogoutModal = (props) =>{

    return (
        <Modal
            title="Modal"
            visible={props.visible}
            onOk={props.confirm}
            onCancel={props.hideModal}
            okText="Confirm"
            cancelText="Cancel"
        >
            <Typography.Title level={3}>Are sure to log out</Typography.Title>
        </Modal>
    )
}

export default LogoutModal
