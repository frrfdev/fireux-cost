import { JoyrideProvider } from '@/providers/joyride-provider';
import { Playground } from './playground';

const Page = () => {
  return (
    <div className="h-full w-full">
      <JoyrideProvider>
        <Playground></Playground>
      </JoyrideProvider>
    </div>
  );
};

export { Page };
