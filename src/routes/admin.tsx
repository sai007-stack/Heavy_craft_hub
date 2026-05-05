import { createFileRoute, Outlet, Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { Building2, Users, Briefcase, LayoutDashboard, LogOut, Loader2, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
  head: () => ({ meta: [{ title: "Admin — ForgeTech CRM" }] }),
});

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState<"loading" | "unauth" | "no-access" | "ok">("loading");

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return setState("unauth");
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);
      const isAdmin = roles?.some((r) => r.role === "admin");
      setState(isAdmin ? "ok" : "no-access");
    };
    check();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) setState("unauth");
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (state === "unauth") navigate({ to: "/auth" });
  }, [state, navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  if (state === "loading" || state === "unauth") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (state === "no-access") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
        <ShieldAlert className="h-12 w-12 text-destructive" />
        <h1 className="text-2xl font-bold">Admin access required</h1>
        <p className="max-w-md text-muted-foreground">
          Your account is signed in but does not have admin access to the CRM. Ask an existing admin
          to grant your account the <code className="rounded bg-muted px-1.5 py-0.5">admin</code> role.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={signOut}>Sign out</Button>
          <Button asChild><Link to="/">Back to site</Link></Button>
        </div>
      </div>
    );
  }

  const nav = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/admin/companies", label: "Companies", icon: Building2 },
    { to: "/admin/contacts", label: "Contacts", icon: Users },
    { to: "/admin/applications", label: "Applications", icon: Briefcase },
  ] as const;

  return (
    <div className="flex min-h-screen bg-secondary/30">
      <Toaster />
      <aside className="hidden w-60 flex-col border-r border-border bg-primary text-primary-foreground md:flex">
        <div className="border-b border-primary-foreground/10 px-6 py-5">
          <Link to="/" className="text-lg font-extrabold">FORGETECH</Link>
          <p className="text-xs uppercase tracking-widest text-primary-foreground/60">CRM Admin</p>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {nav.map((item) => {
            const active = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-[image:var(--gradient-accent)] text-primary-foreground"
                    : "text-primary-foreground/80 hover:bg-primary-foreground/10"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-primary-foreground/10 p-3">
          <Button variant="ghost" onClick={signOut} className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10">
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-x-hidden">
        <div className="container mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
