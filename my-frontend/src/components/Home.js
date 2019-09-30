import React from 'react'
import {Link} from 'react-router-dom'

function Home()
{
    return(
        <React.Fragment>
            <Link to="/login" exact strict><div className="alert alert-warning text-center">LOGIN</div></Link>
            <br/><br/>
            <Link to="/signup" exact strict><div className="alert alert-secondary text-center">SIGNUP</div></Link>
            <br/><br/>
            <Link to="/guest" exact strict><div className='alert alert-primary text-center'>GUEST</div></Link>
            <br/><br/>
            <Link to="/login/google" exact strict><div className='alert alert-danger text-center'>LOGIN OR SIGN UP WITH GOOGLE</div></Link>
        </React.Fragment>
    )
}

export default Home;