module.exports=(sequelize,DataTypes )=>{
    const Ideas=sequelize.define("Ideas",{
        
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true
        },
        
        
        pitch:{
            type:DataTypes.STRING,
            allowNull:false,

        },
        pitcherid:{
            type:DataTypes.STRING,
            allowNull:true,

        },
        
        price:{
         type:DataTypes.INTEGER,
         allowNull:false,
         defaultValue:0
         
        },
        time:{
            type:DataTypes.STRING,
            allowNull:false,


        },

        bought:{
            type:DataTypes.BOOLEAN,
            defaultValue:false

        }

    });
   return Ideas;
  }
  