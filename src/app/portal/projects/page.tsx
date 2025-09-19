'use client'

import { useEffect, useState } from "react";
// import { useAuth } from "@/contexts/AuthContext";
// import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@3rdparty/ui/card";
import { Button } from "@3rdparty/ui/button";
import { Badge } from "@3rdparty/ui/badge";
import { 
  FolderOpen, 
  Calendar,
  ArrowRight,
  Loader2,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Project {
  id: string;
  project_reference_id: string;
  what_building: string;
  current_stage: number;
  created_at: string;
  updated_at: string;
  budget_range: string;
  timeline: string;
}

const ProjectsList = () => {
//   const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);


  const user = {
    id: "id",
    created_at: "08-03-2025",
    last_sign_in_at: "08-03-2025",
    email: "kingsley.ezenwere@gmail.com"
  }

  useEffect(() => {
    fetchProjects();
  }, [user]);

  const fetchProjects = async () => {
    if (!user) return;

    try {
    //   setLoading(true);
      
    //   const { data, error } = await supabase
    //     .from('projects')
    //     .select('id, project_reference_id, what_building, current_stage, created_at, updated_at, budget_range, timeline')
    //     .eq('user_id', user.id)
    //     .order('updated_at', { ascending: false });

    //   if (error) throw error;

    //   setProjects(data || []);
    // } catch (error) {
    //   console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (stage: number) => {
    const stages = [
      'Not Started',
      'NDA Signing',
      'Project Submitted',
      'Discovery Chat',
      'Contract Signing',
      'Initial Payment',
      'In Progress',
      'Sign-Off',
      'Completed'
    ];
    return stages[stage] || 'Unknown';
  };

  const getStatusColor = (stage: number) => {
    if (stage <= 2) return 'secondary';
    if (stage <= 5) return 'default';
    if (stage <= 7) return 'default';
    return 'default';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Projects</h1>
          <p className="text-muted-foreground">
            Manage and track all your projects with Appodus
          </p>
        </div>
        <Link href="/onboarding">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </motion.div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2">
                        {project.what_building || 'Untitled Project'}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {project.project_reference_id}
                      </CardDescription>
                    </div>
                    <Badge variant={getStatusColor(project.current_stage)}>
                      {getStatusText(project.current_stage)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {project.budget_range && (
                      <div>
                        <p className="text-muted-foreground">Budget</p>
                        <p className="font-medium">{project.budget_range}</p>
                      </div>
                    )}
                    {project.timeline && (
                      <div>
                        <p className="text-muted-foreground">Timeline</p>
                        <p className="font-medium">{project.timeline}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      Updated {formatDate(project.updated_at)}
                    </div>
                    <Link href={`/portal/projects/${project.id}`}>
                      <Button variant="ghost" size="sm">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <FolderOpen className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Projects Yet</h3>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                Ready to turn your ideas into reality? Start your first project with Appodus and bring your vision to life.
              </p>
              <Link href="/onboarding">
                <Button size="lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Start Your Build
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectsList;
