const express = require("express")
const {getAllSkills, addSkill, updateSkill, deleteSkill} = require("../handler/skill")

const router = express.Router()

router.get("/", getAllSkills)
router.post("/", addSkill)
router.put("/:id", updateSkill)
router.delete("/:id", deleteSkill)

module.exports = router