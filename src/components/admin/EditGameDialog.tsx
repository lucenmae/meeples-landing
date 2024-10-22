import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ControllerRenderProps, FieldValues } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Game {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  bggLink: string;
  createdAt: string;
  updatedAt: string;
}

interface EditGameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  game: Game;
  onUpdateGame: (game: Game) => void;
}

const formSchema = z.object({
  gameName: z.string().min(2, {
    message: "Game name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  imageUrl: z.string().url({
    message: "Please enter a valid URL.",
  }),
  bggLink: z.string().url({
    message: "Please enter a valid BoardGameGeek URL.",
  }),
})

export default function EditGameDialog({ open, onOpenChange, game, onUpdateGame }: EditGameDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameName: game.name,
      description: game.description,
      imageUrl: game.imageUrl,
      bggLink: game.bggLink,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedGame = { ...game, ...values, name: values.gameName }
    onUpdateGame(updatedGame)
    onOpenChange(false)
    form.reset({
      gameName: game.name,
      description: game.description,
      imageUrl: game.imageUrl,
      bggLink: game.bggLink,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Game</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="gameName"
              render={({ field }: { field: ControllerRenderProps<FieldValues, "gameName"> }) => (
                <FormItem>
                  <FormLabel>Game Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter game name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }: { field: ControllerRenderProps<FieldValues, "description"> }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter game description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }: { field: ControllerRenderProps<FieldValues, "imageUrl"> }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter image URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bggLink"
              render={({ field }: { field: ControllerRenderProps<FieldValues, "bggLink"> }) => (
                <FormItem>
                  <FormLabel>BoardGameGeek Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter BoardGameGeek URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full sm:w-auto">Save</Button>
              <Button type="button" variant="secondary" onClick={() => onOpenChange(false)} className="ml-2">Cancel</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}