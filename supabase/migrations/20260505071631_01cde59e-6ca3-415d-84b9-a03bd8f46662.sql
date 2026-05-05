-- Roles enum and user_roles table
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users can view their own roles" on public.user_roles
  for select to authenticated using (auth.uid() = user_id);

create policy "Admins manage roles" on public.user_roles
  for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Auto-assign 'user' role on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.user_roles (user_id, role) values (new.id, 'user')
  on conflict do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Generic updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

-- ===== JOB OPENINGS =====
create table public.job_openings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  department text,
  location text,
  employment_type text,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.job_openings enable row level security;

create trigger job_openings_updated_at
  before update on public.job_openings
  for each row execute function public.set_updated_at();

create policy "Anyone can view active job openings" on public.job_openings
  for select using (is_active = true);
create policy "Admins view all job openings" on public.job_openings
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins manage job openings" on public.job_openings
  for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ===== JOB APPLICATIONS =====
create table public.job_applications (
  id uuid primary key default gen_random_uuid(),
  job_opening_id uuid references public.job_openings(id) on delete set null,
  applicant_name text not null,
  email text not null,
  phone text,
  role_applied text,
  resume_url text,
  cover_letter text,
  created_at timestamptz not null default now()
);
alter table public.job_applications enable row level security;

create policy "Anyone can submit applications" on public.job_applications
  for insert with check (true);
create policy "Admins view applications" on public.job_applications
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins manage applications" on public.job_applications
  for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ===== COMPANIES =====
create table public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  industry text,
  website text,
  phone text,
  address text,
  notes text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.companies enable row level security;

create trigger companies_updated_at
  before update on public.companies
  for each row execute function public.set_updated_at();

create policy "Admins view companies" on public.companies
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins manage companies" on public.companies
  for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ===== CONTACTS =====
create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete set null,
  name text not null,
  email text,
  phone text,
  designation text,
  notes text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.contacts enable row level security;

create trigger contacts_updated_at
  before update on public.contacts
  for each row execute function public.set_updated_at();

create policy "Admins view contacts" on public.contacts
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins manage contacts" on public.contacts
  for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Seed sample job openings
insert into public.job_openings (title, department, location, employment_type, description) values
('CNC Application Engineer', 'Engineering', 'Pune, India', 'Full-time', 'Support customers on CNC programming, setup and optimization across our machine portfolio.'),
('Field Service Technician', 'Service', 'Multiple locations', 'Full-time', 'On-site installation, commissioning and maintenance of heavy machine tools.'),
('Sales Manager - West', 'Sales', 'Mumbai, India', 'Full-time', 'Drive B2B sales of CNC and fabrication machinery across western India.');