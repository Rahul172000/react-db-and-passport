import React from 'react'

const ModalContext=React.createContext();

class ModalProvider extends React.Component
{
    constructor()
    {
        super();
        this.state={
            modaldisp:false,
            modalmsg:"",
            userloggedin:true,
            value:0
        }
        this.turnon=this.turnon.bind(this);
        this.turnoff=this.turnoff.bind(this);
        this.assignuser=this.assignuser.bind(this)
        this.unassignuser=this.unassignuser.bind(this)
        this.increase=this.increase.bind(this)
        this.decrease=this.decrease.bind(this)
    }

    assignuser(user)
    {
        console.log('here')
        this.setState({userloggedin:user,value:user.value})
    }

    unassignuser()
    {
        this.setState({userloggedin:true})
    }

    turnon(msg)
    {
        this.setState({modaldisp:true,modalmsg:msg})
    }

    turnoff()
    {
        this.unassignuser();
        this.setState({modaldisp:false,modalmsg:""})
    }

    increase()
    {
        this.setState((prevstate)=>{
            return({
                value:prevstate.value+1
            })
        })
    }

    decrease()
    {
        this.setState((prevstate)=>{
            return({
                value:prevstate.value-1
            })
        })
    }

    render()
    {
        return(
            <ModalContext.Provider value={{
                modalstat:this.state.modaldisp,
                modalmsg:this.state.modalmsg,
                modalon:this.turnon,
                modaloff:this.turnoff,
                userloggedin:this.state.userloggedin,
                assignuser:this.assignuser,
                unassignuser:this.unassignuser,
                value:this.state.value,
                increase:this.increase,
                decrease:this.decrease
                }}>
                {this.props.children}
            </ModalContext.Provider>
        )
    }
}

const ModalConsumer=ModalContext.Consumer;
export {ModalConsumer,ModalProvider}