import React from 'react'
import {Link} from 'react-router-dom'
import {ModalConsumer} from './context'

function Modal()
{
    return(
        <ModalConsumer>
            {(object)=>{
                return(
                    <React.Fragment>
                        <div style={{position:"fixed",height:"100%",width:"100%",backgroundColor:"black",opacity:"0.8",zindex:"2"}}></div>
                        <div style={{backgroundColor:"lightgray",border:"3px solid black",position:"fixed",boxShadow:"0.3rem 0.3rem 0.3rem 0.05rem darkgray",left:"32%",top:"40%"}}>
                            <div className="container">
                                <div className="row">
                                    <div className="col text-center"><h2>{object.modalmsg}</h2></div>
                                </div>
                                <div className="row text-center">
                                    <div className="col"><Link to="/" exact strict><button className="btn btn-outline-dark" onClick={object.modaloff}>OK</button></Link></div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )    
            }}    
        </ModalConsumer>
    )
}

export default Modal;