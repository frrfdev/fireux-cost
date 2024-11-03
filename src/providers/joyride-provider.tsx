import { useState } from 'react';
import { JoyrideContext } from './joyride-context';

export const JoyrideProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  return (
    <JoyrideContext.Provider value={{ stepIndex, setStepIndex }}>
      {children}
    </JoyrideContext.Provider>
  );
};
