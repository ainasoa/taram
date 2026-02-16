import { createClient } from "@/lib/supabase/client";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod/v3";
import { useState } from "react";

export default function useLoginForm() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(
      z.object({
        email: z
          .string()
          .email("Entrer une valide adresse mail !")
          .nonempty("Entrer votre adresse mail !"),
        password: z.string().nonempty("Entrer votre mot de passe"),
      }),
    ),
  });

  const handleLogin = form.handleSubmit(
    async (values) => {
        try {
            const supabase = createClient();
      
            const { error } = await supabase.auth.signInWithPassword(values);
      
            console.log('error', error)
      
            if (error) throw error;
      
            await navigate({ to: "/properties" });
            
        } catch (error) {
            setSubmitError(true)
        }
    },
  );

  return { ...form, submitError, handleLogin };
}
