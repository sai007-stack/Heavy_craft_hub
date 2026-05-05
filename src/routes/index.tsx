import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  Cog,
  Wrench,
  Hammer,
  Recycle,
  ShieldCheck,
  Truck,
  Award,
  Headphones,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";
import hero from "@/assets/hero-machine.jpg";
import cnc from "@/assets/machine-cnc.jpg";
import lathe from "@/assets/machine-lathe.jpg";
import milling from "@/assets/machine-milling.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ForgeTech — Heavy Machines & CNC Solutions" },
      {
        name: "description",
        content:
          "Industrial CNC, lathe, milling and used machinery. Request a quote from ForgeTech, your heavy machinery partner.",
      },
    ],
  }),
});

const categories = [
  { icon: Cog, title: "CNC Machines", desc: "High precision multi-axis CNC" },
  { icon: Wrench, title: "Lathe Machines", desc: "Heavy duty turning solutions" },
  { icon: Hammer, title: "Milling Machines", desc: "Vertical & horizontal mills" },
  { icon: Recycle, title: "Used Machines", desc: "Certified pre-owned equipment" },
];

const featured = [
  {
    img: cnc,
    name: "VMC-850 CNC Center",
    specs: ["Travel: 850×500×500mm", "Spindle: 12,000 RPM", "Fanuc Control"],
  },
  {
    img: lathe,
    name: "HD-Turn 2000 Lathe",
    specs: ["Swing: 660mm", "Length: 2000mm", "Heavy cast iron bed"],
  },
  {
    img: milling,
    name: "UMM-450 Universal Mill",
    specs: ["Table: 1370×320mm", "Power: 7.5 kW", "DRO equipped"],
  },
];

const reasons = [
  { icon: ShieldCheck, title: "ISO 9001 Certified", desc: "Quality you can audit." },
  { icon: Truck, title: "Pan-India Delivery", desc: "Logistics & installation included." },
  { icon: Award, title: "25+ Years Expertise", desc: "Trusted by 1,200+ factories." },
  { icon: Headphones, title: "24/7 Service", desc: "On-site engineers, fast response." },
];

