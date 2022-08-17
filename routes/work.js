const express = require("express")
const {getAllWorks, addWork, updateWork, deleteWork} = require("../handler/work")
const { readOnlyAccessAuthorization, allAccessAuthorization } = require("../middleware/auth")

const router = express.Router()

router.get("/", readOnlyAccessAuthorization, getAllWorks)
router.post("/", allAccessAuthorization, addWork)
router.put("/:id", allAccessAuthorization, updateWork)
router.delete("/:id", allAccessAuthorization, deleteWork)

module.exports = router