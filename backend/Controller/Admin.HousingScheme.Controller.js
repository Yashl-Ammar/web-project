const ProjectProduct = require("../Models/ProjectProduct");

let getAllHousingScheme = (req, res) => {
    ProjectProduct.find({})
    .then(projectProducts => {
        if(projectProducts.length !== 0){
            res.status(200).json({ Success: true, Message: "Succefully got project products", ProjectProducts:projectProducts });
        }
        else{
            res.status(200).json({ Success: false, Message: "No such project products exist in db" });
        }
        
    })
    .catch(err => {
        res.status(400).json({ Success: false, Message: "Could not get project products", err:err });
    })
}

let getByNameHousingScheme = (req, res) => {

    let {Title} = req.body;

    let filter = {Title: Title};

    ProjectProduct.find(filter)
    .then(product => {
        if(product.length !== 0){
            res.status(200).json({ Success: true, Message: "Succefully got project users", product:product });
        }
        else{
            res.status(200).json({ Success: false, Message: "No such product exist in the db" });
        }
        
    })
    .catch(err => {
        res.status(400).json({ Success: false, Message: "Could not get project users",err:err });
    })
}


let deleteHousingScheme = (req, res) => {

    let {Title} = req.body;

    let filter = {Title: Title};

    ProjectProduct.deleteOne(filter)
    .then((HousingScheme) => {
        if(HousingScheme.deletedCount > 0){
            res.status(200).json({ Success: true, Message: "Succefully deleted project user" });
        }
        else{
            res.status(400).json({ Success: false, Message: "No such housing scheme exist in db"});
        }
        
    })
    .catch(err => {
        res.status(400).json({ Success: false, Message: "Could not delete project user", err:err});
    })
}

let updateHousingScheme = (req, res) => {
    let {Title, Description, Email, City, State, Country} = req.body;

    let filter = {Title: Title};
    let update = {Description: Description, Email:Email, City: City, State:State, Country:Country};


    ProjectProduct.updateOne(filter, update)
    .then(product => {
        if(product.modifiedCount > 0){
            res.status(200).json({ Success: true, Message: "Succefully updated project product", product:product })
        }
        else{
            res.status(400).json({ Success: false, Message: "No such product exist in db" });
        }
        
    })
    .catch(err => {
        res.status(400).json({ Success: false, Message: "Could not update project product", err:err });
    });

}

module.exports = {
    getAllHousingScheme,
    getByNameHousingScheme,
    deleteHousingScheme,
    updateHousingScheme
}