const ProjectUser = require("../Models/ProjectUser");

let getAllProjectUser = (req, res) => {
    ProjectUser.find({})
    .then(prusers => {
        if(prusers.length !== 0){
            res.status(200).json({ Success: true, Message: "Succefully got project users", ProjectUsers:prusers });
        }
        else{
            res.status(200).json({ Success: false, Message: "No properties exist in db" });
        }
        
    })
    .catch(err => {
        res.status(400).json({ Success: false, Message: "Could not get project users",err:err });
    })
}

let getByNameProjectUser = (req, res) => {

    let {Name} = req.body;

    let filter = {Name: Name};

    ProjectUser.find(filter)
    .then(pruser => {
        if(pruser.length !== 0){
            res.status(200).json({ Success: true, Message: "Succefully got project users", ProjectUser:pruser });
        }
        else{
            res.status(200).json({ Success: false, Message: "No such project users exist in the db" });
        }
        
    })
    .catch(err => {
        res.status(400).json({ Success: false, Message: "Could not get project users",err:err });
    })
}

let updateProjectUser = (req, res) => {

    let {Email, Name, Password, AccountNumber} = req.body;

    let filter = {Email: Email};
    let update = {Name: Name, Password:Password, AccountNumber: AccountNumber};

    ProjectUser.updateOne(filter, update)
    .then(projectuser => {
        if(projectuser.modifiedCount > 0){
            res.status(200).json({ Success: true, Message: "Succefully updated project user", projectuser:projectuser })
        }
        else{
            res.status(400).json({ Success: false, Message: "No such project user exist in db" });
        }
        
    })
    .catch(err => {
        res.status(400).json({ Success: false, Message: "Could not update project users", err:err });
    });
}

let banProjectUser = (req, res) => {
    let {Email} = req.body;

    let filter = {Email: Email};

    ProjectUser.findOne(filter)
    .then(user => {

        let update = {ActiveStatus: !user.ActiveStatus};
        ProjectUser.updateOne(filter, update)
        .then(pruser => {
            res.status(200).json({ Success: true, Message: "Succefully banned project users", user:pruser });
        })
        .catch(err => {
            res.status(400).json({ Success: false, Message: "Could not ban project users", err:err });
        })
    })
    .catch(err => {
        res.status(400).json({ Success: false, Message: "Could not get project users", err:err });
    })    
}


let deleteProjectUser = (req, res) => {

    let {Email} = req.body;

    let filter = {Email: Email};
    console.log(Email);
    ProjectUser.deleteOne(filter)
    .then((projectuser) => {
        if(projectuser.deletedCount > 0){
            res.status(200).json({ Success: true, Message: "Succefully deleted project user" });
        }
        else{
            res.status(400).json({ Success: false, Message: "No such project user exist in db"});
        }
       
    })
    .catch(err => {
        res.status(400).json({ Success: false, Message: "Could not delete project user", err:err});
    })
}


module.exports = {
    getAllProjectUser,
    getByNameProjectUser,
    updateProjectUser,
    banProjectUser,
    deleteProjectUser
}