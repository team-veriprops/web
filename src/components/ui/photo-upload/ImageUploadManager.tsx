import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle2, AlertTriangle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import imageCompression from 'browser-image-compression';
import { Button } from '@3rdparty/ui/button';
import { UploadZone } from './UploadZone';
import { PhotoCard, PhotoData, PhotoMetadata, PhotoType, PHOTO_TYPES } from './PhotoCard';
import {
  validateFile,
  requestSignedUrl,
  uploadToSignedUrl,
  trackEvent,
} from '@lib/uploadService';
import { cn } from '@lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@3rdparty/ui/alert';
import { toast } from '@components/3rdparty/ui/use-toast';

interface ImageUploadManagerProps {
  propertyId?: string;
  maxImages?: number;
  onSubmit?: (photos: Array<{ title: string; description: string; type: string; url: string }>) => void;
  onChange?: (photos: PhotoData[]) => void;
  seedPhotos?: PhotoData[];
  requiredTypes?: PhotoType[];
  hideSubmit?: boolean;
  mode?: 'standalone' | 'modal';
}

export function ImageUploadManager({
  propertyId = 'demo-property',
  maxImages = 20,
  onSubmit,
  onChange,
  seedPhotos = [],
  requiredTypes = [],
  hideSubmit = false,
  mode = 'standalone',
}: ImageUploadManagerProps) {
  const [photos, setPhotos] = useState<PhotoData[]>(seedPhotos);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const abortControllersRef = useRef<Map<string, AbortController>>(new Map());
  const blobUrlsRef = useRef<Set<string>>(new Set());

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      blobUrlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      blobUrlsRef.current.clear();
    };
  }, []);

  // Offline detection with auto-retry
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: 'Back online',
        description: 'Your connection has been restored. Retrying failed uploads...',
      });
      photos.forEach((photo) => {
        if (photo.status === 'error' && photo.file) {
          processUpload(photo);
        }
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "You're offline",
        description: 'Uploads will resume when your connection is restored.',
        variant: 'destructive',
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [photos]);

  // Emit onChange when photos change
  useEffect(() => {
    if (onChange) {
      onChange(photos);
    }
  }, [photos, onChange]);

  const handleFilesSelected = useCallback(
    (fileList: FileList) => {
      const files = Array.from(fileList);

      // Check if we exceed max images
      if (photos.length + files.length > maxImages) {
        toast({
          title: 'Too many files',
          description: `You can only upload ${maxImages} images total. ${maxImages - photos.length} slots remaining.`,
          variant: 'destructive',
        });
        return;
      }

      const newPhotos: PhotoData[] = [];

      files.forEach((file) => {
        // Validate file
        const validation = validateFile(file);
        if (!validation.valid) {
          toast({
            title: 'Invalid file',
            description: validation.error,
            variant: 'destructive',
          });
          return;
        }

        // Create photo entry
        const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const preview = URL.createObjectURL(file);
        blobUrlsRef.current.add(preview);

        newPhotos.push({
          id,
          file,
          preview,
          filename: file.name,
          size: file.size,
          status: 'idle',
          progress: 0,
          metadata: {
            type: '',
            title: '',
            description: '',
          },
        });

        trackEvent('upload_start', {
          id,
          filename: file.name,
          size: file.size,
        });
      });

      if (newPhotos.length > 0) {
        setPhotos((prev) => [...prev, ...newPhotos]);
        // Auto-start upload
        newPhotos.forEach((photo) => {
          processUpload(photo);
        });
      }
    },
    [photos.length, maxImages]
  );

  const updatePhotoStatus = useCallback(
    (id: string, updates: Partial<PhotoData>) => {
      setPhotos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
      );
    },
    []
  );

  const processUpload = useCallback(async (photo: PhotoData) => {
    if (!photo.file) return;

    const controller = new AbortController();
    abortControllersRef.current.set(photo.id, controller);
    const startTime = Date.now();

    try {
      // Step 1: Compression
      updatePhotoStatus(photo.id, { status: 'compressing', progress: 10 });

      const compressedFile = await imageCompression(photo.file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
        exifOrientation: 1,
        onProgress: (progress) => {
          const mappedProgress = 10 + Math.round(progress * 0.2);
          updatePhotoStatus(photo.id, { progress: mappedProgress });
        },
      });

      updatePhotoStatus(photo.id, { progress: 30 });

      // Step 2: Request signed URL
      const signedUrlResponse = await requestSignedUrl({
        filename: photo.filename,
        contentType: compressedFile.type,
        folder: `properties/${propertyId}`,
      });

      // Step 3: Upload to signed URL
      updatePhotoStatus(photo.id, { status: 'uploading', progress: 35 });

      await uploadToSignedUrl(compressedFile, signedUrlResponse.uploadUrl, {
        signal: controller.signal,
        onProgress: (progress) => {
          const mappedProgress = 35 + Math.round(progress.percent * 0.65);
          updatePhotoStatus(photo.id, { progress: mappedProgress });
        },
        onExpiredUrl: async () => {
          console.log('Requesting fresh signed URL for', photo.filename);
          const freshData = await requestSignedUrl({
            filename: photo.filename,
            contentType: compressedFile.type,
            folder: `properties/${propertyId}`,
          });
          return freshData.uploadUrl;
        },
      });

      // Success
      const duration = Date.now() - startTime;
      updatePhotoStatus(photo.id, {
        status: 'done',
        progress: 100,
        uploadedUrl: signedUrlResponse.publicUrl,
      });

      trackEvent('upload_complete', {
        id: photo.id,
        filename: photo.filename,
        bytes: photo.size,
        duration,
        publicUrl: signedUrlResponse.publicUrl,
      });

      toast({
        title: 'Upload successful',
        description: `${photo.filename} uploaded successfully`,
      });
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return;
      }

      if (error.status === 409) {
        toast({
          title: 'Duplicate file detected',
          description: 'This file may already exist.',
        });
        updatePhotoStatus(photo.id, {
          status: 'done',
          progress: 100,
          uploadedUrl: error.existingUrl || photo.uploadedUrl,
        });
        return;
      }

      const errorMessage =
        error.message === 'Upload cancelled'
          ? 'Upload cancelled'
          : error.message || 'Network error during upload';

      updatePhotoStatus(photo.id, {
        status: 'error',
        error: errorMessage,
      });

      trackEvent('upload_fail', {
        id: photo.id,
        filename: photo.filename,
        error: errorMessage,
      });

      if (error.message !== 'Upload cancelled') {
        toast({
          title: 'Upload failed',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    } finally {
      abortControllersRef.current.delete(photo.id);
    }
  }, [propertyId, updatePhotoStatus]);

  const handleDelete = useCallback((id: string) => {
    // Cancel upload if in progress
    const controller = abortControllersRef.current.get(id);
    if (controller) {
      controller.abort();
      abortControllersRef.current.delete(id);
    }

    setPhotos((prev) => {
      const photo = prev.find((p) => p.id === id);
      if (photo && photo.preview.startsWith('blob:')) {
        URL.revokeObjectURL(photo.preview);
        blobUrlsRef.current.delete(photo.preview);
      }
      return prev.filter((p) => p.id !== id);
    });
  }, []);

  const handleCancel = useCallback((id: string) => {
    const controller = abortControllersRef.current.get(id);
    if (controller) {
      controller.abort();
      abortControllersRef.current.delete(id);
      updatePhotoStatus(id, { 
        status: 'idle', 
        progress: 0, 
        error: undefined 
      });
      toast({
        title: 'Upload cancelled',
        description: 'You can retry when ready',
      });
    }
  }, [updatePhotoStatus]);

  const handleCancelAll = useCallback(() => {
    const cancelledCount = abortControllersRef.current.size;
    abortControllersRef.current.forEach((controller) => {
      controller.abort();
    });
    abortControllersRef.current.clear();
    
    setPhotos((prev) =>
      prev.map((p) =>
        p.status === 'compressing' || p.status === 'uploading'
          ? { ...p, status: 'idle', progress: 0, error: undefined }
          : p
      )
    );

    if (cancelledCount > 0) {
      toast({
        title: 'All uploads cancelled',
        description: `${cancelledCount} upload${cancelledCount > 1 ? 's' : ''} cancelled`,
      });
    }
  }, []);

  const handleRetry = useCallback(
    (id: string) => {
      const photo = photos.find((p) => p.id === id);
      if (photo) {
        updatePhotoStatus(id, { status: 'idle', progress: 0, error: undefined });
        processUpload(photo);
      }
    },
    [photos, processUpload, updatePhotoStatus]
  );

  const handleMetadataChange = useCallback(
    (id: string, metadata: Partial<PhotoMetadata>) => {
      setPhotos((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, metadata: { ...p.metadata, ...metadata } } : p
        )
      );
    },
    []
  );

  const getMissingRequiredTypes = useCallback((): PhotoType[] => {
    if (!requiredTypes || requiredTypes.length === 0) return [];
    
    const uploadedTypes = photos
      .filter((p) => p.status === 'done' && p.metadata.type)
      .map((p) => p.metadata.type as PhotoType);
    
    return requiredTypes.filter(
      (reqType) => !uploadedTypes.includes(reqType)
    );
  }, [photos, requiredTypes]);

  const missingTypes = getMissingRequiredTypes();

  const uploadingCount = photos.filter(
    (p) => p.status === 'compressing' || p.status === 'uploading'
  ).length;
  const errorCount = photos.filter((p) => p.status === 'error').length;
  const doneCount = photos.filter((p) => p.status === 'done').length;

  const canSubmit = 
    photos.length > 0 &&
    photos.filter((p) => p.status !== 'error').every(
      (p) =>
        p.status === 'done' &&
        p.metadata.type &&
        p.metadata.title.trim().length >= 3
    ) &&
    missingTypes.length === 0;

  const handleSubmit = useCallback(async () => {
    if (!canSubmit) return;

    if (missingTypes.length > 0) {
      trackEvent('submit_blocked_missing_required_types', {
        property_id: propertyId,
        missing_types: missingTypes,
        uploaded_count: photos.filter(p => p.status === 'done').length,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = photos
        .filter((p) => p.status === 'done')
        .map((p) => ({
          title: p.metadata.title.trim(),
          description: p.metadata.description.trim(),
          type: p.metadata.type,
          url: p.uploadedUrl!,
        }));

      // TODO: Replace with actual API call
      // await fetch(`/api/properties/${propertyId}/photos`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ photos: payload }),
      // });

      trackEvent('metadata_saved', { 
        property_id: propertyId,
        count: payload.length,
        total_photos: photos.length,
        skipped_errors: errorCount
      });

      if (onSubmit) {
        onSubmit(payload);
      }

      toast({
        title: 'Photos saved',
        description: `${payload.length} photo${payload.length > 1 ? 's' : ''} saved successfully`,
      });

      // Clear photos after successful submit and revoke blob URLs
      photos.forEach((photo) => {
        if (photo.preview.startsWith('blob:')) {
          URL.revokeObjectURL(photo.preview);
          blobUrlsRef.current.delete(photo.preview);
        }
      });
      setPhotos([]);
    } catch (error: any) {
      toast({
        title: 'Save failed',
        description: error.message || 'Failed to save photos',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [canSubmit, photos, propertyId, onSubmit, missingTypes, errorCount]);

  return (
    <div className={cn(mode === 'modal' ? 'space-y-4' : 'space-y-6')}>
      <UploadZone
        onFilesSelected={handleFilesSelected}
        maxFiles={maxImages}
        currentFileCount={photos.length}
        disabled={!isOnline}
      />

      {/* Stats bar */}
      {photos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-4 p-4 rounded-lg bg-muted/50 text-sm"
        >
          <div className="flex items-center gap-2">
            <Upload className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{photos.length}</span>
            <span className="text-muted-foreground">
              image{photos.length !== 1 ? 's' : ''}
            </span>
          </div>
          {uploadingCount > 0 && (
            <>
              <div className="flex items-center gap-2 text-primary">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span>{uploadingCount} uploading</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancelAll}
                className="h-8"
              >
                <XCircle className="h-3.5 w-3.5 mr-1.5" />
                Cancel All
              </Button>
            </>
          )}
          {doneCount > 0 && (
            <div className="flex items-center gap-2 text-success">
              <CheckCircle2 className="h-4 w-4" />
              <span>{doneCount} completed</span>
            </div>
          )}
          {errorCount > 0 && (
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-4 w-4" />
              <span>{errorCount} failed</span>
            </div>
          )}
        </motion.div>
      )}

      {/* Photo grid */}
      <AnimatePresence mode="popLayout">
        {photos.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {photos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onDelete={handleDelete}
                onRetry={handleRetry}
                onCancel={handleCancel}
                onMetadataChange={handleMetadataChange}
                requiredTypes={requiredTypes}
                aria-label={`Photo card for ${photo.filename}`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Missing required types alert */}
      {photos.length > 0 && missingTypes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Missing Required Documents</AlertTitle>
            <AlertDescription>
              Please upload the following required document types:
              <ul className="list-disc list-inside mt-2 space-y-1">
                {missingTypes.map((type) => (
                  <li key={type} className="font-medium">{type}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Submit button */}
      {!hideSubmit && photos.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
            size="lg"
            className="w-full sm:w-auto relative"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Submit Documents
                {doneCount > 0 && (
                  <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    {doneCount}
                  </span>
                )}
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
