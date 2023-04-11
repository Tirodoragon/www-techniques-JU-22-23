module.exports = (sequelize, DataTypes)=>{
    const foundation = sequelize.define("foundation", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        web: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    return foundation;
}