module.exports=(sequelize,DataTypes )=>{
    const Pitch=sequelize.define("Pitch",{
        
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true
        },
        
        entreprenuer:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        pitch:{
            type:DataTypes.STRING,
            allowNull:false,

        }
        ,
        time:{
            type:DataTypes.STRING,
            allowNull:false,
            
            
           },
    });
   return Pitch;
  }