import React,{Component} from 'react';

const ComponentWithParameter = (Wrapper,method,pos,name) =>{
    return class extends Component{

        componentDidMount = () =>{
            method(pos)
        }

        render(){
            return (
                <Wrapper
                    {...this.props}
                    name={name}
                />
            )
        }
    }
};


export default ComponentWithParameter
