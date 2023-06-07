const { getAllAgentUser, getByNameAgentUser, deleteAgentUser, updateAgentUser, banAgentUser } = require("../Controller/Admin.Agent.Controller");
const { getAllClientUser, getByNameClientUser, deleteClientUser, updateClientUser, banClientUser, getByEmailClientUser } = require("../Controller/Admin.Client.Controller");
const { login } = require("../Controller/Admin.Controller");
const { getAllHousingScheme, getByNameHousingScheme, deleteHousingScheme, updateHousingScheme } = require("../Controller/Admin.HousingScheme.Controller");
const { getAllProjectUser, getByNameProjectUser, deleteProjectUser, updateProjectUser, banProjectUser } = require("../Controller/Admin.ProjectUser.Controller");
const { getAllProperty, getByNameProperty, deleteProperty, updateProperty } = require("../Controller/Admin.Property.Controller");
const { verifyuserloggedIn } = require("../Middleware/authentication");

const router = require("express").Router();

router.post("/login", login);
router.get("/getAllProjectUser", verifyuserloggedIn, getAllProjectUser);
router.get("/getAllAgentUser", verifyuserloggedIn, getAllAgentUser);
router.get("/getAllClientUser", verifyuserloggedIn, getAllClientUser);
router.get("/getAllHousingScheme", verifyuserloggedIn, getAllHousingScheme);
router.get("/getAllProperty", verifyuserloggedIn, getAllProperty);

router.post("/getByNameAgentUser", verifyuserloggedIn, getByNameAgentUser);
router.post("/getByNameClientUser", verifyuserloggedIn, getByNameClientUser);
router.post("/getByNameHousingScheme", verifyuserloggedIn, getByNameHousingScheme);
router.post("/getByNameProjectUser", verifyuserloggedIn, getByNameProjectUser);
router.post("/getByNameProperty", verifyuserloggedIn, getByNameProperty);


router.post("/getByEmailClientUser", verifyuserloggedIn, getByEmailClientUser);

router.delete("/deleteAgentUser", verifyuserloggedIn, deleteAgentUser);
router.delete("/deleteClientUser", verifyuserloggedIn, deleteClientUser);
router.delete("/deleteHousingScheme", verifyuserloggedIn, deleteHousingScheme);
router.delete("/deleteProjectUser", verifyuserloggedIn, deleteProjectUser);
router.delete("/deleteProperty", verifyuserloggedIn, deleteProperty);

router.put("/updateAgentUser", verifyuserloggedIn, updateAgentUser);
router.put("/updateClientUser", verifyuserloggedIn, updateClientUser);
router.put("/updateHousingScheme", verifyuserloggedIn, updateHousingScheme);
router.put("/updateProjectUser", verifyuserloggedIn, updateProjectUser);
router.put("/updateProperty", verifyuserloggedIn, updateProperty);

router.post("/banAgentUser", verifyuserloggedIn, banAgentUser);
router.post("/banClientUser", verifyuserloggedIn, banClientUser);
router.post("/banProjectUser", verifyuserloggedIn, banProjectUser);

module.exports = router;