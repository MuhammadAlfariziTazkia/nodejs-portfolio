const express = require("express")
const {getAllCertificates, addCertificate, updateCertificate, deleteCertificate} = require("../handler/certificate")
const { readOnlyAccessAuthorization, allAccessAuthorization } = require("../middleware/auth")

const router = express.Router()

router.get("/", readOnlyAccessAuthorization, getAllCertificates)
router.post("/", allAccessAuthorization, addCertificate)
router.put("/:id", allAccessAuthorization, updateCertificate)
router.delete("/:id", allAccessAuthorization, deleteCertificate)

module.exports = router