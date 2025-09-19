'use client'

import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";
// import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@3rdparty/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@3rdparty/ui/tabs";
import { Badge } from "@3rdparty/ui/badge";
import { Button } from "@3rdparty/ui/button";
import { Progress } from "@3rdparty/ui/progress";
import { 
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Loader2,
  FileText,
  CreditCard,
  MessageSquare
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Project {
  id: string;
  project_reference_id: string;
  full_name: string;
  email: string;
  what_building: string;
  current_stage: number;
  created_at: string;
  updated_at: string;
  budget_range: string;
  timeline: string;
  build_type: string;
  platform: string;
}

interface ProjectStage {
  id: string;
  stage_number: number;
  stage_name: string;
  completed: boolean;
  completed_at: string | null;
  notes: string | null;
}

const ProjectDetails = () => {
  // const { projectId } = useParams<{ projectId: string }>();
  // const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [stages, setStages] = useState<ProjectStage[]>([]);
  const [loading, setLoading] = useState(true);


  const user = {
    id: "id",
    created_at: "08-03-2025",
    last_sign_in_at: "08-03-2025",
    email: "kingsley.ezenwere@gmail.com"
  }
  const projectId = "projectId"

  useEffect(() => {
    if (projectId) {
      fetchProjectDetails();
    }
  }, [projectId, user]);

  const fetchProjectDetails = async () => {
    if (!user || !projectId) return;

    try {
      setLoading(true);
      
    //   // Fetch project details
    //   const { data: projectData, error: projectError } = await supabase
    //     .from('projects')
    //     .select('*')
    //     .eq('id', projectId)
    //     .eq('user_id', user.id)
    //     .single();

    //   if (projectError) throw projectError;

    //   // Fetch project stages
    //   const { data: stagesData, error: stagesError } = await supabase
    //     .from('project_stages')
    //     .select('*')
    //     .eq('project_id', projectId)
    //     .order('stage_number', { ascending: true });

    //   if (stagesError) throw stagesError;

    //   setProject(projectData);
    //   setStages(stagesData || []);
    // } catch (error) {
    //   console.error('Error fetching project details:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getProgressPercentage = () => {
    if (!stages.length) return 0;
    const completedStages = stages.filter(stage => stage.completed).length;
    return (completedStages / stages.length) * 100;
  };

  const getActivityFeed = () => {
    return stages
      .filter(stage => stage.completed && stage.completed_at)
      .map(stage => ({
        id: stage.id,
        title: `${stage.stage_name} Completed`,
        date: stage.completed_at!,
        description: stage.notes || `${stage.stage_name} milestone has been completed successfully.`
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-4 lg:p-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <h3 className="text-xl font-semibold mb-2">Project Not Found</h3>
            <p className="text-muted-foreground mb-4">
              The project you're looking for doesn't exist or you don't have access to it.
            </p>
            <Link href="/portal/projects">
              <Button>Back to Projects</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const activityFeed = getActivityFeed();

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/portal/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
        
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {project.what_building || 'Untitled Project'}
            </h1>
            <p className="text-muted-foreground">
              Project ID: {project.project_reference_id}
            </p>
          </div>
          <Badge variant="secondary" className="w-fit">
            Stage {project.current_stage}
          </Badge>
        </div>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
            <CardDescription>
              {Math.round(getProgressPercentage())}% complete
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={getProgressPercentage()} className="mb-4" />
            <div className="text-sm text-muted-foreground">
              {stages.filter(stage => stage.completed).length} of {stages.length} milestones completed
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="documents" disabled>Documents</TabsTrigger>
            <TabsTrigger value="invoices" disabled>Invoices</TabsTrigger>
            <TabsTrigger value="chat" disabled>Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Project Name</p>
                    <p className="text-sm text-muted-foreground">{project.what_building}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Budget Range</p>
                    <p className="text-sm text-muted-foreground">{project.budget_range || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Timeline</p>
                    <p className="text-sm text-muted-foreground">{project.timeline || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Platform</p>
                    <p className="text-sm text-muted-foreground">{project.platform || 'Not specified'}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Project Timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Started</p>
                    <p className="text-sm text-muted-foreground">{formatDate(project.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-sm text-muted-foreground">{formatDate(project.updated_at)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Build Type</p>
                    <p className="text-sm text-muted-foreground">{project.build_type || 'Not specified'}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-4 mt-6">
            {stages.map((stage, index) => (
              <Card key={stage.id}>
                <CardContent className="flex items-center space-x-4 p-6">
                  <div className="flex-shrink-0">
                    {stage.completed ? (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    ) : stage.stage_number === project.current_stage ? (
                      <Clock className="h-6 w-6 text-blue-500" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{stage.stage_name}</h3>
                    {stage.completed && stage.completed_at && (
                      <p className="text-sm text-muted-foreground">
                        Completed on {formatDate(stage.completed_at)}
                      </p>
                    )}
                    {!stage.completed && stage.stage_number === project.current_stage && (
                      <Badge variant="secondary" className="mt-1">In Progress</Badge>
                    )}
                    {stage.notes && (
                      <p className="text-sm text-muted-foreground mt-2">{stage.notes}</p>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Stage {stage.stage_number}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="activity" className="space-y-4 mt-6">
            {activityFeed.length > 0 ? (
              activityFeed.map((activity, index) => (
                <Card key={activity.id}>
                  <CardContent className="flex items-start space-x-4 p-6">
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{activity.title}</h3>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <Calendar className="mr-1 h-3 w-3" />
                        {formatDate(activity.date)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No Activity Yet</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Activity will appear here as your project progresses through different stages.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
