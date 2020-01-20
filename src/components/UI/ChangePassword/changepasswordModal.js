import React from 'react'
import { Modal, Button,Typography } from 'antd';

const ChangepasswordModal = (props) =>{

    return (
        <Modal
            title="change password Confirmation"
            visible={props.visible}
            onOk={props.confirm}
            onCancel={props.hideModal}
            okText="Confirm"
            cancelText="Cancel"
        >
            <Typography.Title level={3}>Are sure to change password and Re-login</Typography.Title>
        </Modal>
    )
}

export default ChangepasswordModal
