import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './dialog';
import { Button } from './button';
import { useState } from 'react';

interface DeleteDialogProps<T> {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (item: T) => Promise<void> | void;
  item: T;
  title?: string;
  description?: string;
  loading?: boolean;
}

export function DeleteDialog<T>({
  isOpen,
  onClose,
  onConfirm,
  item,
  title = 'Confirmar exclusão',
  description = 'Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.',
  loading = false,
}: DeleteDialogProps<T>) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsDeleting(true);
      await onConfirm(item);
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isDeleting || loading}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={isDeleting || loading}>
            {isDeleting || loading ? 'Excluindo...' : 'Excluir'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