function Index() {
  const [form, setForm] = useState({ name: "", phone: "", requirement: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return toast.error("Name and phone are required");
    toast.success("Inquiry sent! We'll call you within 24 hours.");
    setForm({ name: "", phone: "", requirement: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster />

      {/* Top utility bar */}
      <div className="bg-primary text-primary-foreground text-xs">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 px-4 py-2">
          <div className="flex items-center gap-5">
            <a href="tel:+919825128694" className="flex items-center gap-1.5 hover:text-accent transition">
              <Phone className="h-3.5 w-3.5" /> +91 98251 28694
            </a>
            <a href="mailto:contact@forgetech.in" className="hidden items-center gap-1.5 hover:text-accent transition sm:flex">
              <Mail className="h-3.5 w-3.5" /> contact@forgetech.in
            </a>
          </div>
          <span className="hidden font-medium text-accent md:inline">
            Make in India, By Indians for Indian Fabricators !!!
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-lg">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <a href="/" className="flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[image:var(--gradient-accent)] shadow-[var(--shadow-card)]">
              <Cog className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <div className="text-xl font-extrabold tracking-tight text-primary">FORGETECH</div>
              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Technology Pvt. Ltd</div>
            </div>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex">
            <a href="#" className="text-accent">Home</a>
            <a href="#why" className="hover:text-accent transition">About Us</a>
            <a href="#products" className="hover:text-accent transition">Products</a>
            <a href="#featured" className="hover:text-accent transition">For Client</a>
            <a href="#certifications" className="hover:text-accent transition">Gallery</a>
            <a href="#inquiry" className="hover:text-accent transition">Contact</a>
          </nav>
          <Button asChild className="rounded-full bg-[image:var(--gradient-accent)] px-5 text-primary-foreground hover:opacity-90">
            <a href="#inquiry">Admin Login</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />
        <img
          src={hero}
          alt="Industrial CNC machinery"
          width={1600}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-luminosity"
        />
        <div className="container relative mx-auto grid min-h-[88vh] items-center px-4 py-20">
          <div className="max-w-3xl text-primary-foreground">
            <span className="inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest">
              Heavy Machinery · Since 1998
            </span>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
              Make in India,
              <br />
              <span className="bg-[image:var(--gradient-accent)] bg-clip-text text-transparent">
                for Indian Fabricators !!!
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">
              Leading provider of CNC Laser Cutting, Press Brake Machines, and CAD/CAM solutions
              for the sheet metal industry.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-[var(--shadow-elegant)]">
                <a href="#products">Explore Products <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                <a href="#inquiry">Request Quote</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating action buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <a
          href="https://wa.me/919825128694"
          target="_blank"
          rel="noopener"
          aria-label="WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[oklch(0.7_0.18_150)] text-primary-foreground shadow-[var(--shadow-elegant)] transition hover:scale-110"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
        <a
          href="#inquiry"
          aria-label="Chat"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[var(--shadow-elegant)] transition hover:scale-110"
        >
          <Mail className="h-5 w-5" />
        </a>
      </div>

      {/* Categories */}
      <section id="products" className="container mx-auto px-4 py-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Product Categories</h2>
          <p className="mt-3 text-muted-foreground">Built for every workshop, every scale.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Card key={c.title} className="group cursor-pointer border-border p-8 transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-primary group-hover:bg-[image:var(--gradient-accent)] group-hover:text-primary-foreground transition">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section id="featured" className="bg-secondary/40 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-end justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Featured Machines</h2>
              <p className="mt-3 text-muted-foreground">Our most-requested models this quarter.</p>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {featured.map((m) => (
              <Card key={m.name} className="overflow-hidden border-border shadow-[var(--shadow-card)] transition hover:-translate-y-1">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img src={m.img} alt={m.name} loading="lazy" width={800} height={600} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{m.name}</h3>
                  <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                    {m.specs.map((s) => (
                      <li key={s} className="flex gap-2"><span className="text-accent">▸</span>{s}</li>
                    ))}
                  </ul>
                  <Button asChild className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <a href="#inquiry">Send Inquiry</a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why" className="container mx-auto px-4 py-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Why Choose ForgeTech</h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <div key={r.title} className="text-center">
              <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[image:var(--gradient-accent)] text-primary-foreground">
                <r.icon className="h-7 w-7" />
              </div>
              <h3 className="font-semibold">{r.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="border-y border-border bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Trusted & Certified By
          </p>
          <div className="grid grid-cols-2 items-center gap-8 sm:grid-cols-3 md:grid-cols-6">
            {["ISO 9001", "CE Certified", "MSME", "Tata", "L&T", "Bosch"].map((n) => (
              <div key={n} className="flex h-12 items-center justify-center rounded-md border border-border bg-background text-sm font-bold text-muted-foreground">
                {n}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Request a Quote</h2>
            <p className="mt-3 text-muted-foreground">Tell us what you need. Our team replies within 24 hours.</p>
          </div>
          <Card className="p-8 shadow-[var(--shadow-card)]">
            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">Full Name</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Phone</label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98XXX XXXXX" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Requirement</label>
                <Textarea rows={4} value={form.requirement} onChange={(e) => setForm({ ...form, requirement: e.target.value })} placeholder="Describe the machine you need..." />
              </div>
              <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Submit Inquiry
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[image:var(--gradient-accent)]">
                <Cog className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold">ForgeTech</span>
            </div>
            <p className="mt-4 text-sm text-primary-foreground/70">
              Heavy machinery & CNC solutions for India's manufacturing backbone.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /><span>+91 80 1234 5678</span></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /><span>sales@forgetech.in</span></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Address</h4>
            <p className="flex gap-2 text-sm text-primary-foreground/70">
              <MapPin className="h-4 w-4 shrink-0" />
              Plot 42, MIDC Industrial Area, Pune 411019, India
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Follow</h4>
            <div className="flex gap-3">
              {["LinkedIn", "YouTube", "X"].map((s) => (
                <a key={s} href="#" className="rounded-md border border-primary-foreground/20 px-3 py-1.5 text-xs hover:bg-primary-foreground/10">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} ForgeTech Industries. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
