# -------------------Architecture :

public/
src/
  ├── lib/
  ├── components/
  ├── routes/
    ├── login/
      ├── -components/
      ├── -hooks/
    ├── properties/
      ├── -components/
      ├── -hooks/
    ├── sign-up/
      ├── -components/
      ├── -hooks/

# Modèle de données : Voir l'image "./Modèle de données.png"

# --------------------RLS :

# 1.profiles

##### INSERT
    alter policy "Register"
    on "public"."profiles"
    to public
    with check (
      true
    );

##### UPDATE
    alter policy "User edit"
    on "public"."profiles"
    to authenticated
    using (
      (auth.uid() = id)
    );

##### SELECT
    alter policy "User session"
    on "public"."profiles"
    to authenticated
    using (
      (auth.uid() = id)
    );

# 2.propreties

##### UPDATE
    alter policy "Agent can update own properties"
    on "public"."properties"
    to authenticated
    using (
      (auth.uid() = agent_id)
    );

##### INSERT
    alter policy "Agent can create properties"
    on "public"."properties"
    to public
    with check (
      (EXISTS ( SELECT 1
      FROM profiles
      WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'agent'::user_role))))
    );

##### SELECT
    alter policy "Select properties"
    on "public"."properties"
    to public
    using (
      ((auth.uid() = agent_id) OR (is_published = true))
    );

# ----------script python
    python3 -m venv venv
    source venv/bin/activate
    pip install ...
    python scripts/states.py