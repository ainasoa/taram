import { Badge } from "@/components/ui/badge";
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
        <CardTitle className="flex justify-between">
          {Item.title}
          <span>N°{Item.id}</span>
        </CardTitle>
        <CardDescription>{Item.description}</CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        {Item.city} <br />
        {Item.price} Euro <br /> <br />
        <Badge>
          {Item.is_published ? "Publié" : "Non publié"}
        </Badge>
      </CardContent>
    </Card>
  );

  return data?.length ? (
    <div className="grid grid-cols-3 gap-4">{data?.map(renderItem)}</div>
  ) : (
    <div>Aucun bien</div>
  );
}
