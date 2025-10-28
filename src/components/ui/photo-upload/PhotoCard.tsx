import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  Loader2,
  XCircle,
} from 'lucide-react';
import { Button } from '@3rdparty/ui/button';
import { Input } from '@3rdparty/ui/input';
import { Label } from '@3rdparty/ui/label';
import { Textarea } from '@3rdparty/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@3rdparty/ui/select';
import { Badge } from '@3rdparty/ui/badge';
import { cn } from '@lib/utils';
import Image from 'next/image';

export type UploadStatus = 'idle' | 'compressing' | 'uploading' | 'done' | 'error';

export const PHOTO_TYPES = [
  'Property Photo',
  'Survey Plan',
  'C of O',
  'Deed',
  'Receipt',
  'Other',
] as const;

export type PhotoType = typeof PHOTO_TYPES[number];

export interface PhotoMetadata {
  type: PhotoType | '';
  title: string;
  description: string;
}

export interface PhotoData {
  id: string;
  file?: File;
  preview: string;
  filename: string;
  size: number;
  status: UploadStatus;
  progress: number;
  error?: string;
  uploadedUrl?: string;
  metadata: PhotoMetadata;
}

interface PhotoCardProps {
  photo: PhotoData;
  onDelete: (id: string) => void;
  onRetry: (id: string) => void;
  onCancel: (id: string) => void;
  onMetadataChange: (id: string, metadata: Partial<PhotoMetadata>) => void;
  requiredTypes?: PhotoType[];
  'aria-label'?: string;
}

