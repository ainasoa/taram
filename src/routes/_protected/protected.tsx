import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/_protected/protected")({
  component: Properties,
  loader: async ({ context }) => {
    return {
      user: context.user!,
    };
  },
});

function Properties() {
  const data = Route.useLoaderData();

  return (
    <div className="p-6 flex flex-col gap-4">
      Utilisateur : {data.user.email} <br />
      Role : {data.user.role}
      <Tabs defaultValue="properties" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="properties">Biens</TabsTrigger>
          {data.user.role==='agent' && (
            <TabsTrigger  value="my-properties">Mes Biens</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="properties">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>
                View your key metrics and recent project activity. Track
                progress across all your active projects.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              You have 12 active projects and 3 pending tasks.
            </CardContent>
          </Card>
        </TabsContent>
       {data.user.role==='agent' && <TabsContent value="my-properties">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Track performance and user engagement metrics. Monitor trends
                and identify growth opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Page views are up 25% compared to last month.
            </CardContent>
          </Card>
        </TabsContent>}
      </Tabs>
    </div>
  );
}
