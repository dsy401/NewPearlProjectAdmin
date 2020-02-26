import React, {Fragment, useEffect, useState} from 'react'
import {Button, Descriptions,Input,Row,Col} from "antd";
import moment from "moment";
import GeneralConfirmModal from "../../UI/GeneralConfirmModal/GeneralConfirmModal";
import {MemberSpend} from "../../../api/api";
import {withRouter} from 'react-router-dom'
import {MemberLevelConverter} from "../../../utils/MemberLevelConverter";

const MemberDescription = (props) =>{
    const [text,SetText] = useState("");
    const [ConfirmModalVisible,SetConfirmModalVisible] = useState(false);
    const [isLoading,SetIsLoading] = useState(false);
    const [amount,SetAmount] = useState(0);
    const [point,SetPoint] = useState(0)
    const onChange = (e) =>{
        SetAmount(e.target.value)
    };

    const onPointChange = (e)=>{
        SetPoint(e.target.value)
    }


    const finalConfirmHandler = () =>{
        MemberSpend(props.MemberData.key,amount,point).then(res=>{
            alert("success");
            SetConfirmModalVisible(false)
            props.OnCloseHandler()
        }).catch(err=>{
            console.log(err);
        })
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
                <Descriptions.Item label='Level'>{props.MemberData.member_level}</Descriptions.Item>
                <Descriptions.Item label="point">{props.MemberData.point}</Descriptions.Item>
                <Descriptions.Item label="Total Cost">${props.MemberData.total_consumption}</Descriptions.Item>
                <Descriptions.Item label="Transaction"><a onClick={()=>{props.history.push('/dashboard/membertransaction/'+props.MemberData.key)}}>View</a></Descriptions.Item>
            </Descriptions>

            <Button onClick={()=>{SetText("Spend(消费)")}} style={{marginTop: 15,marginBottom: 10}} type='primary'>Spend(消费)</Button>

            <div>
                {text?
                    <span>
                        <Row>
                            <Col style={{marginRight: 5}} span={4}>
                                <Input type='number' value={point} min={0} max={props.MemberData.point} onChange={onPointChange} placeholder="积分"/>
                            </Col>
                            <Col span={16}>
                                <Input.Search min={0} placeholder='消费金额...' type='number' enterButton="Confirm" onChange={onChange} onSearch={()=>{SetConfirmModalVisible(true)}}/>
                            </Col>
                        </Row>
                    </span>
                    : null}
            </div>
            <GeneralConfirmModal
                title={`${text} Confirmation`}
                visible={ConfirmModalVisible}
                confirm={finalConfirmHandler}
                hideModal={()=>{SetConfirmModalVisible(false)}}
                isLoading={isLoading}
                text={`实际付款金额 $${Number(amount) - Number(point)}`}
            />
        </Fragment>
    )
};

export default withRouter(MemberDescription)
