create table public.walks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id),
  date date not null,
  created_at timestamptz not null,
  updated_at timestamptz,
  duration int not null default 30,
  where_type text,
  when_type text,
  who_type text,
  city text default '',
  place text default '',
  companion text default '',
  schema_version int not null default 1
);

alter table public.walks enable row level security;

create policy "Users can select their own walks"
on public.walks for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert their own walks"
on public.walks for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update their own walks"
on public.walks for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete their own walks"
on public.walks for delete
to authenticated
using ((select auth.uid()) = user_id);
