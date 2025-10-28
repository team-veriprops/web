import { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useIsMobile } from '@hooks/use-mobile';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@3rdparty/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '@3rdparty/ui/drawer';
import { Button } from '@3rdparty/ui/button';
import { ImageUploadManager } from './ImageUploadManager';
import { PhotoData, PhotoType } from './PhotoCard';

interface DocumentUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  photos: PhotoData[];
  onSave: (photos: PhotoData[]) => void;
  propertyId?: string;
  maxImages?: number;
  requiredTypes?: PhotoType[];
}

export function DocumentUploadModal({
  open,
  onOpenChange,
  photos,
  onSave,
  propertyId,
  maxImages = 20,
  requiredTypes = [],
}: DocumentUploadModalProps) {
  const isMobile = useIsMobile();
  const [localPhotos, setLocalPhotos] = useState<PhotoData[]>(photos);

  useEffect(() => {
    if (open) {
      setLocalPhotos(photos);
    }
  }, [open, photos]);

  const canSave =
    localPhotos.length > 0 &&
    localPhotos.every((p) => p.status === 'done') &&
    localPhotos.every((p) => p.metadata.type && p.metadata.title.trim().length >= 3);

  const getMissingRequiredTypes = (): PhotoType[] => {
    if (!requiredTypes || requiredTypes.length === 0) return [];
    const uploadedTypes = localPhotos
      .filter((p) => p.status === 'done' && p.metadata.type)
      .map((p) => p.metadata.type as PhotoType);
    return requiredTypes.filter((reqType) => !uploadedTypes.includes(reqType));
  };

  const missingTypes = getMissingRequiredTypes();
  const isValid = canSave && missingTypes.length === 0;

  const handleSave = () => {
    if (isValid) {
      onSave(localPhotos);
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setLocalPhotos(photos);
    onOpenChange(false);
  };

  const content = (
    <div className="flex-1 overflow-y-auto py-4">
      <ImageUploadManager
        propertyId={propertyId}
        maxImages={maxImages}
        requiredTypes={requiredTypes}
        seedPhotos={localPhotos}
        onChange={setLocalPhotos}
        hideSubmit
        mode="modal"
      />
    </div>
  );

  const footer = (
    <div className="flex gap-3 sm:gap-2">
      <Button
        variant="outline"
        onClick={handleCancel}
        className="flex-1 sm:flex-initial"
        type="button"
      >
        Cancel
      </Button>
      <Button
        onClick={handleSave}
        disabled={!isValid}
        className="flex-1 sm:flex-initial"
        type="button"
      >
        <CheckCircle2 className="mr-2 h-4 w-4" />
        Save Documents ({localPhotos.filter(p => p.status === 'done').length})
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[95vh] flex flex-col">
          <DrawerHeader className="text-left">
            <DrawerTitle>Upload Documents</DrawerTitle>
            <DrawerDescription>
              Upload and manage your property documents
            </DrawerDescription>
          </DrawerHeader>
          {content}
          <DrawerFooter className="pt-2">{footer}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Upload Documents</DialogTitle>
          <DialogDescription>
            Upload and manage your property documents. All documents must be successfully
            uploaded and have complete metadata before saving.
          </DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
