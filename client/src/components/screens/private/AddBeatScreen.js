import React from "react";
import { useState } from "react";
import 'rc-slider/assets/index.css';
import { ScreenWithNav } from "../../containers/ScreenWithNav";
import { useDispatch } from "react-redux";
import { addBeatAction } from "../../../redux/Actions";
import { useNavigate } from "react-router-dom";
import { BeatForm } from "../../forms/BeatForm";
const AddBeatScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    async function addBeatHandler(beatInfo) {
        console.log('Add beat handler');
        console.log(beatInfo);
        dispatch(addBeatAction(beatInfo));
    }

    return (
        <ScreenWithNav titulo='Add beat'>
            <BeatForm onSubmitCallback={addBeatHandler} action='add'/>
            
        </ScreenWithNav>
    );
};

export default AddBeatScreen;