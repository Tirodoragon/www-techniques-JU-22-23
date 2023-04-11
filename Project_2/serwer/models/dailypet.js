module.exports = (sequelize, DataTypes)=>{
    const dailypet = sequelize.define("dailypet", {
        login: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return dailypet;
}