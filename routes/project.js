const express = require("express")
const {getAllProjects, addProject, updateProject, deleteProject} = require("../handler/project")
const { readOnlyAccessAuthorization, allAccessAuthorization } = require("../middleware/auth")

const router = express.Router()

router.get("/", readOnlyAccessAuthorization, getAllProjects)
router.post("/", allAccessAuthorization, addProject)
router.put("/:id", allAccessAuthorization, updateProject)
router.delete("/:id", allAccessAuthorization, deleteProject)

module.exports = router