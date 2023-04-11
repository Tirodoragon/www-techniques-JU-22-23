module.exports = (sequelize, DataTypes)=>{
    const messages = sequelize.define("messages", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mess: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    return messages;
}