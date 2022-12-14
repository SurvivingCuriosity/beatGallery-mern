import React from 'react'
import { FlexRow } from '../containers/FlexRow';
import Slider from 'rc-slider';
import TooltipSlider, { handleRender } from './TooltipSlider';
import { FiltrosPreview } from '../utils/FiltrosPreview.js'
import slider from '../../assets/styles/slider.css'
import { KeySelector } from './KeySelector';
import { ScaleSelector } from './ScaleSelector';

export const Filtros = (props) => {
    const { allBeats, callback } = props;
    const [filteredBeats, setFilteredBeats] = React.useState(allBeats);

    const [openFiltros, setOpenFiltros] = React.useState(false);
    const [filtrosActivos, setFiltrosActivos] = React.useState({
        bpm: [60, 190],
        tags: '',
        genre: '',
    });

    React.useEffect(() => {
        console.log('Buscando: ' + filtrosActivos.genre);

        //filtro por bpm
        let newBeats = allBeats.filter(beat =>
            beat.tempo >= filtrosActivos.bpm[0] &&
            beat.tempo <= filtrosActivos.bpm[1]
        )
        //filtro por genero (si ha escrito algo)
        if (filtrosActivos.genre !== '') {
            newBeats = newBeats.filter(beat => beat.genre.startsWith(filtrosActivos.genre))
        }

        //filtro por tags (si ha escrito algo)
        if (filtrosActivos.tags !== '') {
            newBeats = newBeats.filter(beat => beat.tags.startsWith(filtrosActivos.tags))
        }

        setFilteredBeats(newBeats);
    }, [filtrosActivos]);

    React.useEffect(() => {
        callback(filteredBeats, filtrosActivos)
    }, [filteredBeats])

    const resetFilters = () => {
        setFiltrosActivos({
            bpm: [60, 190],
            tags: '',
            genre: '',
        })
        setOpenFiltros(false);
    }

    return (
        <>
            {openFiltros === true
                ?
                <button className='btn btn-abrir-filtros' onClick={() => { setOpenFiltros(false) }}>Cerrar filtros</button>
                :
                <button className='btn btn-abrir-filtros' onClick={() => { setOpenFiltros(true) }}>Abrir filtros</button>
            }
            {openFiltros === true &&
                <div className='filtros-container'>
                    {/* BPM */}
                    <div className='single-filter'>
                        <FlexRow width='100%' gap='1.5em'>
                            <h2>BPM: </h2>
                            <Slider
                                marks={{ 80: '80', 100: '100', 120: '120', 140: '140', 160: '160' }}
                                handleRender={handleRender}
                                step={1}
                                min={60}
                                max={190}
                                range
                                defaultValue={filtrosActivos?.bpm || [60, 190]}
                                isVisible={true}
                                allowCross={false}
                                // value={beatInfo.tempo}
                                railStyle={{ backgroundColor: 'var(--gris)' }}
                                trackStyle={{ backgroundColor: 'var(--color4)' }}
                                onChange={(e) => { setFiltrosActivos({ ...filtrosActivos, bpm: e }) }}
                            />
                        </FlexRow>
                    </div>
                    {/* GENERO */}
                    <div className='single-filter'>
                        <FlexRow>
                            <label htmlFor="add-beat-genre">Genre:</label>
                            <input
                                value={filtrosActivos.genre}
                                onChange={(evt) => { setFiltrosActivos({ ...filtrosActivos, genre: evt.target.value }) }}
                                id='add-beat-genre'
                                required
                                type='text'
                                placeholder="Enter genre...">
                            </input>
                        </FlexRow>
                    </div>
                    <div className='single-filter'>
                        <FlexRow>
                            <label htmlFor="add-beat-tags">tags:</label>
                            <input
                                value={filtrosActivos.tags}
                                onChange={(evt) => { setFiltrosActivos({ ...filtrosActivos, tags: evt.target.value }) }}
                                id='add-beat-tags'
                                required
                                type='text'
                                placeholder="Enter tags...">
                            </input>
                        </FlexRow>
                    </div>
                    <FlexRow>
                        <KeySelector
                            callback={(key) => { setFiltrosActivos({ ...filtrosActivos, key: key }) }}
                            keySelected={filtrosActivos?.key}
                            isFilter
                        />
                        <ScaleSelector
                            scaleSelected={filtrosActivos.scale}
                            callback={(scale) => { setFiltrosActivos({ ...filtrosActivos, scale: scale }) }}
                            isFilter
                        />
                    </FlexRow>

                </div>
            }
            <FiltrosPreview filtros={filtrosActivos} callbackReset={resetFilters} />
        </>

    )
}
