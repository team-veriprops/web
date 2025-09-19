'use client'

import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@3rdparty/ui/card';
import { Button } from '@3rdparty/ui/button';
import { Badge } from '@3rdparty/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@3rdparty/ui/accordion';
import { ProjectStages } from '@components/project/ProjectStages';
// import { useAuth } from '@/contexts/AuthContext';
// import { supabase } from '@/integrations/supabase/client';
// import { useToast } from '@/hooks/use-toast';
// import { FullPageLoading } from '@3rdparty/ui/loading-spinner';
import { 
  Edit3, 
  FileSignature, 
  CreditCard, 
  Mail, 
  Phone, 
  Building, 
  Calendar,
  Target,
  Layers,
  Settings
} from 'lucide-react';

interface Project {
  id: string;
  project_reference_id: string;
  full_name: string;
  email: string;
  phone?: string;
  company_name?: string;
  budget_range?: string;
  timeline?: string;
  what_building?: string;
  what_not_building?: string;
  customer_location?: string;
  build_type?: string;
  platform?: string;
  product_types?: string[];
  payments?: string[];
  messaging?: string[];
  current_stage: number;
  contract_signed: boolean;
  payment_completed: boolean;
  created_at: string;
}

interface ProjectStage {
  id: string;
  stage_number: number;
  stage_name: string;
  completed: boolean;
  completed_at: string | null;
}

