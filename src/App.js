import React,{Component} from 'react';
import  './App.css';
import LoginTemplate from "./containers/Login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import NotFound from "./containers/404/NotFound";
import PrivateRoute from "./components/Route/PrivateRoute";
import Dashboard from "./containers/Dashboard/Dashboard";
import Loading from "./components/common/Loading/Loading";


class App extends Component{
    render(){
        return (
            <Router>
                <Switch>
                    <Route exact path="/404" component={NotFound}/>
                    <Route path="/" exact component={Loading}/>
                    <Route path="/login" component={LoginTemplate}/>
                    <PrivateRoute path='/dashboard' component={Dashboard}/>
                    <Redirect from={"*"} to={"/404"}/>
                </Switch>
            </Router>
        )
    }
};
export default App;
