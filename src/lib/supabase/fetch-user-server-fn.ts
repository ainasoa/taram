import { createServerFn } from "@tanstack/react-start";

import { createClient } from "@/lib/supabase/server";

export const fetchUser: () => Promise<ProfileType | null> = createServerFn({
  method: "GET",
}).handler(async () => {
  const supabase = createClient();
  const session = await supabase.auth.getUser();
  const { data, error } = await supabase.from("profiles").select("*").single();

  if (error || session.error) return null;

  return { ...data, email: session.data.user?.email };
});
