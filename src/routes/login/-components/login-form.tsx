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
import useLoginForm from "../-hooks/useLoginForm";
import TInput from "./TInput";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    handleLogin,
    formState: { isSubmitting },
    control,
    submitError,
  } = useLoginForm();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Connexion</CardTitle>
          {submitError ? (
            <CardDescription color="red" className="text-red-500">
              Connexion echouée
            </CardDescription>
          ) : (
            <CardDescription>
              Entrer votre email pour vous connecter
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <TInput label="Email" control={control} name="email" />
            <TInput label="Mot de passe" control={control} name="password" />
            <div>
              <Link
                to="/forgot-password"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-right"
              >
                Mor de passe oublié ?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
              onClick={handleLogin}
            >
              {isSubmitting ? "Connexion..." : "Se connecter"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Pas de compte ?{" "}
            <Link to="/sign-up" className="underline underline-offset-4">
              S'inscrire
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