export function PhotoCard({
  photo,
  onDelete,
  onRetry,
  onCancel,
  onMetadataChange,
  requiredTypes = [],
  'aria-label': ariaLabel,
}: PhotoCardProps) {
  const [titleError, setTitleError] = useState('');
  const [typeError, setTypeError] = useState('');

  const validateTitle = (value: string) => {
    if (!value.trim()) {
      setTitleError('Title is required');
      return false;
    }
    if (value.trim().length < 3) {
      setTitleError('Title must be at least 3 characters');
      return false;
    }
    if (value.length > 120) {
      setTitleError('Title must be less than 120 characters');
      return false;
    }
    setTitleError('');
    return true;
  };

  const validateType = (value: string) => {
    if (!value) {
      setTypeError('Type is required');
      return false;
    }
    setTypeError('');
    return true;
  };

  useEffect(() => {
    if (photo.metadata.title) validateTitle(photo.metadata.title);
    if (photo.metadata.type) validateType(photo.metadata.type);
  }, [photo.metadata.title, photo.metadata.type]);

  const statusConfig = {
    idle: { icon: ImageIcon, color: 'text-muted-foreground', label: 'Ready' },
    compressing: { icon: Loader2, color: 'text-warning', label: 'Compressing...' },
    uploading: { icon: Loader2, color: 'text-primary', label: 'Uploading...' },
    done: { icon: CheckCircle2, color: 'text-success', label: 'Uploaded' },
    error: { icon: AlertCircle, color: 'text-destructive', label: 'Failed' },
  };

  const config = statusConfig[photo.status];
  const Icon = config.icon;
  const isProcessing = photo.status === 'compressing' || photo.status === 'uploading';
  const isDone = photo.status === 'done';
  const hasError = photo.status === 'error';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      className={cn(
        'relative rounded-xl border bg-card shadow-sm overflow-hidden',
        'transition-all duration-200',
        hasError && 'border-destructive/50 bg-destructive-light/20',
        isDone && 'border-success/50'
      )}
      aria-label={ariaLabel}
    >
      {/* Image preview */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        <Image
          src={photo.preview}
          alt={photo.metadata.title || photo.filename}
          className="w-full h-full object-cover"
        />

        {/* Status overlay */}
        <AnimatePresence>
          {(isProcessing || hasError) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="text-center">
                <Icon
                  className={cn('h-8 w-8 mx-auto mb-2', config.color, {
                    'animate-spin': isProcessing,
                  })}
                />
                <p className="text-sm font-medium">{config.label}</p>
                {photo.progress > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {photo.progress}%
                  </p>
                )}
                {isProcessing && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onCancel(photo.id)}
                    className="mt-3"
                    aria-label="Cancel upload"
                  >
                    <XCircle className="h-3.5 w-3.5 mr-1.5" />
                    Cancel
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete button */}
        <Button
          size="icon"
          variant="destructive"
          onClick={() => onDelete(photo.id)}
          className="absolute top-2 right-2 h-8 w-8 shadow-md"
          aria-label={`Delete ${photo.filename}`}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Done indicator */}
        {isDone && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 left-2 bg-success text-success-foreground rounded-full p-1.5"
          >
            <CheckCircle2 className="h-4 w-4" />
          </motion.div>
        )}
      </div>

      {/* Progress bar */}
      {isProcessing && (
        <div className="relative h-1 bg-progress-bg overflow-hidden">
          <motion.div
            className={cn(
              'absolute inset-y-0 left-0',
              photo.status === 'compressing'
                ? 'bg-progress-compressing'
                : 'bg-progress-uploading'
            )}
            initial={{ width: 0 }}
            animate={{ width: `${photo.progress}%` }}
            transition={{ duration: 0.3 }}
          />
          {photo.status === 'compressing' && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </div>
      )}

      {/* Metadata form */}
      <div className="p-4 space-y-3">
        {/* File info */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ImageIcon className="h-3.5 w-3.5" />
          <span className="truncate flex-1">{photo.filename}</span>
          <span>{(photo.size / 1024).toFixed(0)}KB</span>
        </div>

        {/* Error message */}
        {hasError && photo.error && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="flex items-start gap-2 p-3 rounded-lg bg-destructive-light text-destructive text-sm"
            role="alert"
          >
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium">Upload failed</p>
              <p className="text-xs mt-1">{photo.error}</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onRetry(photo.id)}
              className="flex-shrink-0"
              aria-label="Retry upload"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1" />
              Retry
            </Button>
          </motion.div>
        )}

        {/* Type select */}
        <div className="space-y-1.5">
          <Label htmlFor={`type-${photo.id}`} className="text-xs">
            Type <span className="text-destructive">*</span>
          </Label>
          <Select
            value={photo.metadata.type}
            onValueChange={(value: PhotoType) => {
              onMetadataChange(photo.id, { type: value });
              validateType(value);
            }}
          >
            <SelectTrigger
              id={`type-${photo.id}`}
              className={cn('h-9', typeError && 'border-destructive')}
              aria-describedby={typeError ? `type-error-${photo.id}` : undefined}
            >
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {PHOTO_TYPES.map((type) => {
                const isRequired = requiredTypes.includes(type);
                return (
                  <SelectItem key={type} value={type}>
                    <span className="flex items-center gap-2">
                      {type}
                      {isRequired && (
                        <Badge variant="destructive" className="text-xs">Required</Badge>
                      )}
                    </span>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {typeError && (
            <p
              id={`type-error-${photo.id}`}
              className="text-xs text-destructive"
              role="alert"
            >
              {typeError}
            </p>
          )}
        </div>

        {/* Title input */}
        <div className="space-y-1.5">
          <Label htmlFor={`title-${photo.id}`} className="text-xs">
            Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id={`title-${photo.id}`}
            value={photo.metadata.title}
            onChange={(e) => {
              const value = e.target.value;
              onMetadataChange(photo.id, { title: value });
              validateTitle(value);
            }}
            onBlur={(e) => validateTitle(e.target.value)}
            placeholder="e.g., Front elevation view"
            maxLength={120}
            className={cn('h-9', titleError && 'border-destructive')}
            aria-describedby={titleError ? `title-error-${photo.id}` : undefined}
          />
          {titleError && (
            <p
              id={`title-error-${photo.id}`}
              className="text-xs text-destructive"
              role="alert"
            >
              {titleError}
            </p>
          )}
        </div>

        {/* Description textarea */}
        <div className="space-y-1.5">
          <Label htmlFor={`description-${photo.id}`} className="text-xs">
            Description <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Textarea
            id={`description-${photo.id}`}
            value={photo.metadata.description}
            onChange={(e) =>
              onMetadataChange(photo.id, { description: e.target.value })
            }
            placeholder="Add any additional details..."
            maxLength={1000}
            rows={2}
            className="text-sm resize-none"
          />
          <p className="text-xs text-muted-foreground text-right">
            {photo.metadata.description.length}/1000
          </p>
        </div>
      </div>
    </motion.div>
  );
}
