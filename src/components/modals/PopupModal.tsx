import React from 'react';
import { Plus } from 'lucide-react';
import { Button, ScrollArea } from '../ui';

export type AppModalProps = {
  onConfirm?: () => void;
  loading?: boolean;
  modalName?: string;
  showAddBtn?: boolean;
  title?: string;
  renderModal: (onClose: () => void) => React.ReactNode;
  extraBtns?: () => React.ReactNode;
  isOpen: boolean;
  setIsOpen: (value: string) => void;
  className?: string;
};

export default function PopupModal({
  renderModal,
  modalName,
  showAddBtn = true,
  title,
  extraBtns,
  isOpen,
  setIsOpen,
  className = '',
}: AppModalProps) {
  const modalKey = modalName ?? 'create';
  const open = isOpen;

  const onClose = () => {
    setIsOpen('');
  };

  return (
    <div className="flex justify-end">
      <div className="flex gap-2">
        {showAddBtn && (
          <Button
          variant='secondary'
            className="flex justify-end ml-auto text-xs md:text-sm bg-primary text-white px-3 md:px-4 py-2 rounded-lg hover:bg-gray-800"
            onClick={() => setIsOpen(modalKey)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        )}
        {extraBtns && extraBtns()}
      </div>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 px-4">
          <div
            className={
              'relative w-full max-w-5xl rounded-xl bg-background shadow-2xl shadow-black/25 border border-border overflow-hidden ' +
              className
            }
          >
            <div className="flex items-center justify-between border-b border-border bg-muted/40 px-6 py-4">
              <h5 className="text-lg font-semibold text-foreground">{title ?? 'Add Client'}</h5>
              <Button  variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
            <ScrollArea className="max-h-[80vh] px-6 py-4">
              {renderModal(onClose)}
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  );
}
