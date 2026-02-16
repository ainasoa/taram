import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import useSignUpForm from "@/routes/sign-up/-hooks/useSignUpForm";
import TInput from "@/routes/login/-components/TInput";
import { Controller } from "react-hook-form";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    control,
    formState: { isSubmitting, isSubmitSuccessful },
    handleSignUp,
    submitError,
  } = useSignUpForm();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {!isSubmitSuccessful ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Inscription</CardTitle>
            {submitError ? (
              <CardDescription className="text-red-500">
                Inscription echouée
              </CardDescription>
            ) : (
              <CardDescription>Créer un nouveau compte</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <TInput label="Nom" control={control} name="firstname" />
              <TInput label="Prénom" control={control} name="lastname" />
              <TInput label="Email" control={control} name="email" />
              <Controller
                control={control}
                name="isAgent"
                render={({ field }) => (
                  <div className="flex gap-2">
                    <Checkbox
                      id="isAgent"
                      name="isAgent"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="isAgent" className="flex-1">
                      I am an agent
                    </Label>
                  </div>
                )}
              />
              <TInput label="Mot de passe" control={control} name="password" />
              <TInput
                label="Confirmer mot de passe"
                control={control}
                name="repeatPassword"
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                onClick={handleSignUp}
              >
                {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Avez-vous déjà un compte ?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Se connecter
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl"> Inscription effectué avec succès</CardTitle>
           
             
           
          </CardHeader>
          <CardContent>
             <CardDescription >
              Veuillez cliquer sur le lien de vérification que nous avons envoyer à votre mail.
              </CardDescription>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
