const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeeController");
const ROLE_LISTS = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(
    verifyRoles(ROLE_LISTS.Admin, ROLE_LISTS.Editor),
    employeesController.createNewEmployee
  )
  .put(
    verifyRoles(ROLE_LISTS.Admin, ROLE_LISTS.Editor),
    employeesController.updateEmployee
  )
  .delete(verifyRoles(ROLE_LISTS.Admin), employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
