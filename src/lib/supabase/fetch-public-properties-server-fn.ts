import { createServerFn } from "@tanstack/react-start";

import { createClient } from "@/lib/supabase/server";

export const fetchPulicProperties: () => Promise<PropertyType[] | undefined> =
  createServerFn({
    method: "GET",
  }).handler(async () => {
    const supabase = createClient();
    const session = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("is_published", true);

    if (error || session.error) return;

    return data;
  });
