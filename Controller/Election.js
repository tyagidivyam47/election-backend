const Election = require("../Models/Election");

exports.createElection = async (req, res, next) =>{
    try {
        console.log("Request Body : ",req.body)
        const className = req.body.class;
        const post = req.body.post;
        const candidates = req.body.candidates;
        const session = req.body.session;

        const elecObj = {
            className,
            post,
            candidates,
            session,
            status:"CREATED",
            result:null
        }

        const election = new Election(elecObj);

        election.save()
        .then(()=>{
            Election.find()
            .then((result)=>{
                res.status(201).json({msg:"Election Created", elections:result});
            })
        })
        .catch((error) => {
            error.statusCode = 500;
            next(error)
          })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
    }
}