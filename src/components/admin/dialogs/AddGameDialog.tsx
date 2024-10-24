'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import MeepleButton from '@/components/ui/meeple-button';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Game name must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  imageUrl: z.string().url({
    message: 'Please enter a valid URL.',
  }),
  bggLink: z.string().url({
    message: 'Please enter a valid BoardGameGeek URL.',
  }),
});

interface AddGameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddGame: (game: z.infer<typeof formSchema>) => Promise<void>;
}

export default function AddGameDialog({
  open,
  onOpenChange,
  onAddGame,
}: AddGameDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      imageUrl: '',
      bggLink: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await onAddGame(values);
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error('Failed to add game:', error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px] max-h-[90vh] overflow-y-auto bg-meeple-secondary border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold text-black'>
            Add New Game
          </DialogTitle>
          <DialogDescription className='text-black'>
            Enter the details of the new game you want to add to your
            collection.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-lg font-semibold text-black'>
                    Game Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter game name'
                      {...field}
                      className='border-2 border-black bg-white focus:ring-2 focus:ring-meeple-shadow'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-lg font-semibold text-black'>
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter game description'
                      className='resize-none border-2 border-black bg-white focus:ring-2 focus:ring-meeple-shadow'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='imageUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-lg font-semibold text-black'>
                    Image URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter image URL'
                      {...field}
                      className='border-2 border-black bg-white focus:ring-2 focus:ring-meeple-shadow'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='bggLink'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-lg font-semibold text-black'>
                    BoardGameGeek Link
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter BoardGameGeek URL'
                      {...field}
                      className='border-2 border-black bg-white focus:ring-2 focus:ring-meeple-shadow'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <MeepleButton
                type='submit'
                variant='primary'
                className='w-full sm:w-auto hover:bg-white'
              >
                Add Game
              </MeepleButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
