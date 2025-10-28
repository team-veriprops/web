import { motion } from 'framer-motion';
import { 
  PlayCircle, 
  CreditCard, 
  FileCheck, 
  PenTool, 
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';
import { QueryPurchaseDetailDto, TimelineStep, TransactionStatus } from './models';

interface TransactionTimelineProps {
  purchaseDetail: QueryPurchaseDetailDto;
}

export function TransactionTimeline({ purchaseDetail }: TransactionTimelineProps) {
  const getTimelineSteps = (purchaseDetail: QueryPurchaseDetailDto): TimelineStep[] => {
    const steps: TimelineStep[] = [
      {
        id: 'initiated',
        title: 'Transaction Initiated',
        description: 'Property purchase request submitted',
        status: 'completed',
        date: purchaseDetail.date_created,
        icon: 'PlayCircle'
      },
      {
        id: 'payment_secured',
        title: 'Payment Secured',
        description: 'Funds deposited into escrow account',
        status: purchaseDetail.status === 'initiated' ? 'pending' : 'completed',
        date: purchaseDetail.status !== 'initiated' ? purchaseDetail.date_updated : undefined,
        icon: 'CreditCard'
      },
      {
        id: 'verification',
        title: 'Document Verification',
        description: 'Property documents reviewed and verified',
        status: ['initiated', 'payment_secured'].includes(purchaseDetail.status) ? 'pending' : 'completed',
        date: !['initiated', 'payment_secured'].includes(purchaseDetail.status) ? purchaseDetail.date_updated : undefined,
        icon: 'FileCheck'
      },
      {
        id: 'contract_signed',
        title: 'Contract Signing',
        description: 'Legal contract signed by all parties',
        status: purchaseDetail.contract_signed ? 'completed' : 
                ['initiated', 'payment_secured', 'pending_verification'].includes(purchaseDetail.status) ? 'pending' : 'current',
        date: purchaseDetail.contract_signed ? purchaseDetail.date_updated : undefined,
        icon: 'PenTool'
      },
      {
        id: 'completed',
        title: 'Transaction Completed',
        description: 'Property ownership transferred successfully',
        status: purchaseDetail.status === TransactionStatus.COMPLETED ? 'completed' : 'pending',
        date: purchaseDetail.status === TransactionStatus.COMPLETED ? purchaseDetail.date_updated : undefined,
        icon: 'CheckCircle2'
      }
    ];

    // Handle failed/cancelled states
    if (purchaseDetail.status === TransactionStatus.FAILED || purchaseDetail.status === TransactionStatus.CANCELLED) {
      steps.push({
        id: 'failed',
        title: purchaseDetail.status === TransactionStatus.FAILED ? 'Transaction Failed' : 'Transaction Cancelled',
        description: purchaseDetail.status === TransactionStatus.FAILED ? 'Transaction could not be completed' : 'Transaction was cancelled by user',
        status: 'completed',
        date: purchaseDetail.date_updated,
        icon: 'XCircle'
      });
    }

    return steps;
  };

  const steps = getTimelineSteps(purchaseDetail);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'PlayCircle': return PlayCircle;
      case 'CreditCard': return CreditCard;
      case 'FileCheck': return FileCheck;
      case 'PenTool': return PenTool;
      case 'CheckCircle2': return CheckCircle2;
      case 'XCircle': return XCircle;
      default: return Clock;
    }
  };

  const getStepStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          iconBg: 'bg-success',
          iconColor: 'text-success-foreground',
          lineColor: 'bg-success',
          textColor: 'text-foreground'
        };
      case 'current':
        return {
          iconBg: 'bg-primary',
          iconColor: 'text-primary-foreground',
          lineColor: 'bg-muted',
          textColor: 'text-foreground'
        };
      default:
        return {
          iconBg: 'bg-muted',
          iconColor: 'text-muted-foreground',
          lineColor: 'bg-muted',
          textColor: 'text-muted-foreground'
        };
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Transaction Timeline</h3>
      
      <div className="relative">
        {steps.map((step, index) => {
          const Icon = getIcon(step.icon);
          const styles = getStepStyles(step.status);
          const isLast = index === steps.length - 1;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start pb-8"
            >
              {/* Timeline line */}
              {!isLast && (
                <div className={`absolute left-4 top-8 w-0.5 h-full ${styles.lineColor}`} />
              )}
              
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${styles.iconBg}`}
              >
                <Icon className={`w-4 h-4 ${styles.iconColor}`} />
              </motion.div>

              {/* Content */}
              <div className="ml-4 flex-1">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <h4 className={`font-medium ${styles.textColor}`}>{step.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                  {step.date && (
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(step.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  )}
                </motion.div>
              </div>

              {/* Status indicator */}
              {step.status === 'current' && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="ml-2 w-2 h-2 bg-primary rounded-full"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
