const express = require("express")
const {getAllWorks, addWork, updateWork, deleteWork} = require("../handler/work")

const router = express.Router()

router.get("/", getAllWorks)
router.post("/", addWork)
router.put("/:id", updateWork)
router.delete("/:id", deleteWork)

module.exports = router