const express = require("express")
const {getAllSkills, addSkill, updateSkill, deleteSkill} = require("../handler/skill")
const { readOnlyAccessAuthorization, allAccessAuthorization } = require("../middleware/auth")

const router = express.Router()

router.get("/", readOnlyAccessAuthorization, getAllSkills)
router.post("/", allAccessAuthorization, addSkill)
router.put("/:id", allAccessAuthorization, updateSkill)
router.delete("/:id", allAccessAuthorization, deleteSkill)

module.exports = router