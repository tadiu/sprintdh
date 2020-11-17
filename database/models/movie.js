module.exports = (sequalize, DataTypes) => {

    let alias = "pelicula";//nombre que sequalize nombra(como lo llamo yo)

    let cols = { //columnas de la tabla que sequalize va a leer de la db
        id: {
            type: DataTypes.INTEGER, //tipo de dato de la columna
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING
        },
        rating: {
            type: DataTypes.DECIMAL
        },
        awards: {
            type: DataTypes.INTEGER
        },

        length: {
            type: DataTypes.INTEGER
        },
        genre_id: {
            type: DataTypes.INTEGER
        },
        release_date: {
            type: DataTypes.DATEONLY
        },

    }

    let config = {
        tableName: "movies",  //nombre de la tabla en la bdd
        timestamps: false     
    }
   
    //
    const movie = sequalize.define(alias, cols, config);
    
    //declaro las asociaciones
    movie.associate = function(models) { //recibe los modelos que creamos 
    
        movie.belongsTo(models.genero, { //(peliculas pertenecen a 1 genero)
            //armamos la relacion
            as: "genero",  //la llamamos asi 
            foreignKey: "genre_id" //la columna de la bdd que relaciona estas 2 tablas
        }) //1 a m, genero tiene muchas peliculas
        
        movie.belongsToMany(models.actor, {  //(peliculas tienen mucho actores y muchos actores estan en peliculas M-M)
            //armamos la relacion
            as: "actores",  
            through: "actor_movie",
            foreignKey: "movie_id", 
            otherKey: "actor_id", 
            timestamps: false 
        }) 
    

    }

    return movie;
}


//Modulo que es una funcion que recibe una conexion de sequelize y datatypes, y envia una variable que define un modelo y cada una de sus columnas en la BDD.
//(Sequelize por detras va marcheando columna por columna)
//tambien asociamos de otras tablas por si usan