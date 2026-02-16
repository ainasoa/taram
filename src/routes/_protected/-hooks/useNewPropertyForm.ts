import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod/v3";

export default function useNewPropertyForm() {
  const [submitError, setSubmitError] = useState(false);
  const navigate=useNavigate()

  const form = useForm({
    defaultValues: {
      title: "",
      city: "",
      price: 0,
      description: "",
      is_published: false,
    },
    resolver: zodResolver(
      z.object({
        title: z.string().nonempty("Entrer le titre !"),
        city: z.string().nonempty("Entrer la ville !"),
        price: z.coerce.number().positive("Entrer le prix !"),
        description: z.string().nonempty("Entrer la description !"),
        is_published: z.boolean(),
      }),
    ),
  });

  const save = form.handleSubmit(async (values) => {
    console.log("values", values);
    try {
      setSubmitError(false);

      const supabase = createClient();

      const { error } = await supabase.from("properties").insert(values);

      if (error) throw error;

      form.reset();

      navigate({reloadDocument:true})
    } catch (error) {
      console.log(error);
      setSubmitError(true);
    }
  });


  return { ...form, submitError, save,  };
}