export default function ProjectOverview() {
//   const { projectId } = useParams<{ projectId: string }>();
//   const navigate = useNavigate();
//   const { user, loading: authLoading } = useAuth();
//   const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [stages, setStages] = useState<ProjectStage[]>([]);
  const [loading, setLoading] = useState(true);
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
        email: "kingsley.ezenwere@gmail.com",
        project_reference_id: "project_reference_id",
        full_name: "full_name",
        company_name: "Appodus",
        budget_range: "10k-20k",
        timeline: "ASAP",
        contract_signed: true,
        payment_completed: false,
        created_at: "06/03/2025",
        current_stage: 3
        }
    setProject(projectData);

    const projectStageData: ProjectStage[] = [
      {
          id: "stage-id-1",
          stage_number: 1,
          stage_name: "Initiation",
          completed: true,
          completed_at: "06/03/2025",
          
        },
      {
          id: "stage-id-2",
          stage_number: 2,
          stage_name: "Ui/Ux",
          completed: true,
          completed_at: "06/05/2025",
          
        },
      {
          id: "stage-id-3",
          stage_number: 3,
          stage_name: "Backend Integration",
          completed: false,
          completed_at: "06/07/2025",
          
        },
      {
          id: "stage-id-4",
          stage_number: 4,
          stage_name: "Functional Test",
          completed: false,
          completed_at: "06/05/2025",
          
        },
      {
          id: "stage-id-5",
          stage_number: 5,
          stage_name: "Production Deployment",
          completed: false,
          completed_at: "06/07/2025",
          
        }
    ]

    setStages(projectStageData);
    // try {
    //   // Fetch project details
    //   const { data: projectData, error: projectError } = await supabase
    //     .from('projects')
    //     .select('*')
    //     .eq('id', projectId)
    //     .single();

    //   if (projectError) throw projectError;

    //   // Fetch project stages
    //   const { data: stagesData, error: stagesError } = await supabase
    //     .from('project_stages')
    //     .select('*')
    //     .eq('project_id', projectId)
    //     .order('stage_number');

    //   if (stagesError) throw stagesError;

    //   setProject(projectData);
    //   setStages(stagesData || []);
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

  const handleEditProject = () => {
    // navigate('/onboarding', { state: { projectId, editMode: true } });
  };

  const handleSignContract = () => {
    // This would integrate with Zoho Sign or similar
    // toast({
    //   title: "Opening Contract",
    //   description: "Redirecting to contract signing platform..."
    // });
  };

  const handleMakePayment = () => {
    // navigate(`/project/${projectId}/checkout`);
  };

  // if (authLoading || loading) {
  //   return <FullPageLoading text="Loading your project..." />;
  // }

  if (!project) {
    return null;
  }

  const canSignContract = project.current_stage >= 4;
  const canMakePayment = project.contract_signed && project.current_stage >= 5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {project.company_name || 'Your Project'}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>Project ID:</span>
                <Badge variant="outline" className="font-mono">
                  {project.project_reference_id}
                </Badge>
              </div>
            </div>
            
            <Button onClick={handleEditProject} variant="outline" size="lg">
              <Edit3 className="mr-2 w-4 h-4" />
              Edit Project
            </Button>
          </div>
        </motion.div>

        {/* Project Stages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <ProjectStages 
            stages={stages} 
            currentStage={project.current_stage}
          />
        </motion.div>

        {/* Project Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {/* Contact & Timeline */}
                <AccordionItem value="contact">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Contact & Timeline
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{project.full_name}</span>
                          <span className="text-muted-foreground">({project.email})</span>
                        </div>
                        {project.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span>{project.phone}</span>
                          </div>
                        )}
                        {project.company_name && (
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-muted-foreground" />
                            <span>{project.company_name}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-3">
                        {project.timeline && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>{project.timeline}</span>
                          </div>
                        )}
                        {project.budget_range && (
                          <Badge variant="secondary">{project.budget_range}</Badge>
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Project Mission */}
                <AccordionItem value="mission">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Project Mission
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      {project.what_building && (
                        <div>
                          <h4 className="font-medium mb-2">What you're building:</h4>
                          <p className="text-muted-foreground">{project.what_building}</p>
                        </div>
                      )}
                      {project.what_not_building && (
                        <div>
                          <h4 className="font-medium mb-2">What you're NOT building:</h4>
                          <p className="text-muted-foreground">{project.what_not_building}</p>
                        </div>
                      )}
                      {project.customer_location && (
                        <div>
                          <h4 className="font-medium mb-2">Target Market:</h4>
                          <Badge variant="outline">{project.customer_location}</Badge>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Build Specifications */}
                <AccordionItem value="specs">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      Build Specifications
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      <div className="flex flex-wrap gap-2">
                        {project.build_type && <Badge>{project.build_type}</Badge>}
                        {project.platform && <Badge>{project.platform}</Badge>}
                      </div>
                      {project.product_types && project.product_types.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Product Types:</h4>
                          <div className="flex flex-wrap gap-1">
                            {project.product_types.map((type) => (
                              <Badge key={type} variant="outline" className="text-xs">
                                {type.replace('-', ' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Integrations */}
                <AccordionItem value="integrations">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Integrations & Tech Stack
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      {project.payments && project.payments.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Payments:</h4>
                          <div className="flex flex-wrap gap-1">
                            {project.payments.map((payment) => (
                              <Badge key={payment} variant="outline" className="text-xs">
                                {payment}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {project.messaging && project.messaging.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Messaging:</h4>
                          <div className="flex flex-wrap gap-1">
                            {project.messaging.map((msg) => (
                              <Badge key={msg} variant="outline" className="text-xs">
                                {msg}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sticky Action Buttons - Mobile */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t md:hidden"
        >
          <div className="flex gap-3 max-w-sm mx-auto">
            <Button 
              onClick={handleSignContract}
              disabled={!canSignContract}
              className="flex-1"
              variant={project.contract_signed ? "secondary" : "default"}
            >
              <FileSignature className="mr-2 w-4 h-4" />
              {project.contract_signed ? 'Signed' : 'Sign Contract'}
            </Button>
            <Button 
              onClick={handleMakePayment}
              disabled={!canMakePayment}
              className="flex-1"
              variant={project.payment_completed ? "secondary" : "default"}
            >
              <CreditCard className="mr-2 w-4 h-4" />
              {project.payment_completed ? 'Paid' : 'Pay Now'}
            </Button>
          </div>
        </motion.div>

        {/* Desktop Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="hidden md:flex justify-center gap-4 mb-8"
        >
          <Button 
            onClick={handleSignContract}
            disabled={!canSignContract}
            size="lg"
            variant={project.contract_signed ? "secondary" : "default"}
          >
            <FileSignature className="mr-2 w-4 h-4" />
            {project.contract_signed ? 'Contract Signed' : 'Sign Contract'}
          </Button>
          <Button 
            onClick={handleMakePayment}
            disabled={!canMakePayment}
            size="lg"
            variant={project.payment_completed ? "secondary" : "default"}
          >
            <CreditCard className="mr-2 w-4 h-4" />
            {project.payment_completed ? 'Payment Complete' : 'Make Payment'}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
