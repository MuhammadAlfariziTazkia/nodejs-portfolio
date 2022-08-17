const express = require("express")
const {getAllCertificates, addCertificate, updateCertificate, deleteCertificate} = require("../handler/certificate")

const router = express.Router()

router.get("/", getAllCertificates)
router.post("/", addCertificate)
router.put("/:id", updateCertificate)
router.delete("/:id", deleteCertificate)

module.exports = router