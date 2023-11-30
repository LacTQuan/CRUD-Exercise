const controller = {};
const models = require("../models");

controller.show = async (req, res) => {
  res.locals.users = await models.User.findAll({
    attributes: [
      "id",
      "imagePath",
      "username",
      "firstName",
      "lastName",
      "mobile",
      "isAdmin",
    ],
    order: [["createdAt", "DESC"]],
  });
  res.render("user-management");
};

controller.addUser = async (req, res) => {
  const { username, firstName, lastName, mobile, isAdmin } = req.body;
  try {

    await models.User.create({
      username,
      firstName,
      lastName,
      mobile,
      isAdmin: isAdmin ? true : false,
    });
    res.redirect("/users");
  }
  catch (err) {
    res.send("Can not add user!");
    console.log(err);
  }
};

controller.editUser = async (req, res) => {
  const { id, username, firstName, lastName, mobile, isAdmin } = req.body;
  try {
    await models.User.update(
      {
        firstName,
        lastName,
        mobile,
        isAdmin: isAdmin ? true : false,
      },
      { where: { id } }
    );
    res.status(200);
    res.send("User updated");
  } catch (err) {
    res.status(500);
    res.send("Can not edit user!");
    console.log(err);
  }
}

controller.deleteUser = async (req, res) => {
  let id = isNaN(req.body.id) ? 0 : parseInt(req.body.id);
  try {
    await models.User.destroy({ where: { id } });
    res.status(200);
    res.send("User deleted");
  } catch (error) {
    res.status(500);
    res.send("Can not delete user!");
    console.log(err);
  }
}

module.exports = controller;
