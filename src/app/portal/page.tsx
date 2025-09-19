'use client'

import { useEffect, useState } from "react";
// import { useAuth } from "@/contexts/AuthContext";
// import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@3rdparty/ui/card";
import { Button } from "@3rdparty/ui/button";
import { 
  FolderOpen, 
  Calendar, 
  Activity,
  ArrowRight,
  Loader2
} from "lucide-react";
import { Badge } from "@3rdparty/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";

interface Project {
  id: string;
  project_reference_id: string;
  what_building: string;
  current_stage: number;
  created_at: string;
  updated_at: string;
}

interface ProjectStage {
  stage_name: string;
  completed: boolean;
  completed_at: string | null;
}

const Dashboard = () => {
//   const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextMilestone, setNextMilestone] = useState<string | null>(null);


  const user = {
    id: "id",
    created_at: "08-03-2025",
    last_sign_in_at: "08-03-2025",
    email: "kingsley.ezenwere@gmail.com"
  }

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
    //   // Fetch user's projects
    //   const { data: projectsData, error: projectsError } = await supabase
    //     .from('projects')
    //     .select('id, project_reference_id, what_building, current_stage, created_at, updated_at')
    //     .eq('user_id', user.id)
    //     .order('updated_at', { ascending: false });

    //   if (projectsError) throw projectsError;

    //   setProjects(projectsData || []);

    //   // Fetch next milestone for the most recent project
    //   if (projectsData && projectsData.length > 0) {
    //     const latestProject = projectsData[0];
    //     const { data: stagesData } = await supabase
    //       .from('project_stages')
    //       .select('stage_name, completed, completed_at')
    //       .eq('project_id', latestProject.id)
    //       .eq('completed', false)
    //       .order('stage_number', { ascending: true })
    //       .limit(1);

    //     if (stagesData && stagesData.length > 0) {
    //       setNextMilestone(stagesData[0].stage_name);
    //     }
    //   }
    // } catch (error) {
    //   console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
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
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold tracking-tight">
          {getGreeting()}, {user?.email?.split('@')[0] || 'Founder'}! 👋
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your projects today.
        </p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {/* Active Projects Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">
              {projects.length === 1 ? 'project' : 'projects'} in progress
            </p>
          </CardContent>
        </Card>

        {/* Next Milestone Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Next Milestone
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {nextMilestone ? (
                <span className="text-sm">{nextMilestone}</span>
              ) : (
                "All Complete"
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {nextMilestone ? "Coming up next" : "No pending milestones"}
            </p>
          </CardContent>
        </Card>

        {/* Recent Activity Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Activity
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.length > 0 ? formatDate(projects[0].updated_at) : "No activity"}
            </div>
            <p className="text-xs text-muted-foreground">
              Last project update
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Projects</h2>
          <Link href="/portal/projects">
            <Button variant="outline" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {projects.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {projects.slice(0, 4).map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      {project.what_building || 'Untitled Project'}
                    </CardTitle>
                    <Badge variant="secondary">
                      Stage {project.current_stage}
                    </Badge>
                  </div>
                  <CardDescription>
                    Project ID: {project.project_reference_id}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Updated {formatDate(project.updated_at)}
                    </span>
                    <Link href={`/portal/projects/${project.id}`}>
                      <Button variant="ghost" size="sm">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">No Projects Yet</h3>
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Start building your next big idea with Appodus
              </p>
              <Link href="/onboarding">
                <Button>
                  Start Your Build
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
