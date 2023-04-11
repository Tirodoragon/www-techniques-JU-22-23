module.exports = (sequelize, DataTypes)=>{
    const qanda = sequelize.define("qanda", {
        question: {
            type: DataTypes.STRING,
            allowNull: false
        },
        answer: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });
    return qanda;
}