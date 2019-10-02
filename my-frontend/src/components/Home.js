import React from 'react'
import {Link} from 'react-router-dom'
import {ModalConsumer} from './context'

function Home()
{
    return(
        <ModalConsumer>
            {(object)=>{
                if(object.userloggedin===true)
                {
                    return(    
                        <React.Fragment>
                            <Link to="/login" exact strict><div className="alert alert-warning text-center">LOGIN</div></Link>
                            <br/><br/>
                            <Link to="/signup" exact strict><div className="alert alert-secondary text-center">SIGNUP</div></Link>
                            <br/><br/>
                            <Link to="/guest" exact strict><div className='alert alert-primary text-center'>GUEST</div></Link>
                            <br/><br/>
                            <a href="http://localhost:2000/auth/google"><div className='alert alert-danger text-center'>LOGIN OR SIGN UP WITH GOOGLE</div></a>
                        </React.Fragment>
                    )
                }
                else
                {
                    return(
                        <React.Fragment>
                            <Link to="/login" exact strict><div className="alert alert-success text-center">LOGIN</div></Link>
                            <br/><br/>
                            <Link to="/signup" exact strict><div className="alert alert-secondary text-center">SIGNUP</div></Link>
                            <br/><br/>
                            <Link to="/guest" exact strict><div className='alert alert-primary text-center'>GUEST</div></Link>
                            <br/><br/>
                            <a href=""><div className='alert alert-danger text-center'>LOGIN OR SIGN UP WITH GOOGLE</div></a>
                            <div className='alert alert-warning text-center'>Already logged in</div>
                        </React.Fragment>
                        
                    )
                }    
            }}    
        </ModalConsumer>
    )
}

export default Home;