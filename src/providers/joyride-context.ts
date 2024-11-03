import { createContext, useContext } from 'react';

type JoyrideContextType = {
  stepIndex: number;
  setStepIndex: (index: number) => void;
};

export const JoyrideContext = createContext<JoyrideContextType>({
  stepIndex: 0,
  setStepIndex: () => {},
});

export const useJoyrideContext = () => {
  return useContext(JoyrideContext);
};
