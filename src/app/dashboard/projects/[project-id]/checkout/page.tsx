'use client'

import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@3rdparty/ui/card';
import { Button } from '@3rdparty/ui/button';
import { Badge } from '@3rdparty/ui/badge';
import { Separator } from '@3rdparty/ui/separator';
// import { useAuth } from '@/contexts/AuthContext';
// import { supabase } from '@/integrations/supabase/client';
// import { useToast } from '@/hooks/use-toast';
// import { FullPageLoading } from '@3rdparty/ui/loading-spinner';
import { 
  CreditCard, 
  ArrowLeft, 
  CheckCircle, 
  Calendar, 
  DollarSign,
  Receipt,
  Shield
} from 'lucide-react';

interface Project {
  id: string;
  project_reference_id: string;
  full_name: string;
  company_name?: string;
  budget_range?: string;
  timeline?: string;
  contract_signed: boolean;
  payment_completed: boolean;
}

// Mock payment milestones - in real app, this would come from the database
const paymentMilestones = [
  { id: 1, name: "Project Kickoff", amount: 5000, dueDate: "2024-01-15", status: "due" },
  { id: 2, name: "Design & Planning", amount: 3000, dueDate: "2024-02-15", status: "upcoming" },
  { id: 3, name: "Development Phase 1", amount: 7000, dueDate: "2024-03-15", status: "upcoming" },
  { id: 4, name: "Development Phase 2", amount: 7000, dueDate: "2024-04-15", status: "upcoming" },
  { id: 5, name: "Testing & Launch", amount: 3000, dueDate: "2024-05-15", status: "upcoming" },
];

const paymentHistory = [
  { id: 1, date: "2024-01-10", amount: 2500, description: "Initial deposit", status: "paid" },
];

export default function Checkout() {
//   const { projectId } = useParams<{ projectId: string }>();
//   const navigate = useNavigate();
//   const { user, loading: authLoading } = useAuth();
//   const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const projectId = "projectID"

  useEffect(() => {
    // if (!authLoading && !user) {
    //   navigate('/login');
    //   return;
    // }

      fetchProject();

  }, [projectId]);

  const fetchProject = async () => {
    const projectData: Project = {
        id:"project-id-1",
        project_reference_id: "project_reference_id",
        full_name: "full_name",
        company_name: "Appodus",
        budget_range: "10k-20k",
        timeline: "ASAP",
        contract_signed: true,
        payment_completed: false
        }
    setProject(projectData);
    // try {
    //   const { data: projectData, error: projectError } = await supabase
    //     .from('projects')
    //     .select('*')
    //     .eq('id', projectId)
    //     .single();

    //   if (projectError) throw projectError;
    //   setProject(projectData);
    // } catch (error) {
    //   console.error('Error fetching project:', error);
    //   toast({
    //     title: "Error",
    //     description: "Failed to load project details",
    //     variant: "destructive"
    //   });
    //   navigate('/');
    // } finally {
    //   setLoading(false);
    // }
  };

  const handlePayment = async () => {
    // setProcessing(true);
    
    // // Simulate payment processing
    // setTimeout(() => {
    //   toast({
    //     title: "Payment Successful!",
    //     description: "Your payment has been processed successfully.",
    //   });
      
    //   // In a real app, you'd integrate with Stripe/Paystack/Flutterwave here
    //   navigate(`/project/${projectId}`);
    //   setProcessing(false);
    // }, 2000);
  };

  const currentDue = paymentMilestones.find(m => m.status === "due");
  const totalProject = paymentMilestones.reduce((sum, m) => sum + m.amount, 0);
  const totalPaid = paymentHistory.reduce((sum, h) => sum + h.amount, 0);
  const remaining = totalProject - totalPaid;

//   if (authLoading || loading) {
//     return <FullPageLoading text="Loading checkout..." />;
//   }

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm"
            //   onClick={() => navigate(`/project/${projectId}`)}
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Project
            </Button>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Payment Checkout</h1>
            <p className="text-muted-foreground mb-4">
              {project.company_name || 'Project'} - {project.project_reference_id}
            </p>
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-accent-strong" />
              <span className="text-sm text-muted-foreground">Secured by SSL encryption</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Plan & What's Due */}
          <div className="space-y-6">
            {/* What's Due Now */}
            {currentDue && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      Due Now
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{currentDue.name}</span>
                        <span className="text-2xl font-bold text-primary">
                          ${currentDue.amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        Due by {new Date(currentDue.dueDate).toLocaleDateString()}
                      </div>
                      <Separator />
                      <div className="text-sm">
                        <p className="font-medium mb-2">Payment includes:</p>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Project initialization and setup</li>
                          <li>• Technical architecture planning</li>
                          <li>• Initial development resources</li>
                          <li>• Dedicated project manager assignment</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Payment Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Payment Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {paymentMilestones.map((milestone) => (
                      <div 
                        key={milestone.id}
                        className="flex items-center justify-between py-2 border-b last:border-b-0"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{milestone.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Due: {new Date(milestone.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            ${milestone.amount.toLocaleString()}
                          </span>
                          {milestone.status === "due" && (
                            <Badge variant="destructive" className="text-xs">Due</Badge>
                          )}
                          {milestone.status === "upcoming" && (
                            <Badge variant="secondary" className="text-xs">Upcoming</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Project Value:</span>
                      <span className="font-medium">${totalProject.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount Paid:</span>
                      <span className="font-medium text-accent-strong">${totalPaid.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Remaining Balance:</span>
                      <span>${remaining.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Payment History & Action */}
          <div className="space-y-6">
            {/* Payment History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="w-5 h-5" />
                    Payment History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {paymentHistory.length > 0 ? (
                    <div className="space-y-3">
                      {paymentHistory.map((payment) => (
                        <div 
                          key={payment.id}
                          className="flex items-center justify-between py-2 border-b last:border-b-0"
                        >
                          <div>
                            <p className="font-medium">{payment.description}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(payment.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              ${payment.amount.toLocaleString()}
                            </span>
                            <CheckCircle className="w-4 h-4 text-accent-strong" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      No payments made yet
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Payment Action */}
            {currentDue && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-primary/20">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold">Complete Payment</h3>
                      <p className="text-muted-foreground">
                        Secure payment processing powered by industry-leading providers
                      </p>
                      
                      <div className="space-y-3">
                        <Button 
                          onClick={handlePayment}
                          disabled={processing || !project.contract_signed}
                          size="lg"
                          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                        >
                          {processing ? (
                            <>Processing...</>
                          ) : (
                            <>
                              <CreditCard className="mr-2 w-5 h-5" />
                              Pay ${currentDue.amount.toLocaleString()} Now
                            </>
                          )}
                        </Button>
                        
                        {!project.contract_signed && (
                          <p className="text-sm text-muted-foreground">
                            Contract must be signed before payment can be processed
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                        <span>Visa</span>
                        <span>Mastercard</span>
                        <span>PayPal</span>
                        <span>Bank Transfer</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile Sticky Payment Button */}
        {currentDue && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t lg:hidden"
          >
            <Button 
              onClick={handlePayment}
              disabled={processing || !project.contract_signed}
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              {processing ? (
                <>Processing...</>
              ) : (
                <>
                  <CreditCard className="mr-2 w-5 h-5" />
                  Pay ${currentDue.amount.toLocaleString()}
                </>
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
