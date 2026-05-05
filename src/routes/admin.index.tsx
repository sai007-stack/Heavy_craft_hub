import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Building2, Users, Briefcase } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const [stats, setStats] = useState({ companies: 0, contacts: 0, applications: 0 });

  useEffect(() => {
    Promise.all([
      supabase.from("companies").select("id", { count: "exact", head: true }),
      supabase.from("contacts").select("id", { count: "exact", head: true }),
      supabase.from("job_applications").select("id", { count: "exact", head: true }),
    ]).then(([c, ct, a]) => {
      setStats({ companies: c.count ?? 0, contacts: ct.count ?? 0, applications: a.count ?? 0 });
    });
  }, []);

  const cards = [
    { label: "Companies", value: stats.companies, icon: Building2 },
    { label: "Contacts", value: stats.contacts, icon: Users },
    { label: "Applications", value: stats.applications, icon: Briefcase },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-muted-foreground">CRM overview</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Card key={c.label} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{c.label}</p>
                <p className="mt-2 text-4xl font-extrabold">{c.value}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[image:var(--gradient-accent)] text-primary-foreground">
                <c.icon className="h-6 w-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
