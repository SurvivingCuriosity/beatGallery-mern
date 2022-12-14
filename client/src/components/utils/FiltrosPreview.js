import React from 'react'

export const FiltrosPreview = (props) => {
    const { filtros, callbackReset } = props;
    if (filtros?.bpm[0] === 60 && filtros?.bpm[1] === 190 && filtros.genre === '' && filtros.tags === '') {
        return null;
    }
    return (
        <>
            <div className='filtros-preview-container'>
                {filtros?.bpm[0] === 60 && filtros?.bpm[1] === 190 ?
                    ''
                    :
                    <div className='preview-single-filter'>
                        <p><span style={{ color: 'var(--color4)' }}>BPM:</span> :
                            {filtros?.bpm[0] === filtros?.bpm[1]
                                ?
                                ' ' + filtros?.bpm[0]
                                :
                                ' ' + filtros?.bpm[0] + '-' + filtros?.bpm[1]
                            }
                        </p>
                    </div>
                }
                {filtros?.genre !== '' &&
                    <div className='preview-single-filter'>
                        <p>Genre : {filtros?.genre}</p>
                    </div>
                }
                {filtros?.tags !== '' &&
                    <div className='preview-single-filter'>
                        <p>Tags : {filtros?.tags}</p>
                    </div>
                }
                <button style={{marginLeft:'auto'}} onClick={()=>{callbackReset()}}>Resetear filtros</button>
            </div>
        </>
    )
}

