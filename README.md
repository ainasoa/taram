# -------------------Architecture :

public/
scripts/
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

# ----------script python : Option C – Statistiques simples
    python3 -m venv venv
    source venv/bin/activate
    pip install ...
    python scripts/states.py

# ------------Partie 4 – Raisonnement technique
1.Pourquoi Supabase est adapté ici ?
    - Gain de temps important pour un MVP
    - Base PostgreSQL robuste et scalable
    - Intégration simple avec React / Next.js

2.Où placer la logique métier ?
    RLS (Base de données)
    - Gestion des droits d’accès
    - Vérification des rôles (agent / client)
    - Protection des données sensibles

    Frontend.
    - Validation UI
    - Affichage conditionnel selon le rôle
    - Navigation

    Scripts Python
    - Reporting
    - Agrégations statistiques
    - Automatisations planifiées

3.À quoi servirait Python dans un projet réel ?
    - Génération de rapports statistiques
    - Nettoyage / validation de données
    - Automatisations (cron jobs)

4.Limites de cette architecture à grande échelle
    - Absence de backend : En cas de condition complexe, l'implementation de Policy devient hypercomplexe
    - gestion fine des erreurs
    - Scalabilité analytique limitée