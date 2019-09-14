import React from 'react'
import Modal from "./modal"
import {ModalConsumer} from "./context"
import axios from 'axios'

class Signup extends React.Component
{
    constructor()
    {
        super();
        this.state={
            username:"",
            password:"",
            info:""
        }
        this.changehandler=this.changehandler.bind(this);
        this.clickhandler=this.clickhandler.bind(this);
    }

    changehandler(event)
    {
        let {name,value}=event.target
        this.setState({[name]:value});
    }

    clickhandler(callback)
    {
        //make post request to add the data
        //in then callback and pass the message 
        //in catch call callback and pass the error message
        axios.post('http://localhost:2000/signup',this.state,{withCredentials:true,headers:{"Content-Type":"application/json"}})
        .then((res)=>{
            //console.log(res);
            if(res.data.user!==null)
            {
                this.setState({info:""})
                callback(res.data.message);
            }
            else
            {
                this.setState({info:res.data.message})
            }
        })
        .catch((err)=>{callback(err);})
    }

    render()
    {
        return(
            <ModalConsumer>
                {(object)=>{
                    return(
                        <React.Fragment>
                            {object.modalstat?<Modal/>:null}
                            <div className="text-center">
                                <input type="text" placeholder="YOUR USERNAME" name="username" onChange={this.changehandler}/>
                                <br/><br/>
                                <input type="password" placeholder="password" name="password" onChange={this.changehandler}/>
                                <br/>
                                {this.state.info}
                                <br/><br/>
                                <button className="btn btn-outline-dark" onClick={()=>{this.clickhandler(object.modalon)}}>SUBMIT</button>
                            </div>
                        </React.Fragment>
                    )       
                }}    
            </ModalConsumer>
        )
    }
}

export default Signup;