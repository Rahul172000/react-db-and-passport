import React from 'react'
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'
import {ModalConsumer} from "./context"
axios.defaults.withCredentials=true;

class Login extends React.Component
{
    constructor()
    {
        super();
        this.state={
            username:"",
            password:"",
            info:"",
            redirect:false
        }
        this.assignuser=null;
        this.changehandler=this.changehandler.bind(this);
        this.clickhandler=this.clickhandler.bind(this);
    }

    changehandler(event)
    {
        let {name,value}=event.target
        this.setState({[name]:value})
    }

    clickhandler(assignuser)
    {
        //make the get request and then go to private page
        axios.post('http://localhost:2000/login',this.state,{withCredentials:true,headers:{"Content-Type":"application/json"}})
        .then((res)=>{
            //console.log(res)
            if(res.data.user!==null)
            {
                this.setState({info:""})
                assignuser(res.data.user)
                this.setState({redirect:true})
            }
            else
            {
                this.setState({info:res.data.message})
            }
        })
        .catch((err)=>{console.log("error="+err);})
    }

    render()
    {
        if(this.state.redirect===true)
        {
            return(
                <Redirect to='/profile' exact strict/>
            )
        }
        return(
            <ModalConsumer>
                {(object)=>{
                    this.assignuser=object.assignuser
                    console.log(object.userloggedin)
                    return(
                        <div className="text-center">
                            <input type="text" placeholder="YOUR USERNAME" name="username" onChange={this.changehandler}/>
                            <br/><br/>
                            <input type="password" placeholder="password" name="password" onChange={this.changehandler}/>
                            <br/>
                            {this.state.info}
                            <br/><br/>
                            <button className="btn btn-outline-dark" onClick={()=>{this.clickhandler(object.assignuser)}}>LOGIN</button>
                            <br/><br/>
                            <Link to="/" strict exact><button className="btn btn-outline-primary">CANCEL AND BACK TO HOME</button></Link>
                        </div>
                    )
                }}
            </ModalConsumer>
        )
    }
}

export default Login;