module.exports = (sequalize, DataTypes) => {

    let alias = "genero";//nombre que sequalize nombra(como lo llamo yo)

    let cols = { //columnas de la tabla que sequalize va a leer de la db
        id: {
            type: DataTypes.INTEGER, //tipo de dato de la columna
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        ranking: {
            type: DataTypes.INTEGER
        },
        active: {
            type: DataTypes.INTEGER
        }

    }

    let config = {
        tableName: "genres",  //nombre de la tabla
        timestamps: false     
    }
   
    //defino el modelo con lo declarado arriba
    const genero = sequalize.define(alias, cols, config);
    
    //declaro las asociaciones
    genero.associate = function(models) { //recibe los modelos que creamos 
    
        genero.hasMany(models.pelicula, { //(del genero pido muchas peliculas)
            //armamos la relacion
            as: "peliculas",  //la llamamos asi 
            foreignKey: "genre_id" //la columna de la bdd que relaciona estas 2 tablas

        }) //1 a m, genero tiene muchas peliculas
    
    }



    return genero;
}