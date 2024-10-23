import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MeepleButton from '../../ui/meeple-button';

interface WarningDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  gameName: string;
}

export default function WarningDialog({ open, onOpenChange, onConfirm, gameName }: WarningDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-yellow-200 border-4 border-black rounded-lg p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black">Warning</DialogTitle>
          <DialogDescription className="text-lg text-gray-800">
            <span className="font-bold">{gameName}</span> is already in your inventory. Do you want to add it anyway?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 flex justify-end space-x-4">
          <MeepleButton
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            variant="outline"
            size="lg"
            className="bg-meeple-primary hover:bg-white text-black"
          >
            Add Anyway
          </MeepleButton>
          <MeepleButton
            onClick={() => onOpenChange(false)}
            variant="outline"
            size="lg"
            className="bg-white hover:bg-meeple-tertiary text-black"
          >
            Cancel
          </MeepleButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
