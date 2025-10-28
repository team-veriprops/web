import { useState, useCallback } from 'react';
import { Upload, Loader2, AlertCircle } from 'lucide-react';
import { Control, FieldValues, Path } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@3rdparty/ui/form';
import { Button } from '@3rdparty/ui/button';
import { cn } from '@lib/utils';
import { FileChip } from './FileChip';
import { DocumentUploadModal } from './DocumentUploadModal';
import { PhotoData, PhotoType } from './PhotoCard';

interface DocumentUploadFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  propertyId?: string;
  maxImages?: number;
  requiredTypes?: PhotoType[];
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function DocumentUploadField<T extends FieldValues>({
  control,
  name,
  propertyId,
  maxImages = 20,
  requiredTypes = [],
  label = 'Documents',
  description,
  placeholder = 'Tap to upload documents',
  disabled = false,
}: DocumentUploadFieldProps<T>) {
  const [modalOpen, setModalOpen] = useState(false);

  // ✅ Declare reusable callbacks outside of render()
  const handleRemove = useCallback(
    (photoId: string, photos: PhotoData[], onChange: (value: any) => void) => {
      const updatedPhotos = photos.filter((p) => p.id !== photoId);
      const removedPhoto = photos.find((p) => p.id === photoId);
      if (removedPhoto?.preview.startsWith('blob:')) {
        URL.revokeObjectURL(removedPhoto.preview);
      }
      onChange(updatedPhotos);
    },
    []
  );

  const handleSave = useCallback(
    (updatedPhotos: PhotoData[], onChange: (value: any) => void) => {
      onChange(updatedPhotos);
    },
    []
  );

  return (
    <FormField
      control={control}
      name={name}
      rules={{
        validate: {
          required: (photos: PhotoData[]) =>
            photos.length > 0 || 'Please upload at least one document',
          noPending: (photos: PhotoData[]) => {
            const pending = photos.filter((p) =>
              ['idle', 'compressing', 'uploading'].includes(p.status)
            );
            return pending.length === 0 || `${pending.length} upload(s) still in progress`;
          },
          noErrors: (photos: PhotoData[]) => {
            const errors = photos.filter((p) => p.status === 'error');
            return errors.length === 0 || `${errors.length} upload(s) failed. Please retry or remove.`;
          },
          hasMetadata: (photos: PhotoData[]) => {
            const incomplete = photos.filter(
              (p) => !p.metadata.type || p.metadata.title.trim().length < 3
            );
            return incomplete.length === 0 || `${incomplete.length} document(s) missing details`;
          },
          requiredTypes: (photos: PhotoData[]) => {
            if (requiredTypes.length === 0) return true;
            const uploadedTypes = photos
              .filter((p) => p.status === 'done')
              .map((p) => p.metadata.type);
            const missing = requiredTypes.filter((t) => !uploadedTypes.includes(t));
            return missing.length === 0 || `Missing required: ${missing.join(', ')}`;
          },
        },
      }}
      render={({ field }) => {
        const photos = (field.value as PhotoData[]) || [];
        const doneCount = photos.filter((p) => p.status === 'done').length;
        const pendingCount = photos.filter((p) =>
          ['idle', 'compressing', 'uploading'].includes(p.status)
        ).length;
        const errorCount = photos.filter((p) => p.status === 'error').length;

        return (
          <FormItem>
            <FormLabel className="text-base sm:text-sm">{label}</FormLabel>
            <FormControl>
              <div className="space-y-3 sm:space-y-2">
                <div
                  onClick={() => !disabled && setModalOpen(true)}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
                      e.preventDefault();
                      setModalOpen(true);
                    }
                  }}
                  tabIndex={disabled ? -1 : 0}
                  role="button"
                  aria-label={`Upload documents. ${photos.length} document(s) selected`}
                  aria-disabled={disabled}
                  className={cn(
                    'p-4 sm:p-3 border-2 rounded-xl sm:rounded-lg transition-all',
                    'min-h-[100px] sm:min-h-[80px]',
                    !disabled && 'cursor-pointer hover:border-primary',
                    !disabled &&
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    disabled && 'opacity-50 cursor-not-allowed',
                    photos.length === 0 && 'border-dashed',
                    photos.length > 0 && 'border-solid'
                  )}
                >
                  {photos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-4 sm:py-2">
                      <Upload className="h-8 w-8 sm:h-6 sm:w-6 text-muted-foreground mb-2 sm:mb-1" />
                      <p className="text-sm sm:text-sm text-muted-foreground">{placeholder}</p>
                    </div>
                  ) : (
                    <div className="space-y-3 sm:space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {photos.map((photo) => (
                          <FileChip
                            key={photo.id}
                            filename={photo.filename}
                            status={photo.status}
                            onRemove={() => handleRemove(photo.id, photos, field.onChange)}
                          />
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium">
                          {doneCount} of {photos.length} ready
                        </span>
                        {pendingCount > 0 && (
                          <span className="flex items-center gap-1 text-amber-700 dark:text-amber-400">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            {pendingCount} uploading
                          </span>
                        )}
                        {errorCount > 0 && (
                          <span className="flex items-center gap-1 text-destructive">
                            <AlertCircle className="h-3 w-3" />
                            {errorCount} failed
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => setModalOpen(true)}
                  disabled={disabled}
                  className="w-full sm:w-auto"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {photos.length === 0 ? 'Upload Documents' : 'Add More'}
                </Button>

                <DocumentUploadModal
                  open={modalOpen}
                  onOpenChange={setModalOpen}
                  photos={photos}
                  onSave={(updated) => handleSave(updated, field.onChange)}
                  propertyId={propertyId}
                  maxImages={maxImages}
                  requiredTypes={requiredTypes}
                />
              </div>
            </FormControl>
            {description && (
              <FormDescription className="text-sm sm:text-xs">{description}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
