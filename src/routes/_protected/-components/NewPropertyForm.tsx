import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TInput, { TTextarea } from "@/routes/login/-components/TInput";
import useNewPropertyForm from "../-hooks/useNewPropertyForm";
import { Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function NewPropertyForm() {
  const {
    control,
    formState: { isSubmitting },
    submitError,
    save,
  } = useNewPropertyForm();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Nouveau bien</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Nouveau bien</DialogTitle>
          {submitError && (
            <DialogDescription className="text-red-500">
              Il y eu une erreur
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <TInput label="Titre" control={control} name="title" />
          <TInput label="Ville" control={control} name="city" />
          <TInput label="Prix" control={control} name="price" type="number" />
          <TTextarea label="Description" control={control} name="description" />
          <Controller
            control={control}
            name="is_published"
            render={({ field }) => (
              <div className="flex gap-2">
                <Checkbox
                  id="isAgent"
                  name="isAgent"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="isAgent" className="flex-1">
                  Publié
                </Label>
              </div>
            )}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Fermer</Button>
          </DialogClose>
          <Button type="submit" onClick={save} disabled={isSubmitting}>
            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
