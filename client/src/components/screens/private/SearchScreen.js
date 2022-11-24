import React, { useState } from "react";
import { FlexRow } from '../../containers/FlexRow'
import { buscarUsuario } from "../../../api/apiCalls";
import { ProducerCard } from "../../cards/ProducerCard";
import { FlexContainer } from "../../containers/FlexContainer";
import { ScreenWithNav } from "../../containers/ScreenWithNav";
import { FloatingButton } from "../../utils/FloatingButton";
const TIPOS_BUSQUEDA = { beat: 'beat', producer: 'producer' };

const SearchScreen = () => {
  const [userInputText, setUserInputText] = useState('');
  const [error, setError] = useState('');
  const [tipoBusqueda, setTipoBusqueda] = useState(TIPOS_BUSQUEDA.producer);
  const [result, setResult] = useState([]);

  React.useEffect(()=>{
    search();
  },[userInputText])

  const search = async () => {
    if(userInputText===''){
      setResult([])
      return;
    }
    const data = await buscarUsuario(userInputText);
    if (data) {
      if (data.data.length === 0) {
        setError(`No results found for ${userInputText}`)
        setResult([]);
      }else{
        setResult(data.data);
        setError(``)
      }
    }
  }

  const handleChangeTipoBusqueda = () => {
    tipoBusqueda === TIPOS_BUSQUEDA.producer
      ?
      setTipoBusqueda(TIPOS_BUSQUEDA.beat)
      :
      setTipoBusqueda(TIPOS_BUSQUEDA.producer)
  }
  
  return (
    <ScreenWithNav titulo='Search'>
      <button
        style={{ margin: '0.5em' }}
        onClick={handleChangeTipoBusqueda}
        className='btn btn-3'
      >Buscar {tipoBusqueda === TIPOS_BUSQUEDA.producer ? TIPOS_BUSQUEDA.beat : TIPOS_BUSQUEDA.producer}
      </button>

      <form>
        <FlexRow>
          <input
            value={userInputText}
            onChange={(evt) => { setUserInputText(evt.target.value) }}
            required
            type='search'
            placeholder={`Enter ${tipoBusqueda} name...`}>
          </input>
          {/* <input
            className="btn btn-1"
            type='submit'
            value='Search'
          >
          </input> */}
        </FlexRow>
      </form>
      <FlexContainer columns>
        {result?.map((el, index) => {
          return (
            <ProducerCard key={index} data={el} />
          )
        })}
      </FlexContainer>
      {error}
      <FloatingButton action='search' />
    </ScreenWithNav>
  );
};

export default SearchScreen;