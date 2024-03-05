import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";

import api from "../api";

export function NewRoom() {
  const [name, setName] = useState("");

  const { mutate: createRoom, isPending } = useMutation({
    mutationKey: ["rooms"],
    mutationFn: async (jsonData: Record<string, string>) =>
      await api.create({ entity: "rooms", jsonData }),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    },
  });

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
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={() => createRoom({ name })}
              disabled={isPending}
            >
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
