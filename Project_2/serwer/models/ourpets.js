module.exports = (sequelize, DataTypes)=>{
    const ourpets = sequelize.define("ourpets", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.BLOB,
            allowNull: false
        }
    });
    return ourpets;
}