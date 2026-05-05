import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/applications")({
  component: ApplicationsPage,
});

type App = {
  id: string;
  applicant_name: string;
  email: string;
  phone: string | null;
  role_applied: string | null;
  cover_letter: string | null;
  created_at: string;
};

function ApplicationsPage() {
  const [rows, setRows] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("job_applications").select("*").order("created_at", { ascending: false }).then(({ data, error }) => {
      if (error) toast.error(error.message);
      else setRows(data ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Job Applications</h1>
      <p className="mt-1 text-muted-foreground">Submissions from the careers page</p>
      <Card className="mt-6">
        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
        ) : rows.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">No applications yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Submitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.applicant_name}</TableCell>
                  <TableCell>{a.email}</TableCell>
                  <TableCell className="text-muted-foreground">{a.phone || "—"}</TableCell>
                  <TableCell className="text-muted-foreground">{a.role_applied || "—"}</TableCell>
                  <TableCell className="text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
