const router = require("express").Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');
const { find } = require("../models/Movie.model");



router.route("/movies/create")
    .get((req, res) => {
        Celebrity.find()
        .then((celebrities)=>{
            res.render( "movies/new-movie", {celebrities})
        })
        .catch((error) => console.log(error))
    })
    

    .post((req, res) => {
        //console.log("inside post");
        const title = req.body.title
        const genre = req.body.genre
        const plot = req.body.plot

        

        const cast = req.body.cast

        const movie = { title, genre, plot, cast }

        Movie.create(movie)
        .then(res.redirect('/movies'))
})


router.get("/movies", (req, res)=> {

    Movie.find()
    .populate("cast")
    .then((movie)=>{
        console.log(movie);
    
        res.render("movies/movies", {movie})
    })
})

router.get("/movies/:id", (req, res)=> {

    Movie.findById(req.params.id)
    .populate("cast")
    .then((movie)=>{
        res.render("movies/movie-details", movie)
    })
})



router.post("/movies/:id/delete", (req, res) => {
    Movie.findByIdAndDelete(req.params.id)
    .then(res.redirect("/movies"))
})

router.route("/movies/:id/edit")
.get((req, res)=> {
    let data = ""
    Movie.findById(req.params.id)
    .then((movie)=>{
    
        Celebrity.find()
        .then((celebrityFromDb)=>{
            res.render("movies/edit-movie", {movie, celebrityFromDb})
        })
    .catch((error)=>console.log(error))
    })
})    
.post((req , res)=>{

    const title = req.body.title;
    const genre = req.body.genre;
    const plot = req.body.plot;
    const cast = req.body.cast;
    const id = req.params.id
    const movie = {title, genre, plot, cast}

    Movie.findByIdAndUpdate(id, movie, {new:true})
    .then(()=> res.redirect(`movies/${id}`))
    .catch((error)=>console.log(error))
})
        
    
    
            
        
   




module.exports = router;