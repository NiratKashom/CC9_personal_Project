import { createContext, useState } from 'react';
import { MOCK_FLIGHT } from '../temp/MOCK_SHCEDULE_FLIGTH';

const summaryContext = createContext();

const SummaryProvider = ({ children }) => {
  const [step, setStep] = useState(0);

  const hdlClickIncrStep = () => setStep(step + 1);
  const hdlClickDecrStep = () => setStep(step - 1);

  const [summary, setSummary] = useState({
    roomList: [

    ],
    extraList: [

    ]
  });



  const sumPrice = summary.roomList.reduce((acc, item) => {
    return acc += item.price * item.amount;
  }, 0) + summary.extraList.reduce((acc, item) => {
    return acc += item.price * item.amount;
  }, 0);

  const [currentFlight, setCurrentFlight] = useState({});


  const hdlClickSetCurFlightWithId = (flightId) => {
    const pickOne = MOCK_FLIGHT.find(item =>
      item.flightId === flightId
    );
    setCurrentFlight(cur => ({ ...cur, ...pickOne }));
  };

  return <summaryContext.Provider value={{
    summary, setSummary, sumPrice,
    step, setStep, hdlClickIncrStep, hdlClickDecrStep,
    hdlClickSetCurFlightWithId, currentFlight, setCurrentFlight,
  }}>
    {children}
  </summaryContext.Provider>;
};

export { summaryContext, SummaryProvider };