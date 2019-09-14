import React from 'react'
import {ModalConsumer} from './context'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Modal from './modal'

class Profile extends React.Component
{
    constructor()
    {
        super();
        this.logout=this.logout.bind(this)
    }

    logout(callbackmodal,value,user)
    {
        if(user.username==='GUEST' && user.password==="GUEST")
        {return callbackmodal("LOGGED OUT..FOR SAVING ACCOUNT PLEASE SIGNUP")}
        axios.post('http://localhost:2000/save',{value:value},this.state,{withCredentials:true,headers:{"Content-Type":"application/json"}})
        .then(()=>{
            axios.get('http://localhost:2000/logout')
            .then((res)=>{callbackmodal("SAVED AND LOGGED OUT BYE!!!!")})
            .catch((err)=>{callbackmodal(err)})
        })
        .catch((err)=>{throw err;})
    }



    render()
    {
        return(
            <ModalConsumer>
                {(object)=>{
                    console.log('herererree')
                    console.log(object.userloggedin)
                    if(object.userloggedin===null)
                    {return(
                        <React.Fragment>
                            <h3 className="text-center">PLEASE LOGIN FIRST</h3>
                            <br/>
                            <h4 className="text-center"><Link to='/login' exact strict>GO TO LOGIN PAGE</Link></h4>
                        </React.Fragment>
                    )}
                    else
                    {
                        //this.construct(object.userloggedin);
                        //this.setState({value:object.userloggedin.value})
                        return(
                            <React.Fragment>
                                {object.modalstat?<Modal/>:null}
                                    <div className='text-center'><h1>HOLA {object.userloggedin.username}</h1></div>
                                    <br/><br/>
                                    <div className="text-center"><h1>{object.value}</h1></div>
                                    <br/>
                                    <div className='text-center'><button className="btn btn-outline-info" onClick={object.increase}>INCREASE 1</button></div>
                                    <div className='text-center'><button className="btn btn-outline-info" onClick={object.decrease}>DECREASE 1</button></div>
                                    <br/>
                                    <div className="text-center">
                                        <button className="btn btn-outline-danger" onClick={()=>{this.logout(object.modalon,object.value,object.userloggedin)}}>LOGOUT</button>
                                    </div>
                            </React.Fragment>
                        )
                    }
                }}
            </ModalConsumer>
        )
    }
}

export default Profile;