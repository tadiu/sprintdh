let db = require("../database/models") //traemos a sequelize
const { Op } = require("sequelize");


//objetoController
let moviesController = {

    //get, manda a la vista de create
    create: async(req,res) => {
      
        let genresPromise = db.genero.findAll();
        let actorsPromise = db.actor.findAll();
      
        Promise.all([genresPromise, actorsPromise]).then(function ([generos, actors]) {
          res.render('createMovies', {
            generos: generos,
            actors: actors,
          });
        });

        /*
        db.genero.findAll() //me trae todos los generos
            .then (function(generos) {//cuando termine
                return res.render("createMovies", {generos:generos})//retorno vista y le mando genero
            })        
          */  
    },
    
    store: (req,res) => {
       
        db.pelicula.create({
        title: req.body.title,
        awards: req.body.awards ,
        release_date: req.body.release_date ,
        genre_id: req.body.genre_id ,
        length: req.body.length ,
        rating: req.body.rating ,
       }).then(function (pelicula) {
        pelicula.addActores(req.body.actor_id);
      });

       res.redirect('/')//redirige a todas las peliculas

    },

    all: (req,res) => {
        db.pelicula.findAll()
            .then(function(peliculas) {
                res.render("listarMovies", {peliculas:peliculas})
            })
     },

     detail: (req,res) => {
        db.pelicula.findByPk(req.params.id, {
            include: [{association: "genero"}, {association: "actores"}]
        })
            .then(function(pelicula) {
                res.render("detallePelicula", {pelicula:pelicula})
            }) 

     },

     edit: (req,res) => {
         //pedidos asincronicos
        let pedidoPelicula = db.pelicula.findByPk(req.params.id, {
            include: [{ association: 'genero' }, { association: 'actores' }],
        });
        let pedidoGeneros = db.genero.findAll()
        let pedidoActores = db.actor.findAll()

        Promise.all([pedidoPelicula, pedidoGeneros, pedidoActores])
            .then(function([pelicula, generos, actors]) {
                res.render("editarPelicula", {pelicula:pelicula, generos:generos, actors: actors})
            }) //se ejecuta cuando se terminan los 2 pedidos asincronicos
     },

     change: (req,res) => {
        db.pelicula.update({
            title: req.body.title,
            awards: req.body.awards ,
            release_date: req.body.release_date ,
            genre_id: req.body.genre_id ,
            length: req.body.length ,
            rating: req.body.rating ,
           }, {
               where: {
                   id: req.params.id
               }
           });

           res.redirect("/movies/detail/" + req.params.id)
    },

    /*
    delete: async (req, res) => {
        try {
            const movie = await db.pelicula.findByPk(req.body.id);
            const actors = await db.pelicula.getActores();
            await movie.removeActores(actors);
        } catch (error) {
            console.log(error);
        }

        try {
            await db.pelicula.destroy({
                where: {
                    id: req.body.id,
                },
            });
        } catch (error) {
            console.log(error);
        }

        res.redirect('/movies');
    },
*/

    delete: (req,res) => {
        
        db.pelicula.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect("/movies")
    },

    estreno: (req,res) => {
        db.pelicula.findAll({
        order: [['release_date', 'DESC']],
            limit:5
        }).then(function(peliculas) {
                res.render("estrenos", {peliculas:peliculas})
            })
        
    },

    recomendadas: (req,res) => {

        db.pelicula.findAll({
            where: {
                rating: { [db.Sequelize.Op.gte]: 8 }
            }            
        }).then(function(peliculas) {
                    res.render("recomendadas", {peliculas:peliculas})
                })
    },

    busqueda: (req,res) => {
        res.render("search")
    },

    search: (req,res) => {
        

        db.pelicula.findAll({
            where: {
                title: { [db.Sequelize.Op.like]: ('%'+req.body.title+'%') }
            },
            order: [['release_date', 'DESC']]
            
        }).then(function(peliculas) {
                    res.render("listarMovies", {peliculas:peliculas})
                })

    }



}

//exportamoselcontroller
module.exports = moviesController;
