// Veriprops Toast Notification Provider
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Button } from '@3rdparty/ui/button';
import { useToasts } from '@stores/useStore';

export const ToastProvider: React.FC = () => {
  const { toasts, removeToast } = useToasts();

  const getToastIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-success" />;
      case 'error':
        return <AlertCircle size={20} className="text-destructive" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-warning" />;
      default:
        return <Info size={20} className="text-primary" />;
    }
  };

  const getToastStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-success/10 border-success/30 text-success';
      case 'error':
        return 'bg-destructive/10 border-destructive/30 text-destructive';
      case 'warning':
        return 'bg-warning/10 border-warning/30 text-foreground';
      default:
        return 'bg-primary/10 border-primary/30 text-primary';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2 max-w-sm w-full">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`rounded-xl border p-4 shadow-lg backdrop-blur-sm ${getToastStyles(toast.type)}`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {getToastIcon(toast.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-5">
                  {toast.message}
                </p>
                
                {toast.action && (
                  <div className="mt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        toast.action?.onClick();
                        removeToast(toast.id);
                      }}
                      className="h-8 px-3 text-xs hover:bg-white/20"
                    >
                      {toast.action.label}
                    </Button>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 p-1 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
