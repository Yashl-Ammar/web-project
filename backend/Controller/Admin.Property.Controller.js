const PropertyModel = require("../Models/PropertyModel");

let getAllProperty = (req, res) => {
    PropertyModel.find({})
    .then(properties => {
        if(properties.length !== 0){
            res.status(200).json({ Success: true, Message: "Succefully got properties", Properties:properties });
        }
        else{
            res.status(200).json({ Success: false, Message: "No properties in the db"});
        }
        
    })
    .catch(err => {
        res.status(400).json({ Success: false, Message: "Could not get properties", err:err });
    })
}

let getByNameProperty = (req, res) => {

    let {Title} = req.body;

    let filter = {Title: Title};

    PropertyModel.find(filter)
    .then(property => {
        if(property.length !== 0){
            res.status(200).json({ Success: true, Message: "Succefully got property", property:property });
        }
        else
        {
            res.status(200).json({ Success: false, Message: "No such property exist in db"});
        }
        
    })
    .catch(err => {
        res.status(400).json({ Success: false, Message: "Could not get property",err:err });
    })
}

let deleteProperty = (req, res) => {

    let {Title} = req.body;

    let filter = {Title: Title};

    PropertyModel.deleteOne(filter)
    .then((prop) => {
        if(prop.deletedCount > 0){
            res.status(200).json({ Success: true, Message: "Succefully deleted property" });
        }
        else{
            res.status(400).json({ Success: false, Message: "No such property exist in db"});
        }
        
    })
    .catch(err => {
        res.status(400).json({ Success: false, Message: "Could not delete property", err:err});
    })
}

let updateProperty = (req, res) => {
    let {Title, description, purpose, propertytype, city, location, Area, length, width, email, mobileNo, landline} = req.body;

    let filter = {Title: Title};
    let update = {description: description, purpose:purpose, propertytype: propertytype, city:city, location:location, Area:Area, length:length, width:width, email:email, mobileNo:mobileNo, landline:landline};


    PropertyModel.updateOne(filter, update)
    .then(property => {
        if(property.modifiedCount > 0){
            res.status(200).json({ Success: true, Message: "Succefully updated property", property:property })
        }
        else{
            res.status(400).json({ Success: false, Message: "No such property exist in db"});
        }
    })
    .catch(err => {
        res.status(400).json({ Success: false, Message: "Could not update property", err:err });
    });

}

module.exports = {
    getAllProperty,
    getByNameProperty,
    deleteProperty,
    updateProperty
}