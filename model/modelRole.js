module.exports = (sequelize, datatypes) =>{
    return sequelize.define("role", {
        id : {
            type : datatypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },
        role : {type : datatypes.STRING, unique : true},
    })
}