const Beat = require('../models/Beat');
const User = require('../models/User');
const mongoose = require('mongoose');
const ErrorResponse = require("../utils/errorResponse");

exports.addBeat = async (req, res, next) => {
    console.log('CONTROLLER: en add beat');

    const { userId, name, genre, tags, key, scale, tempo, isAvailable, isFree, isVisible } = req.body;
    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        return console.log(err);
    }
    if (!user) {
        return res.status(400).json({ message: "Unable TO FInd User By This ID" });
    }
    const newBeat = new Beat({
        userId, name, genre, tags, key, scale, tempo, isAvailable, isFree, isVisible
    });
    try {
        const savedBeat = await newBeat.save();
        console.log('se guardo el beat');
        console.log(savedBeat);

        user.beats = user.beats.concat(savedBeat._id);
        await user.save();

        console.log('se guardo el user');
        console.log(user);

        res.status(200).json({ success: true, savedBeat })
    } catch (err) {
        console.log(err);
        next(err);
    }

}

exports.deleteBeat = (req, res, next) => {
    res.status(200).json({
        success: true,
        data: "beat deleted",
    });
};

exports.editBeat = async (req, res) => {
    console.log('EN CONTROLLER EDIT BEAT');
    console.log(req.body);
    const { _id } = req.body;

    try {
        // have to change this
        const updatedBeat = await Beat.findByIdAndUpdate(_id, req.body, {
            new: true,
        });

        console.log({ updatedBeat })
        res.status(200).json({ success: true, updatedBeat })
    } catch (error) {
        console.log("Error agya hy")
        res.status(500).json(error);
    }

};

exports.getAllBeats = async (req, res, next) => {

    let beats;
    try {
        beats = await Beat.find().populate("userId");
    } catch (err) {
        return console.log(err);
    }
    if (!beats) {
        return res.status(404).json({ message: "No Blogs Found" });
    }
    return res.status(200).json({ beats });

};

exports.getBeatsByUsername = async (req, res, next) => {
    console.log('CONTROLLER: Getting beats');
    const username = req.params.username;

    const userId = req.body.userId;

    let existingUser;
    try {
        existingUser = await User.findOne({ userId });
    } catch (err) {
        return console.log(err);
    }
    if (!existingUser) {
        return res.status(400).json({ message: "Unable TO FInd User By This ID" });
    }
    console.log('el usuairo existe');

    try {
        const data = await User.findOne({ username: username }).populate("beats", {
            _id: 0,
            userId: 0,
            __v: 0
        });
        res.status(200).json({ success: true, data })
    } catch (err) {
        next(err);
    }
};

exports.getBeatById = async (req, res, next) => {
    console.log('beat by id');
    const beatId = req.params.id;
    console.log(beatId);
    let beat;
    try {
        beat = await Beat.findById(beatId);
    } catch (err) {
        return console.log(err);
    }
    if (!beat) {
        return res.status(404).json({ message: "No beats Found" });
    }
    console.log(beat);
    return res.status(200).json({ beat });

};
