
import { Button } from '@/components/ui/button';
import {
    Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle,
    DrawerTrigger
} from '@/components/ui/drawer';

export function AddWidgetDrawer() {
  // const [goal, setGoal] = React.useState(350);

  // function onClick(adjustment: number) {
  //   setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  // }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Add Widget</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="w-full px-8">
          <DrawerHeader>
            <DrawerTitle>Add Widget</DrawerTitle>
            <DrawerDescription>
              Add a new widget to the dashboard
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2"></div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
