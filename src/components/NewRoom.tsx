import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation } from '@tanstack/react-query';

import api from '../api';

function getNamesMap(name: string) {
  return name
    .split(",")
    .map((n) => {
      if (n.trim() === "") return;
      return { name: n.trim() };
    })
    .filter(Boolean);
}

export function NewRoom() {
  const [name, setName] = useState("");
  const [seperateRooms, setSeperateRooms] = useState<any>([]);
  const [createMany, setCreateMany] = useState(false);

  const { mutate: createRoom, isPending } = useMutation({
    mutationKey: ["rooms"],
    mutationFn: async (jsonData: Record<string, string>) =>
      await api.create({ entity: "rooms", jsonData }),
    // onSuccess: () => {
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 1500);
    // },
  });

  const { mutate: createRooms, isPending: isManyPending } = useMutation({
    mutationKey: ["rooms"],
    mutationFn: async (jsonData: ({ name: string } | undefined)[]) =>
      await api.post({
        entity: "rooms/create-many",
        data: {
          rooms: jsonData,
        },
      }),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    },
  });

  useEffect(() => {
    //if name has , then create many rooms
    //if there is a comma in the end but no text after it, it should be ignored
    if (name.includes(",")) {
      setCreateMany(true);
      const rms = getNamesMap(name);
      setSeperateRooms(rms);
    } else {
      setCreateMany(false);
    }
  }, [name]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Room</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create room</DialogTitle>
          <DialogDescription>
            Add a new room to your dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="AF13"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex flex-row space-x-2">
              {createMany &&
                seperateRooms.length > 0 &&
                seperateRooms.map((room: { name: string }) => (
                  <div className="px-2 bg-gray-100 rounded-xl">
                    <label htmlFor="">{room.name}</label>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            {!createMany ? (
              <Button
                type="submit"
                onClick={() => createRoom({ name })}
                disabled={isPending}
              >
                Create
              </Button>
            ) : (
              <Button
                type="submit"
                onClick={() => createRooms(getNamesMap(name))}
                disabled={isManyPending}
              >
                Create Many
              </Button>
            )}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
