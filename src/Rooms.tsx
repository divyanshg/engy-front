import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';

import api from './api';
import { NewRoom } from './components/NewRoom';
import RoomCard from './components/RoomCard';
import Skeleton from './components/Skeleton';
import { useAuth } from './hooks/useAuth';
import { clickToCopy } from './lib/utils';

function Rooms() {
  const { user } = useAuth();
  const {
    data: rooms_data,
    isLoading,
    isError,
  } = useQuery<{
    code: number;
    data: {
      id: string;
      name: string;
      createdAt: string;
    }[];
  }>({
    queryKey: ["rooms"],
    queryFn: async () =>
      await api.list({
        entity: "rooms",
      }),
  });

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
      <div className="flex items-center w-full max-w-6xl gap-4 mx-auto">
        <form className="flex-1">
          <Input
            className="bg-white dark:bg-gray-950"
            placeholder="Search rooms..."
          />
          <Button className="sr-only" type="submit">
            Submit
          </Button>
        </form>
        <NewRoom />
      </div>
      <div className="flex items-center w-full max-w-6xl gap-4 mx-auto">
        <span>
          Your api key:{" "}
          <code
            onClick={() => clickToCopy(user?.apiKey as string)}
            title="Click to copy"
            className="px-2 py-1 bg-gray-200 rounded cursor-pointer active:bg-lime-200 hover:bg-lime-100"
          >
            {user?.apiKey}
          </code>
        </span>
      </div>
      <div className="grid w-full max-w-6xl gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
        {!isLoading && rooms_data && rooms_data.data.length > 0 ? (
          rooms_data.data.map(
            (room: { name: string; id: string; createdAt: string }) => (
              <RoomCard key={room.id} room={room} />
            )
          )
        ) : (
          <div className="w-full h-32 text-gray-500 dark:text-gray-400">
            No rooms created
          </div>
        )}
        {isLoading ? [1, 2, 3].map(Skeleton) : null}
      </div>
    </main>
  );
}

export default Rooms;
