import React, {Fragment, useEffect, useState} from 'react'
import {Button, Descriptions,Input} from "antd";
import moment from "moment";
import GeneralConfirmModal from "../../UI/GeneralConfirmModal/GeneralConfirmModal";
import {AddPointToMember, UsePointToMember} from "../../../api/api";
import {withRouter} from 'react-router-dom'

const MemberDescription = (props) =>{
    const [text,SetText] = useState("");
    const [ConfirmModalVisible,SetConfirmModalVisible] = useState(false);
    const [isLoading,SetIsLoading] = useState(false);
    const [points,SetPoints] = useState(0);

    const onChange = (e) =>{
        SetPoints(e.target.value)
    };


    const finalConfirmHandler = () =>{
        if (text === "Add Point"){
            AddPointToMember(props.MemberData.key,points).then(res=>{
                alert("success");
                SetConfirmModalVisible(false)
                props.OnCloseHandler()
            }).catch(err=>{
                console.log(err);
            })
        }

        if (text==="Use Point"){
            UsePointToMember(props.MemberData.key,points).then(res=>{
                alert("success");
                SetConfirmModalVisible(false)
                props.OnCloseHandler()
            }).catch(err=>{
                SetConfirmModalVisible(false)
                alert(err.error_message)
            })
        }
    };

    return (
        <Fragment>
            <Descriptions
                title={props.title}
                bordered
                column={1}
            >
                <Descriptions.Item label="name">{props.MemberData.name}</Descriptions.Item>
                <Descriptions.Item label="email">{props.MemberData.email}</Descriptions.Item>
                <Descriptions.Item label="address">{props.MemberData.address}</Descriptions.Item>
                <Descriptions.Item label="phone">{props.MemberData.phone}</Descriptions.Item>
                <Descriptions.Item label="company">{props.MemberData.company}</Descriptions.Item>
                <Descriptions.Item label="End Date">{moment(props.MemberData.end_date).format('L')}</Descriptions.Item>
                <Descriptions.Item label="point">{props.MemberData.point}</Descriptions.Item>
                <Descriptions.Item label="Transaction"><a onClick={()=>{props.history.push('/dashboard/membertransaction/'+props.MemberData.key)}}>View</a></Descriptions.Item>
            </Descriptions>

            <Button onClick={()=>{SetText("Use Point")}} style={{marginTop: 15,marginBottom: 10}} type='primary'>Use points</Button>
            <Button onClick={()=>{SetText("Add Point")}} style={{marginTop: 15,marginLeft: 10,marginBottom: 10}} type='primary'>Add points</Button>

            <div>
                {text?<span>{text} : <Input.Search type='number' enterButton="Confirm" onChange={onChange} onSearch={()=>{SetConfirmModalVisible(true)}}/> </span>: null}
            </div>
            <GeneralConfirmModal
                title={`${text} Confirmation`}
                visible={ConfirmModalVisible}
                confirm={finalConfirmHandler}
                hideModal={()=>{SetConfirmModalVisible(false)}}
                isLoading={isLoading}
                text={`Are you sure ${text}?`}
            />
        </Fragment>
    )
};

export default withRouter(MemberDescription)
