import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertiesList from "./-components/PropertiesList";
import { NewPropertyForm } from "./-components/NewPropertyForm";
import NavBar from "./-components/NavBar";

export const Route = createFileRoute("/_protected/protected")({
  component: Properties,
  loader: async ({ context }) => context,
});

function Properties() {
  const data = Route.useLoaderData();

  return (
    <div className="p-6 flex flex-col gap-4">
      <NavBar />
      <Tabs defaultValue="properties">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="properties">Biens</TabsTrigger>
            {data.user.role === "agent" && (
              <TabsTrigger value="my-properties">Mes Biens</TabsTrigger>
            )}
          </TabsList>
          {data.user.role === "agent" && <NewPropertyForm />}
        </div>
        <TabsContent value="properties">
          <PropertiesList data={data.properties} />
        </TabsContent>
        {data.user.role === "agent" && (
          <TabsContent value="my-properties">
            <PropertiesList data={data.myProperties} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
