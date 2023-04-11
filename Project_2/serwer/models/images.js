module.exports = (sequelize, DataTypes)=>{
    const images = sequelize.define("images", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.BLOB,
            allowNull: false
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return images;
}