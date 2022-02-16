const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

router.route("/celebrities/create")
    .get((req, res) => {
        res.render("celebrities/new-celebrity")
    })
    .post((req, res) => {
        //console.log("inside post");
        const name = req.body.name
        const occupation = req.body.occupation
        const catchPhrase = req.body.catchPhrase

        const celebrity = { name, occupation, catchPhrase }

        Celebrity.create(celebrity)
        .then(res.redirect('/celebrities'))
    })

router.get("/celebrities", (req, res)=> {

    Celebrity.find()
    .then((celebrity)=>{
        res.render("celebrities/celebrities", {celebrity})
    })
})


    
module.exports = router