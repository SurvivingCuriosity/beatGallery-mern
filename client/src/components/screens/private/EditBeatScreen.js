import React from "react";
import { ScreenWithNav } from "../../containers/ScreenWithNav";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editBeatAction } from "../../../redux/Actions";
import { BeatForm } from "../../forms/BeatForm";
const EditBeatScreen = (props) => {
    const navigate = useNavigate();
    const param = useParams();
    const dispatch = useDispatch();

    const beatId = param.id;
    let editingBeat = useSelector((state) =>  state.userData.beats);
    editingBeat = editingBeat.filter(beat=>(beat._id === beatId))[0]

    async function editBeatHandler(beatInfo) {
        console.log('En edit beat hndler');
        dispatch(editBeatAction(beatInfo));
    }

    return (
        <ScreenWithNav titulo='Edit beat'>
            <BeatForm onSubmitCallback={editBeatHandler} action='edit' data={editingBeat}/>
        </ScreenWithNav>
    );
};

export default EditBeatScreen;