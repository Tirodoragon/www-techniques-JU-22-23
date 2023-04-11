module.exports = (sequelize, DataTypes)=>{
    const users = sequelize.define("users", {
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isSupervisor: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
    return users;
}