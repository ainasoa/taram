import { createServerFn } from "@tanstack/react-start";

import { createClient } from "@/lib/supabase/server";

export const fetchMyProperties: () => Promise<PropertyType[] | undefined> =
  createServerFn({
    method: "GET",
  }).handler(async () => {
    const supabase = createClient();

    const session = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("agent_id", session.data.user?.id);

    if (error || session.error) return;

    return data;
  });
