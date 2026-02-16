import { createFileRoute, redirect } from "@tanstack/react-router";

import { fetchUser } from "@/lib/supabase/fetch-user-server-fn";
import { fetchPulicProperties } from "@/lib/supabase/fetch-public-properties-server-fn";
import { fetchMyProperties } from "@/lib/supabase/fetch-my-properties-server-fn";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async () => {
    const user = await fetchUser();
    const properties = await fetchPulicProperties();
    const myProperties = await fetchMyProperties();

    if (!user) throw redirect({ to: "/login" });

    return {
      user,
      properties,
      myProperties,
    };
  },
});
