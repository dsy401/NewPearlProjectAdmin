import React, {Component, Fragment} from 'react'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import MemberList from "./MemberList/MemberList";


class Member extends Component{
    render(){
        return (
            <Fragment>
                <DashboardBody title={this.props.name}>
                    <MemberList/>
                </DashboardBody>
            </Fragment>
        )
    }
}

export default Member
