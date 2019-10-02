import React from 'react'
import axios from 'axios'
import {ModalConsumer} from './context'
import {Redirect} from 'react-router-dom'
axios.defaults.withCredentials=true;

class Googlelogin extends React.Component
{
    constructor()
    {
        super();
        this.state={
            redirect:false,
            info:''
        }
        this.assignuser=null;
    }

    componentDidMount()
    {
        /*axios.get('http://localhost:2000/auth/google',{withCredentials:true,headers:{"Content-Type":"application/json"}})
        .then((res)=>{
            console.log("2")
            if(res.data.user!==null)
            {
                let user={
                    username:res.data.user.name,
                    value:res.data.user.value,
                }
                this.assignuser(user)
                this.setState({redirect:true});
            }
            else
            {
                this.setState({info:res.data.message})
            }
        })*/
    }

    render()
    {
        return <ModalConsumer>
            {(object)=>{
                this.assignuser=object.assignuser;
                if(this.state.redirect===false)
                {return(
                    <h1 className='text-center'>
                            LOADING
                            <br/>
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </h1>
                )}
                else
                {
                    return(
                        <Redirect to='/profile' exact strict/>
                    )
                }
            }}
        </ModalConsumer>
    }
}

export default Googlelogin;