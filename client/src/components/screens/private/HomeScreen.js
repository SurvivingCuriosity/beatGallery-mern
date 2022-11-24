import { useState, useEffect } from "react";
import { ScreenWithNav } from "../../containers/ScreenWithNav";


const HomeScreen = () => {
  const [error, setError] = useState(undefined);
  const [privateData, setPrivateData] = useState("");


  return (
    <ScreenWithNav titulo='Home'>

    </ScreenWithNav>
  );
};

export default HomeScreen;