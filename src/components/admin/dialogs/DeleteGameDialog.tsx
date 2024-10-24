import React from 'react';

import { Dialog, DialogContent, DialogDescription, DialogFooter,DialogHeader, DialogTitle } from "@/components/ui/dialog";

import MeepleButton from '../../ui/meeple-button';

interface DeleteGameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmDelete: () => void;
  gameName: string;
}

export default function DeleteGameDialog({ open, onOpenChange, onConfirmDelete, gameName }: DeleteGameDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-meeple-secondary border-4 border-black rounded-lg p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black">Delete Game</DialogTitle>
          <DialogDescription className="text-lg text-gray-700">
            Are you sure you want to delete <span className="font-bold">{gameName}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 flex justify-end space-x-4">
        <MeepleButton
            onClick={() => {
              onConfirmDelete();
              onOpenChange(false);
            }}
            variant="outline"
            size="lg"
            className="bg-red-500 hover:bg-white hover:text-black text-white"
          >
            Delete
          </MeepleButton>
          <MeepleButton
            onClick={() => onOpenChange(false)}
            variant="outline"
            size="lg"
            className="bg-white hover:bg-meeple-tertiary"
          >
            Cancel
          </MeepleButton>
         
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
