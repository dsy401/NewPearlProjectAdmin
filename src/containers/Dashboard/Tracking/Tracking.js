import React, {Component, Fragment} from 'react'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";


class Tracking extends Component{
    render(){
        return (
            <Fragment>
                <DashboardBody title={this.props.name}>

                </DashboardBody>
            </Fragment>
        )
    }
}

export default Tracking
