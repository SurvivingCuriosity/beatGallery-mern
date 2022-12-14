import React, { useState } from "react";
import { UserBeatCard } from "../../cards/UserBeatCard";
import { FlexContainer } from '../../containers/FlexContainer'
import { useSelector } from 'react-redux'
import { ScreenWithNav } from "../../containers/ScreenWithNav";
import { Filtros } from "../../utils/Filtros";

const MyBeatsScreen = () => {

    const beats = useSelector((state) => state.userData.beats);
    const [filteredBeats, setFilteredBeats] = useState(beats);

    const getFilteredBeats = (beats) => {
        setFilteredBeats(beats)
    }

    return (
        <ScreenWithNav titulo='My beats'>
            <FlexContainer columns>
                <Filtros allBeats={beats} callback={getFilteredBeats} />
                {filteredBeats?.map((beat, index) => {
                    return (
                        <UserBeatCard key={index} data={beat} />
                    )
                })}
                {filteredBeats?.length===0 && <p>No matching results</p>}
            </FlexContainer>
        </ScreenWithNav>
    );
};

export default MyBeatsScreen;