import { createClient } from "@/lib/supabase/client";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod/v3";
import { useState } from "react";

export default function useSignUpForm() {
  const [submitError, setSubmitError] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      isAgent: false,
      repeatPassword: "",
    },
    resolver: zodResolver(
      z
        .object({
          email: z
            .string()
            .email("Entrer une valide adresse mail !")
            .nonempty("Entrer votre adresse mail !"),
          password: z.string().nonempty("Entrer votre mot de passe"),
          firstname: z.string().nonempty("Entrer votre nom"),
          lastname: z.string().nonempty("Entrer votre prénom"),
          isAgent: z.boolean(),
          repeatPassword: z.string().nonempty("Répéter votre mot de passe"),
        })
        .refine((v) => v.password === v.repeatPassword, {
          message: "Les mots de passe ne sont pas identiques.",
          path: ["repeatPassword"],
        }),
    ),
  });

  const handleSignUp = form.handleSubmit(async (values) => {
    try {
      setSubmitError(false);

      const supabase = createClient();

      const { error, data } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });

      if (error) throw error;

      if (data?.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
          firstname: values.firstname,
          lastname: values.lastname,
          role: values.isAgent ? "agent" : "client",
          id:data.user.id
        });

        if (profileError) throw profileError;
      }

      await navigate({ to: "/sign-up-success" });
    } catch (error) {
      console.log(error);
      setSubmitError(true);
    }
  });

  return { ...form, submitError, handleSignUp };
}
