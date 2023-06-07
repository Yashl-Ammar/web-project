const ClientModel = require("../Models/ClientModel");

let getAllClientUser = (req, res) => {
    ClientModel.find({})
    .then(clients => {
        if(clients.length !== 0){
            res.status(200).json({ Success: true, Message: "Succefully got client", clients:clients });
        }
        else{
            res.status(200).json({ Success: false, Message: "No clients exist in db" });
        }
    })
    .catch(err => {
        res.status(400).json({ Success: false, Message: "Could not get clients",err:err });
    })
}


let getByNameClientUser = (req, res) => {

    let {name} = req.body;

    let filter = {name: name};

    ClientModel.find(filter)
    .then(client => {
        if(client.length !== 0){
            res.status(200).json({ Success: true, Message: "Succefully got client", client:client });
        }
        else{
            res.status(200).json({ Success: false, Message: "No clients with this name in db" });
        }
    })
    .catch(err => {
        res.status(400).json({ Success: false, Message: "Could not get client",err:err });
    })
}

let getByEmailClientUser = (req, res) => {

    let {email} = req.body;

    let filter = {email: email};

    ClientModel.find(filter)
    .then(client => {
        if(client.length !== 0){
            res.status(200).json({ Success: true, Message: "Succefully got client", client:client });
        }
        else{
            res.status(400).json({ Success: false, Message: "No clients with this name in db" });
        }
    })
    .catch(err => {
        res.status(400).json({ Success: false, Message: "Could not get client",err:err });
    })
}


let updateClientUser = (req, res) => {

    let {email, name, contactNo, password, address} = req.body;

    let filter = {email: email};
    let update = {name: name, contactNo:contactNo, password: password, address:address};


    ClientModel.updateOne(filter, update)
    .then((client) => {
        if(client.modifiedCount > 0){
            res.status(200).json({ message: "Client Successfully updated", client: client });
        }
        else{
            res.status(400).json({message: "No such Client exist in db" });
        }

      
    })
    .catch((err) => {
      res.status(400).json({ error: err, message: "Client not Update" });
    });
}

let banClientUser = (req, res) => {
    let {email} = req.body;

    let filter = {email: email};

    ClientModel.findOne(filter)
    .then(user => {

        let update = {ban: !user.ban};
        ClientModel.updateOne(filter, update)
        .then((client) => {
            res
              .status(200)
              .json({ message: "Client ban status updated", client: client });
          })
          .catch((err) => {
            res.status(400).json({ error: err, message: "Client ban status not updated " });
          });
    })
    .catch(err => {
        res.status(400).json({ Success: false, Message: "Could not get clients", err:err });
    })    
}


let deleteClientUser = (req, res) => {

    let {email} = req.body;

    let filter = {email: email};

    ClientModel.deleteOne(filter)
    .then((client) => {
        if(client.deletedCount > 0){
            res.status(200).json({ Success: true, Message: "Succefully deleted project user" });
        }
        else{
            res.status(400).json({ Success: false, Message: "No such client exist in db"});
        }
        
    })
    .catch(err => {
        res.status(400).json({ Success: false, Message: "Could not delete project user", err:err});
    })
}

module.exports = {
    getAllClientUser,
    getByNameClientUser,
    updateClientUser,
    banClientUser,
    deleteClientUser,
    getByEmailClientUser
}