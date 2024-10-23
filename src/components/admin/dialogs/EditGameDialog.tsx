import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import MeepleButton from '@/components/ui/meeple-button';
import { Textarea } from '@/components/ui/textarea';

interface EditGameDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  game: Game;
  onUpdateGame: (updatedGame: Game) => Promise<void>;
}

interface Game {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  bggLink: string;
  createdAt: string;
  updatedAt: string;
}

export function EditGameDialog({
  isOpen,
  onOpenChange,
  game,
  onUpdateGame,
}: EditGameDialogProps) {
  const methods = useForm<Game>({
    defaultValues: game,
  });

  const handleSubmit: SubmitHandler<Game> = (data) => {
    // Ensure createdAt and updatedAt are included in the submitted data
    const updatedGame = {
      ...data,
      createdAt: game.createdAt,
      updatedAt: new Date().toISOString(),
    };
    onUpdateGame(updatedGame);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit Game</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <div className='grid gap-4 py-4'>
              <FormField
                control={methods.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-bold'>Game Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-bold'>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name='imageUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-bold'>Image URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name='bggLink'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-bold'>BGG Link</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <MeepleButton
                variant='primary'
                className='hover:bg-white'
                type='submit'
              >
                Save changes
              </MeepleButton>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
