import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  data?: PropertyType[];
};

export default function PropertiesList({ data }: Props) {
  const renderItem = (Item: PropertyType) => (
    <Card key={Item.id}>
      <CardHeader>
        <CardTitle>{Item.title}</CardTitle>
        <CardDescription>{Item.description}</CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        {Item.city} <br />
        {Item.price} Euro
      </CardContent>
    </Card>
  );

  return data?.length ? (
    <div className="grid grid-cols-3">{data?.map(renderItem)}</div>
  ) : (
    <div>Aucun bien</div>
  );
}
