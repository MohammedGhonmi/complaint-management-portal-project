const express = require("express");
const ROLE = require("../role");
const { authUser, authRole } = require("../basicAuth");
const complaintController = require("../controllers/complaint");

const router = express.Router();

// CRUD api's related to complaints
router.get("/", authUser, complaintController.getAll);
router.post("/", authUser, authRole(ROLE.CUSTOMER), complaintController.create);
router.get("/:complaintId", authUser, complaintController.getOne);
router.put(
  "/:complaintId",
  authUser,
  authRole(ROLE.ADMIN),
  complaintController.edit
);

module.exports = router;
