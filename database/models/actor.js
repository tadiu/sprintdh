module.exports = (sequalize, DataTypes) => {

    let alias = "actor";//nombre que sequalize nombra(como lo llamo yo)

    let cols = { //columnas de la tabla que sequalize va a leer de la db
        id: {
            type: DataTypes.INTEGER, //tipo de dato de la columna
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },

    }

    let config = {
        tableName: "actors",  //nombre de la tabla
        timestamps: false     
    }
   
    //
    const actor = sequalize.define(alias, cols, config);
    
    actor.associate = function(models) { //recibe los modelos que creamos 
    
        actor.belongsToMany(models.pelicula, {  //(el actor tiene muchas peliculas y las peliculas tienen muchos actores M-M)
            //armamos la relacion
            as: "peliculas",  //la llamamos asi(del genero pido muchas peliculas)
            through: "actor_movie",//aclaramos el nombre de la tabla intermedia de la bdd
            foreignKey: "actor_id", //la columna de la bdd que relaciona estas 2 tablas
            otherKey: "movie_id", 
            timestamps: false 
        }) 
    
    }


    return actor;
}
