import React from 'react'
import { FloatingButton } from '../utils/FloatingButton'
import { FlexContainer } from "../containers/FlexContainer";
import { CheckboxAndLabel } from "../utils/CheckboxAndLabel";
import { ScaleSelector } from "../utils/ScaleSelector";
import { KeySelector } from "../utils/KeySelector";

import { FlexRow } from '../containers/FlexRow';
import Slider from 'rc-slider';
export const BeatForm = (props) => {
    const { action, onSubmitCallback, data } = props;

    const [beatInfo, setBeatInfo] = React.useState(data || {
        name: '', genre: '', tags: '', key: 'C', scale: 'major', tempo: 120, isAvailable: true, isFree: false, isVisible: true
    })

    const submitHandler = () => {
        onSubmitCallback(beatInfo)
    }

    const handleCheckbox = (name, isChecked) => {
        setBeatInfo({
            ...beatInfo,
            [name]: isChecked
        })
    }

    const handleScaleRadioButton = (escala) => {
        setBeatInfo(() => {
            return (
                {
                    ...beatInfo,
                    scale: escala
                }
            )
        })
    }

    const handleKeyRadioButton = (nota) => {
        setBeatInfo(() => {
            return (
                {
                    ...beatInfo,
                    key: nota
                }
            )
        })
    }
    return (
        <div>
            <form noValidate className="fade-in" autoComplete="off">
                <FlexContainer columns gap={'0.5em'}>
                    {/* NAME */}
                    <FlexRow>
                        <label htmlFor="add-beat-name">Name:</label>
                        <input
                            value={beatInfo.name}
                            onChange={(evt) => { setBeatInfo({ ...beatInfo, name: evt.target.value }) }}
                            id='add-beat-name'
                            required
                            type='text'
                            placeholder="Enter beat name...">
                        </input>
                    </FlexRow>
                    <br></br>

                    {/* GENRE */}
                    <FlexRow>
                        <label htmlFor="add-beat-genre">Genre:</label>
                        <input
                            value={beatInfo.genre}
                            onChange={(evt) => { setBeatInfo({ ...beatInfo, genre: evt.target.value }) }}
                            id='add-beat-genre'
                            required
                            type='text'
                            placeholder="Enter genre...">
                        </input>
                    </FlexRow>
                    <br></br>

                    {/* TAGS */}
                    <FlexRow>
                        <label htmlFor="add-beat-tags">Tags:</label>
                        <input
                            value={beatInfo.tags}
                            onChange={(evt) => { setBeatInfo({ ...beatInfo, tags: evt.target.value }) }}
                            id='add-beat-tags'
                            required
                            type='text'
                            placeholder="Enter tags (comma separated)...">
                        </input>
                    </FlexRow>
                    <br></br>
                    {/* BPM */}
                    <FlexRow>
                        <label>BPM:</label>
                        <label>{beatInfo.tempo}</label>
                    </FlexRow>
                    <FlexRow>
                        <p className='bpm-input-btn' onMouseDown={() => { setBeatInfo({ ...beatInfo, tempo: beatInfo.tempo - 1 }) }}>-</p>
                        <Slider
                            marks={{ 80: '80', 100: '100', 120: '120', 140: '140', 160: '160' }}
                            step={1}
                            min={60}
                            max={190}
                            value={beatInfo.tempo}
                            // dotStyle={{ backgroundColor: 'var(--blanco2)' }}
                            // activeDotStyle={{ backgroundColor: 'var(--blanco2)', border: 'none' }}
                            railStyle={{ backgroundColor: 'var(--color4)' }}
                            trackStyle={{ backgroundColor: 'var(--color4)' }}
                            onChange={(e) => { setBeatInfo({ ...beatInfo, tempo: e }) }}
                        />
                        <p className='bpm-input-btn' onMouseDown={() => { setBeatInfo({ ...beatInfo, tempo: beatInfo.tempo + 1 }) }}>+</p>
                    </FlexRow>

                    <br></br>
                    {/* KEY AND SCALE*/}
                    <label htmlFor="add-beat-key">Key and scale:</label>
                    <FlexRow>
                        <KeySelector callback={handleKeyRadioButton} keySelected={beatInfo.key} />
                        <ScaleSelector
                            scaleSelected={beatInfo.scale}
                            callback={handleScaleRadioButton}
                        />
                    </FlexRow>
                    <br></br>



                    <CheckboxAndLabel
                        label={`Free`}
                        name='isFree'
                        checked={beatInfo.isFree}
                        callback={handleCheckbox}
                    />
                    <CheckboxAndLabel
                        label={`Visible`}
                        name='isVisible'
                        checked={beatInfo.isVisible}
                        callback={handleCheckbox}
                    />
                    <CheckboxAndLabel
                        label={`Available`}
                        name='isAvailable'
                        checked={beatInfo.isAvailable}
                        callback={handleCheckbox}
                    />
                </FlexContainer>
            </form>
            <FloatingButton action={action} callback={submitHandler} />
        </div>
    )
}
