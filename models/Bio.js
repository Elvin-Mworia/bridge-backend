module.exports=(sequelize,DataTypes )=>{
    const Bio=sequelize.define("Bio",{
        
        
        UserId:{
            type:DataTypes.BLOB,
            allowNull:false,

        }
        ,
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true
        },
      
        contact:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        city:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        county:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        country:{
        type:DataTypes.STRING,
            allowNull:true,
        },
        socialmedia:{
            type:DataTypes.STRING,
            allowNull:true,

        },

        profilepicture:{
            type:DataTypes.STRING,
            allowNull:true,

        },
        

    });
   return Bio;
  }