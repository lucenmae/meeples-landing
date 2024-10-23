import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ControllerRenderProps, FieldValues } from "react-hook-form"
import * as z from "zod"

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
import MeepleButton from "../../ui/meeple-button"

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
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto bg-meeple-secondary border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black">Edit Game</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="gameName"
              render={({ field }: { field: ControllerRenderProps<FieldValues, "gameName"> }) => (
                <FormItem>
                  <FormLabel className="font-bold">Game Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter game name" className="border-2 border-black bg-white" {...field} />
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
                  <FormLabel className="font-bold">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter game description"
                      className="resize-none border-2 border-black bg-white"
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
                  <FormLabel className="font-bold">Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter image URL" className="border-2 border-black bg-white" {...field} />
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
                  <FormLabel className="font-bold">BoardGameGeek Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter BoardGameGeek URL" className="border-2 border-black bg-white" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-6 flex justify-end space-x-4">
              <MeepleButton
                type="submit"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto hover:bg-white"
              >
                Save
              </MeepleButton>
              <MeepleButton
                type="button"
                variant="outline"
                size="lg"
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto bg-white hover:bg-meeple-tertiary"
              >
                Cancel
              </MeepleButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
