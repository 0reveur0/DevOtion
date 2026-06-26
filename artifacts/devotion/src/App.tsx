import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import ToolPage from "@/pages/tool";
import CategoryPage from "@/pages/category";
import ProfilePage from "@/pages/profile";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="dark flex min-h-screen flex-col font-sans bg-slate-950">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/tools/:slug" component={ToolPage} />
          <Route path="/category/:slug" component={CategoryPage} />
          <Route path="/profile/:username" component={ProfilePage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
