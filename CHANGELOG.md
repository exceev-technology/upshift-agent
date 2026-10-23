# Journal des modifications

## Non publié

Mise en place du dépôt open source.

- Fichiers communautaires : guide de contribution, code de conduite, politique de sécurité, support.
- Modèles d'issues (Fonctionnalité, Bug, Tâche) reliés aux types d'issues et au tableau du projet ; modèle de pull request ; modèles de discussions.
- Libellés et jalons des sept sprints ; `CODEOWNERS` : une approbation de l'équipe ou de l'encadrement, encadrement demandé en revue sur les zones sensibles.
- CI en deux temps (qualité rapide, puis intégration), CodeQL, revue des dépendances, OpenSSF Scorecard, Dependabot, vérification du titre des PR, libellés automatiques ; actions épinglées par empreinte de commit.
- Wiki écrit dans `docs/wiki/` et publié à chaque fusion : arrivée, Scrum dans GitHub, Git, Upshift, SDK, MCP et agents, registre des risques.
- README refondu.

## 0.1.0 — 22 octobre 2026

Socle initial du projet.

- App Upshift « Upshift Agents » (SDK 2.47, aligné sur l'espace ECC Upshift Agents ; Node 24, Yarn 4).
- Catalogue : quatre agents (A · Acquisition, B · Qualification, C · Engagement, D · Affaires) et huit skills (S1 à S8), au statut *prévu*. S3 et S4 sont partagés entre plusieurs agents.
- Rôles : rôle de l'application sans suppression, avec le droit IA ; une délégation par agent.
- Contrat d'action typé et contrôlé avant exécution, avec un registre initial de huit actions.
- Jev et les modèles génératifs passent par les fournisseurs IA de l'espace (TypeSafe AI pour Jev) : l'app ne contient aucun client de modèle ni aucune clé.
- Documentation : sujet, architecture, catalogue, audit d'Upshift V1, fiche de cas d'usage, organisation.
