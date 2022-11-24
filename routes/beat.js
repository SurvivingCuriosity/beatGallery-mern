const express = require('express');
const protect = require("../middleware/auth");
const router = express.Router();

const {
    addBeat,
    deleteBeat,
    getAllBeats,
    getBeatsByUsername,
    updateBeat,
    getBeatById
} = require("../controllers/beat");


router.get("/", getAllBeats);
router.put("/update/:id", updateBeat);
router.delete("/:id", deleteBeat);

// router.get("/:username", protect, getBeatsByUsername);      
router.post("/add", protect, addBeat);

router.get("/:id", protect, getBeatById);      

module.exports = router;
