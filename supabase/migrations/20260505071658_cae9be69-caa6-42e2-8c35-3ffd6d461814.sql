-- Set search_path on set_updated_at and handle_new_user, restrict EXECUTE on has_role/handle_new_user
create or replace function public.set_updated_at()
returns trigger language plpgsql
set search_path = public
as $$
begin new.updated_at = now(); return new; end;
$$;

revoke execute on function public.has_role(uuid, public.app_role) from public, anon, authenticated;
grant execute on function public.has_role(uuid, public.app_role) to authenticated;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- Replace the always-true insert policy on job_applications with validated checks
drop policy if exists "Anyone can submit applications" on public.job_applications;

create policy "Anyone can submit applications" on public.job_applications
  for insert
  with check (
    length(trim(applicant_name)) between 1 and 120
    and length(email) between 5 and 255
    and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    and (phone is null or length(phone) <= 30)
    and (cover_letter is null or length(cover_letter) <= 5000)
    and (resume_url is null or length(resume_url) <= 500)
  );