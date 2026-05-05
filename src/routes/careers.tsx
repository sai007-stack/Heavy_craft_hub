import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Briefcase, MapPin, Clock, ArrowLeft, Loader2 } from "lucide-react";

export const Route = createFileRoute("/careers")({
  component: CareersPage,
  head: () => ({
    meta: [
      { title: "Careers — ForgeTech" },
      { name: "description", content: "Join ForgeTech. Open roles in engineering, service and sales across India." },
    ],
  }),
});

type Job = {
  id: string;
  title: string;
  department: string | null;
  location: string | null;
  employment_type: string | null;
  description: string | null;
};

const applicationSchema = z.object({
  applicant_name: z.string().trim().min(1, "Name required").max(120),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  role_applied: z.string().trim().max(120).optional().or(z.literal("")),
  cover_letter: z.string().trim().max(5000).optional().or(z.literal("")),
});

function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    applicant_name: "",
    email: "",
    phone: "",
    role_applied: "",
    cover_letter: "",
  });

  useEffect(() => {
    supabase
      .from("job_openings")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) toast.error("Failed to load openings");
        else setJobs(data ?? []);
        setLoading(false);
      });
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = applicationSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message ?? "Invalid input");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("job_applications").insert({
      applicant_name: parsed.data.applicant_name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      role_applied: parsed.data.role_applied || null,
      cover_letter: parsed.data.cover_letter || null,
    });
    setSubmitting(false);
    if (error) return toast.error("Submission failed. Try again.");
    toast.success("Application sent! We'll get back to you soon.");
    setForm({ applicant_name: "", email: "", phone: "", role_applied: "", cover_letter: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-accent">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <span className="text-lg font-bold">FORGETECH · Careers</span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[image:var(--gradient-hero)] py-20 text-primary-foreground">
        <div className="container mx-auto px-4">
          <Badge className="bg-accent text-accent-foreground">We're hiring</Badge>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight md:text-6xl">
            Build the machines that
            <br />
            <span className="bg-[image:var(--gradient-accent)] bg-clip-text text-transparent">
              build India.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-primary-foreground/80">
            Engineering, service and sales roles for people who love precision and uptime.
          </p>
        </div>
      </section>

      {/* Openings */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="mb-8 text-2xl font-bold tracking-tight">Open Positions</h2>
        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
        ) : jobs.length === 0 ? (
          <p className="text-muted-foreground">No open positions right now. Check back soon!</p>
        ) : (
          <div className="grid gap-5">
            {jobs.map((j) => (
              <Card key={j.id} className="p-6 transition hover:shadow-[var(--shadow-card)]">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{j.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                      {j.department && <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" />{j.department}</span>}
                      {j.location && <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{j.location}</span>}
                      {j.employment_type && <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{j.employment_type}</span>}
                    </div>
                    {j.description && <p className="mt-3 max-w-3xl text-sm text-foreground/80">{j.description}</p>}
                  </div>
                  <Button
                    onClick={() => {
                      setForm((f) => ({ ...f, role_applied: j.title }));
                      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    Apply now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Apply form */}
      <section id="apply" className="border-t border-border bg-secondary/40 py-20">
        <div className="container mx-auto max-w-2xl px-4">
          <h2 className="text-3xl font-bold tracking-tight">Apply</h2>
          <p className="mt-2 text-muted-foreground">Don't see the right role? Send us your details anyway.</p>
          <Card className="mt-8 p-8">
            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">Full name *</label>
                <Input value={form.applicant_name} onChange={(e) => setForm({ ...form, applicant_name: e.target.value })} required />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Email *</label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Phone</label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Role applying for</label>
                <Input value={form.role_applied} onChange={(e) => setForm({ ...form, role_applied: e.target.value })} placeholder="e.g. Field Service Technician" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Cover letter</label>
                <Textarea rows={5} value={form.cover_letter} onChange={(e) => setForm({ ...form, cover_letter: e.target.value })} placeholder="Tell us about your experience..." />
              </div>
              <Button type="submit" disabled={submitting} size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Application"}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
}
