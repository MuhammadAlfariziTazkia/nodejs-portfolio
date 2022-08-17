const express = require("express")
const {getAllProjects, addProject, updateProject, deleteProject} = require("../handler/project")

const router = express.Router()

router.get("/", getAllProjects)
router.post("/", addProject)
router.put("/:id", updateProject)
router.delete("/:id", deleteProject)

module.exports = router