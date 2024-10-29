import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/features/auth/stores/use-auth-store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const LayoutPrivate = (props: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  const handleLogout = () => {
    setUser(null);
    setToken('');
    window.location.href = '/login';
  };

  return (
    <div className="h-full w-full flex flex-col">
      <nav className="h-14 shadow-lg p-4 flex items-center justify-between">
        <h2>Fireux Cost</h2>
        <span>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut></LogOut>
          </Button>
        </span>
      </nav>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </div>
  );
};

export { LayoutPrivate };
