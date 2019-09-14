const sequelize=require('sequelize')
const db=new sequelize('kuchbhi','user','pass',{
    host:'localhost',
    dialect:'mysql',
    pool:{
        min:0,
        max:5,
    }
})

const users=db.define('table',{
    username:{
        type:sequelize.STRING,
        primaryKey:true,
        unique:true,
        allowNull:false
    },
    password:{
        type:sequelize.STRING,
        allowNull:false
    },
    value:{
        type:sequelize.INTEGER,
        defaultValue:0
    }
})

db.sync()
.then(()=>{console.log("DATABASE IS READY")})
.catch(()=>{console.log("PROBLEM STARTING THE DATABASE")})

module.exports={users};