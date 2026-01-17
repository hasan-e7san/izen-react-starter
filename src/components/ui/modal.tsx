'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "./dialog";
import { Sheet,/*  SheetClose, */ SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, /* SheetTrigger */ } from './sheet';
import { ScrollArea } from './scroll-area';
// import { Button } from './button';
// import { Label } from './label';
// import { Input } from './input';
import { cn } from '../../lib/utils';

interface ModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
  allowDismissal?: boolean;
  userPopup?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
  className,
  allowDismissal = true,
  userPopup = false
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  if (!userPopup)
    return (
      <Sheet open={isOpen} onOpenChange={onChange} >
        <SheetContent className={cn("w-[1000px] sm:w-[700px] max-w-md lg:max-w-3xl overflow-hidden flex flex-col", className)} onPointerDownOutside={allowDismissal ? () => { } : (e) => e.preventDefault()}>
          <SheetHeader className="flex-shrink-0">
            <SheetTitle className='ml-4'>{title}</SheetTitle>
            <SheetDescription>
              {description}
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="flex-1 px-6 py-4">
            <div className="pr-4">{children}</div>
          </ScrollArea>
          <SheetFooter className="flex-shrink-0">
            {/* <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose> */}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

  return (
    <Dialog open={isOpen} onOpenChange={onChange}  >
      <DialogContent className={className} onPointerDownOutside={allowDismissal ? () => { } : (e: Event) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
