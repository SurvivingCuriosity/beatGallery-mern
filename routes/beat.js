const express = require('express');
const protect = require("../middleware/auth");
const router = express.Router();

const {
    addBeat,
    deleteBeat,
    editBeat,
    getBeatById
} = require("../controllers/beat");


router.post("/add", protect, addBeat);
router.put("/update", protect, editBeat);
router.delete("/delete", deleteBeat);
router.get("/:id", protect, getBeatById);      

module.exports = router;
