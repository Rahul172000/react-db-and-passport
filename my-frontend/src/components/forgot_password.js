import React from 'react'
import axios from 'axios'
import Modal from './modal'
import {ModalConsumer} from './context'
axios.defaults.withCredentials=true;

class Forgot_password extends React.Component
{
    constructor()
    {
        super();
        this.state={
            user:null,
            username:"",
            email:"",
            message1:"",
            waitingemail:false
        }
        this.onchange=this.onchange.bind(this);
        this.usernameclickhandler=this.usernameclickhandler.bind(this);
        this.emailhandler=this.emailhandler.bind(this);
    }

    emailhandler(callback)
    {
        this.setState({waitingemail:true})
        axios.post('http://localhost:2000/sendingpass',{email:this.state.email,user:this.state.user})
        .then((res)=>{
            if(res.data.success===true)
            {
                console.log("details:"+res.data.msg);
                this.setState({message2:"YOUR PASSWORD IS SHARED VIA EMAIL",waitingemail:false})
            }
            else
            {
                console.log("error:"+res.data.msg);
                return this.setState({message2:"THERE IS A PROBLEM OCCURRING PLEASE TRY AGAIN LATER...FOR EMERGENCY USE AS A GUEST"})
            }
        })
    }

    usernameclickhandler()
    {
        this.setState({message1:"",user:null})
        axios.post('http://localhost:2000/forgot_password_user',{username:this.state.username,password:"itsuniquelydefinedandcannotbesetbyanyone(any random string)"},{withCredentials:true,headers:{"Content-Type":"application/json"}})
        //here password is passed hence the local strategy function will not be called so pass username and password both....
        .then((res)=>{
            if(res.data.user===null)
            {return this.setState({user:null,message1:res.data.message})}
            else
            {return this.setState({user:res.data.user,message1:res.data.message})}
        })
        .catch((err)=>{console.log("error:"+err);})
    }

    onchange(event)
    {
        let {value,name}=event.target;
        //console.log(value+name)
        this.setState({[name]:value})
    }

    render()
    {
        return(
            <ModalConsumer>
                {(object)=>{
                    return(
                        <React.Fragment>
                            {object.modalstat?<Modal/>:null}
                            <br/>
                            <h2 className="text-center">WE WILL SHARE YOUR PASSWORD AT YOUR EMAIL</h2>
                            <br/><br/>
                            <div className="container border border-dark rounded" style={{width:"30%"}}>
                                <br/>
                                <div className="row">
                                    <div className="col text-center"><input type="text" name="username" onChange={this.onchange} placeholder="Enter your username"/></div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col text-center"><button className="btn btn-outline-danger" onClick={this.usernameclickhandler}>SUBMIT</button></div>
                                </div>
                                <br/>
                                <div className="row"><div className="col text-center">{this.state.message1}</div></div>
                                <br/>
                                <div className="row" style={{display:this.state.user===null?"none":"block"}}>
                                    <div className="col-12 text-center"><input type="text" name="email" onChange={this.onchange} placeholder="EMAIL-id"/></div>
                                    <div className="col-12 text-center">
                                        <button onClick={()=>{this.emailhandler(object.modalon)}} className="btn btn-outline-primary" style={{marginTop:"1%"}}>SEND</button>
                                        <br/>
                                        <div className="text-center spinner-grow text-primary" style={{display:this.state.waitingemail===false?"none":""}}><span className="sr-only">Loading...</span></div>
                                    </div>
                                </div>
                                <br/>
                                <br/>
                            </div>
                        </React.Fragment>
                    )    
                }}
            </ModalConsumer>
        )
    }
}

export default Forgot_password;