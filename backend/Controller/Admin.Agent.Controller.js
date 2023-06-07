const AgentModel = require("../Models/AgentModel");

let getAllAgentUser = (req, res) => {
    AgentModel.find({})
    .then(agents => {
        if(agents.length !== 0){
            res.status(200).json({ Success: true, Message: "Succefully got agents", agents:agents });
        }
        else{
            res.status(200).json({ Success: false, Message: "No agents exist in db" });
        }
    })
    .catch(err => {
        res.status(400).json({ Success: false, Message: "Could not get agent users",err:err });
    })
}

let getByNameAgentUser = (req, res) => {

    let {fname} = req.body;

    let filter = {fname: fname};

    AgentModel.find(filter)
    .then(agent => {
        if(agent.length !== 0){
            res.status(200).json({ Success: true, Message: "Succefully got agent", agent:agent });
        }
        else{
            res.status(200).json({ Success: false, Message: "No agent exist in db" });
        }
    })
    .catch(err => {
        res.status(400).json({ Success: false, Message: "Could not get agent",err:err });
    })
}


let updateAgentUser = (req, res) => {

    let {username, fname, lname, email, password, contactNo} = req.body;

    let filter = {username: username};
    let update = {fname: fname, lname:lname, email: email, password:password, contactNo:contactNo};


    AgentModel.updateOne(filter, update)
    .then((agent) => {
        if(agent.modifiedCount > 0){
            res.status(200).json({Success: true, message: "Agent Successfully updated", agent: agent });
        }
        else{
            res.status(400).json({Success: false, message: "No such agent exist in db" });
        }

      
    })
    .catch((err) => {
      res.status(400).json({ error: err, message: "Agent not Update", Success: false });
    });
}

let banAgentUser = (req, res) => {
    let {username} = req.body;

    let filter = {username: username};

    AgentModel.findOne(filter)
    .then(user => {

        let update = {ban: !user.ban};
        AgentModel.updateOne(filter, update)
        .then((agent) => {
            res
              .status(200)
              .json({Success: true, message: "Agent ban status updated", agent: agent });
          })
          .catch((err) => {
            res.status(400).json({Success: false, error: err, message: "Agent ban status not updated " });
          });
    })
    .catch(err => {
        res.status(400).json({ Success: false, Message: "Could not get project users", err:err });
    })    
}


let deleteAgentUser = (req, res) => {

    let {username} = req.body;
    
    console.log(username)

    let filter = {username: username};

    AgentModel.deleteOne(filter)
    .then((agent) => {
        if(agent.deletedCount > 0){
            res.status(200).json({ Success: true, Message: "Successfully deleted agent user" });
        }
        else{
            res.status(400).json({ Success: false, Message: "No such agent exist in db"});
        }
        
    })
    .catch(err => {
        res.status(400).json({ Success: false, Message: "Could not delete agent user", err:err});
    })
}

module.exports = {
    getAllAgentUser,
    getByNameAgentUser,
    deleteAgentUser,
    updateAgentUser,
    banAgentUser
}