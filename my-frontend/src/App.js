import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Route from 'react-router-dom/Route'
import {Link,Switch,Redirect} from 'react-router-dom'
import Home from "./components/Home"
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/profile'
import Googlelogin from './components/googlelogin'
import {ModalConsumer} from './components/context'
import axios from 'axios'

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

class App extends React.Component
{

  constructor()
  {
    super();
    this.assignuser=null;
  }

  componentDidMount()/////to find the already logged in user each time the page reloads 
  {
      axios.get('http://localhost:2000/check',this.state,{withCredentials:true,headers:{"Content-Type":"application/json"}})
      .then((res)=>{
          console.log(res.data);
          if(res.data.user!==true)
          {this.assignuser(res.data.user);}
      })
      .catch((err)=>{throw err;})
  }

  render()
  {
    return(
      <ModalConsumer>
        {(object)=>{
          this.assignuser=object.assignuser;
          return(
            <Switch>
              <Route path="/" exact strict render={()=>{
                return <Home/>
              }}/>
              <Route path="/signup" exact strict render={()=>{
                return <Signup/>
              }}/>
              <Route path="/login" exact strict render={()=>{
                if(object.userloggedin===true)
                {return <Login/>}
                else
                {return <Redirect to='/profile' exact strict />}
              }}/>
              <Route path="/login/google" exact strict render={()=>{
                if(object.userloggedin===true)
                {return <Googlelogin/>}
                else
                {return <Redirect to='/profile' exact strict />}
              }}/>
              <Route path='/guest' exact strict render={()=>{
                if(object.userloggedin!==true)
                {return <Redirect to='/profile' exact strict />}
                else
                {
                  let user={username:"GUEST",password:"GUEST",value:0};
                  object.assignuser(user);
                  return( <Redirect to='/profile' exact strict/>)
                }
              }}/>
              {/*Route for private page which should be visible only if user is logged in*/}
              <Route path="/profile" exact strict render={()=>{
                console.log(object.userloggedin)
                if(object.userloggedin===true)
                {
                  return(
                    <React.Fragment>
                      <h2 className='text-center'>NOT LOGGED IN</h2>
                      <h3 className='text-center'><Link to='/login' exact strict>LOGIN PAGE</Link></h3>
                    </React.Fragment>
                  )
                }
                else
                {
                  return(
                    <Profile/>
                  )
                }
              }}/>
              <Route render={()=>{
                return(
                  <React.Fragment>
                    <h1 className="text-center">PAGE INVALID</h1>
                    <h2 className='text-center'><Link to="/" exact strict>GO TO HOMEPAGE</Link></h2>
                  </React.Fragment>
                )
              }}/>
            </Switch>
          )
        }}
      </ModalConsumer>
    )
  }
}

export default App;
