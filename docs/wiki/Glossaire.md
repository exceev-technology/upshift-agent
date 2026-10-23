# Glossaire

## Le projet et Upshift

| Terme | Définition |
| --- | --- |
| **Agent** | Un programme qui poursuit une mission avec un modèle, des skills, des outils et des droits. Quatre ici : A · Acquisition, B · Qualification, C · Engagement, D · Affaires |
| **App** | Un paquet TypeScript qui étend Upshift. Notre dépôt est une app |
| **checkActionProposal** | La fonction qui contrôle chaque proposition d'action avant toute écriture (`src/contracts/action.ts`) |
| **Contrat d'action** | La forme typée d'une proposition : action, version, paramètres, préconditions, identifiant d'intention |
| **Délégation** | Les actions qu'un agent a le droit de proposer, définies par son rôle |
| **Enregistrement** | Une instance d'un objet : une entreprise, une personne, une opportunité |
| **Espace de travail** | Le conteneur des données d'une organisation dans Upshift ; le nôtre : ECC Upshift Agents |
| **Fournisseur IA** | Un service de modèles activé dans les réglages IA de l'espace (TypeSafe AI pour Jev, Anthropic, Google, Mistral, OpenAI, xAI) |
| **Intention** | L'identifiant d'une action voulue ; rejouée, elle ne produit pas un second effet |
| **Jev** | Le modèle de TypeSafe AI pour les décisions bornées : classer, évaluer, vérifier |
| **Manifeste** | La description de l'app produite par le build, comparée à l'espace lors de la synchronisation |
| **MCP** | *Model Context Protocol* : un protocole ouvert pour brancher une application d'IA sur des outils et des données |
| **Objet** | Un type de donnée du CRM, standard ou personnalisé |
| **Outil** | Une fonction qu'un agent peut appeler, décrite par un schéma |
| **Rôle** | Un ensemble de droits ; le rôle d'un agent ne dépasse jamais celui de l'app |
| **Skill** | Un savoir-faire réutilisable et versionné, partageable entre agents. Huit ici : S1 à S8 |
| **Statut** | Le niveau de preuve d'une capacité : prévue, simulée, testée, disponible |
| **Synchronisation** | L'application du manifeste à un espace (`plan` pour voir, `apply` pour appliquer) |
| **universalIdentifier** | L'identifiant permanent d'une entité ; ne change jamais après la première synchronisation |
| **Vue** | Des filtres, un tri et une disposition enregistrés : table, kanban, calendrier |
| **Workflow** | Une automatisation : un déclencheur suivi d'étapes |

## Scrum

| Terme | Définition |
| --- | --- |
| **Backlog** | La liste ordonnée de tout ce qui reste à faire |
| **Daily** | Le point quotidien : hier, aujourd'hui, blocage |
| **Definition of Done** | Les conditions pour qu'une tâche soit vraiment terminée |
| **Definition of Ready** | Les conditions pour qu'une issue puisse entrer dans un sprint |
| **Incrément** | Ce qui est terminé et démontrable à la fin d'un sprint |
| **Product Owner** | La personne qui porte la vision et priorise le backlog |
| **Rétrospective** | Le moment où l'équipe améliore sa façon de travailler |
| **Scrum Master** | Ici « responsable de la semaine » : anime les cérémonies et lève les blocages |
| **Sprint** | Une période fixe (une semaine) avec un objectif et un incrément |
| **Sprint Planning** | La cérémonie qui fixe l'objectif et les tâches du sprint |
| **Sprint Review** | La démonstration de l'incrément au Product Owner |
| **Story utilisateur** | Un besoin vu par l'utilisateur : « En tant que…, je veux…, afin de… » |

## Git et GitHub

| Terme | Définition |
| --- | --- |
| **Branche** | Une ligne de travail isolée |
| **CI** | Intégration continue : les vérifications automatiques de chaque PR |
| **CODEOWNERS** | Le fichier qui désigne les relecteurs obligatoires par dossier |
| **Commit** | Un instantané du code avec un message |
| **Conventional Commits** | Le format de message `type: description` (`feat: …`, `fix: …`) |
| **Fork** | Une copie personnelle du dépôt sur GitHub |
| **Jalon** (*milestone*) | Un groupe d'issues avec une date de fin ; ici, un sprint |
| **Libellé** (*label*) | Une étiquette pour classer issues et PR |
| **Pull request** | La demande d'intégrer une branche, avec revue et CI |
| **Rebase** | Rejouer ses commits sur une version plus récente de `main` |
| **Squash merge** | Fusionner une PR en un seul commit |
