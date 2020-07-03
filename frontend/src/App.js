import React, { useState, useEffect } from 'react';
import { Dimmer } from 'semantic-ui-react';
import { apihost } from './apihost';
// import { isMobile } from "react-device-detect";

//component
import Phonebook from './component/Phonebook';

function App() {
  //const isMobile = window.innerWidth <= 700;
  const [spinner, setSpinner] = useState(true);
  const loadingScreen = apihost + 'static/App_Data/phonebook-covidproj-loadingscreen.png';

  useEffect(() => {
    setTimeout(() => setSpinner(false), 2000)
  }, [spinner, setSpinner]);

  return (
    <div style={{ backgroundColor: '#171a21', height: '100%', width: '100%', position: 'fixed', display: 'flex', justifyContent: 'center', backgroundSize: 'cover' }}>
      <Dimmer active={spinner} inverted style={{ backgroundImage: `url(${loadingScreen})`, position: 'fixed', display: 'flex', justifyContent: 'center', backgroundSize: 'cover', width: '100%', height: '100%'}}>
      </Dimmer>

      <Phonebook />
    </div>
  );
}

export default App;
