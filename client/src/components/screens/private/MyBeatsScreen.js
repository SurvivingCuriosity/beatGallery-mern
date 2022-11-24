import React, { useState } from "react";
import { UserBeatCard } from "../../cards/UserBeatCard";
import { FlexContainer } from '../../containers/FlexContainer'
import { useSelector } from 'react-redux'
import { ScreenWithNav } from "../../containers/ScreenWithNav";
const MyBeatsScreen = () => {
    const [error, setError] = useState("");

    const beats = useSelector((state) => state.userData.beats);

    return (
        <ScreenWithNav titulo='My beats'>
            {error && <div className="error-popup">{error}</div >}
            <FlexContainer columns>
                <p>({beats?.length}) beats</p>
                {beats?.map((beat, index) => {
                    return (
                        <UserBeatCard key={index} data={beat} />
                    )
                })}
            </FlexContainer>
        </ScreenWithNav>
    );
};

export default MyBeatsScreen;