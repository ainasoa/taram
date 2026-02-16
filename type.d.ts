type ProfileType = {
  id: string;
  role: "agent" | "client";
  firstname: string;
  lastname: string;
  email?: string;
};

type PropertyType = {
  id: string;
  title: string;
  description: string;
  price: number;
  city: string;
  agent_id: string;
  is_published: boolean;
  created_at: string;
};
