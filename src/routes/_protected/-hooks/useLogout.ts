import { createClient } from "@/lib/supabase/client";
import { useNavigate } from "@tanstack/react-router";

export default function useLogout() {
  const suppabase = createClient();
  const navigate = useNavigate();

  return async () => {
    await suppabase.auth.signOut();

    return navigate({ reloadDocument: true });
  };
}
