import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AppShell } from "@/components/layout/AppShell";
import Dashboard from "@/pages/dashboard";
import Leads from "@/pages/leads";
import LeadDetail from "@/pages/lead-detail";
import Pipeline from "@/pages/pipeline";
import Tasks from "@/pages/tasks";
import FollowUps from "@/pages/follow-ups";
import Performance from "@/pages/performance";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminLeads from "@/pages/admin/leads";
import TeamManagement from "@/pages/admin/team";
import Assignments from "@/pages/admin/assignments";
import Reports from "@/pages/admin/reports";
import Settings from "@/pages/admin/settings";
import ManageTemplates from "@/pages/admin/manage-templates";
import ManageServices from "@/pages/admin/manage-services";
import ManageTraining from "@/pages/admin/manage-training";
import Profile from "@/pages/profile";
import Chat from "@/pages/chat";
import Templates from "@/pages/resources/templates";
import Services from "@/pages/knowledge/services";
import LMS from "@/pages/training/lms";
import Recordings from "@/pages/training/recordings";
import { useStore } from "@/lib/store";

import Login from "@/pages/login";

// Placeholder for Admin components
// function AdminPlaceholder({ title }: { title: string }) { ... }

function Router() {
  const { currentUser } = useStore();
  const [location] = useLocation();

  if (location === '/login') {
    return <Login />;
  }

  return (
    <AppShell>
      <Switch>
        {/* Sales Executive Routes */}
        <Route path="/" component={Dashboard} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/chat" component={Chat} />
        <Route path="/leads" component={Leads} />
        <Route path="/leads/:id" component={LeadDetail} />
        <Route path="/pipeline" component={Pipeline} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/follow-ups" component={FollowUps} />
        <Route path="/performance" component={Performance} />
        
        {/* Resources & Knowledge */}
        <Route path="/resources/templates" component={Templates} />
        <Route path="/knowledge/services" component={Services} />
        <Route path="/training/lms" component={LMS} />
        <Route path="/training/recordings" component={Recordings} />

        {/* Admin Routes */}
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/leads" component={AdminLeads} />
        <Route path="/admin/team" component={TeamManagement} />
        <Route path="/admin/assignments" component={Assignments} />
        <Route path="/admin/reports" component={Reports} />
        <Route path="/admin/settings" component={Settings} />
        <Route path="/admin/templates" component={ManageTemplates} />
        <Route path="/admin/services" component={ManageServices} />
        <Route path="/admin/training" component={ManageTraining} />

        <Route component={NotFound} />
      </Switch>
    </AppShell>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
