import { Button } from "@/components/ui/button";
import { Route } from "../protected";
import useLogout from "../-hooks/useLogout";

export default function NavBar() {
  const data = Route.useLoaderData();
  const logout = useLogout();

  return (
    <div className="flex justify-between items-center">
      <div>
        Utilisateur : {data.user.email} <br />
        Role : {data.user.role}
      </div>
      <Button onClick={logout} variant='outline'>Se déconnecter</Button>
    </div>
  );
}
