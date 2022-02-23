module.exports=(sequelize,DataTypes )=>{
    const IdeasBought=sequelize.define("IdeasBought",{
        
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true
        },
        customerid:{
            type:DataTypes.STRING,
            allowNull:false,

        },
       
       
        time:{
            type:DataTypes.STRING,
            allowNull:false,


        }

       

    });
   return IdeasBought;
  }