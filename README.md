# Upshift Agents

Agents et skills autonomes pour les processus de l'entreprise, construits comme une app **Upshift**. Le CRM sert de cas d'application : rechercher des prospects, les qualifier et faire progresser les affaires jusqu'à leur conclusion. Les travaux validés serviront de base aux fonctions agentiques natives d'Upshift V2.

Projet Innovation ECC 2026 · Sujet 01 · Exceev Technology. Soutenance du MVP le 8 décembre 2026.

> **Statut : socle installé.** Le catalogue, les rôles et le contrat d'action compilent et passent leurs tests unitaires. L'app est installée sur l'espace ECC Upshift Agents (22 octobre) ; aucun modèle n'y est encore appelé.

## Contenu

| Élément | Où | Statut |
| --- | --- | --- |
| 4 agents : A · Acquisition, B · Qualification, C · Engagement, D · Affaires | `src/agents/`, `src/catalog/agents.ts` | prévu |
| 8 skills réutilisables, S1 à S8 (S3 et S4 partagés) | `src/skills/`, `src/catalog/skills.ts` | prévu |
| Rôle de l'application et délégation de chaque agent | `src/roles/` | prévu |
| Contrat d'action typé, contrôlé avant exécution | `src/contracts/` | testé en unitaire |
| Jev (TypeSafe AI) et modèles génératifs | fournisseurs IA de l'espace, `src/models/providers.ts` | à activer |
| Outils, déclencheurs, objets CRM, supervision | — | à construire |

Détails : [architecture](docs/architecture.md) · [catalogue](docs/catalogue.md) · [sujet complet](docs/sujet/upshift-ecc-2026-sujet-01-agents-autonomes.md).

## Démarrer

Prérequis : Node 24 (`.nvmrc`), Yarn 4 via Corepack, Docker pour un serveur local (facultatif), un accès à l'espace **ECC Upshift Agents**.

```bash
nvm install && nvm use
corepack enable
yarn install
```

Vérifier le socle :

```bash
yarn lint && yarn typecheck && yarn test:unit
```

Tests d'intégration, contre un serveur de test et avec sa clé dans l'environnement, jamais dans le dépôt :

```bash
UPSHIFT_API_KEY=<clé-de-l-espace-de-test> yarn test
```

Construire l'app et contrôler son manifeste :

```bash
yarn upshift dev:build
```

Relier la CLI à l'espace, avec l'adresse et la clé fournies par l'encadrement :

```bash
yarn upshift remote:add --url <adresse-de-l-espace> --as ecc
```

Prévisualiser puis synchroniser :

```bash
yarn upshift plan
```

```bash
yarn upshift apply
```

Activez ensuite les fournisseurs IA (dont TypeSafe AI pour Jev) avec leur clé dans les réglages IA de l'espace. Aucune clé n'est écrite dans le dépôt.

## Documentation

| Document | Pour |
| --- | --- |
| [AGENTS.md](AGENTS.md) | Règles du projet et du SDK, commandes, Definition of Done |
| [docs/architecture.md](docs/architecture.md) | Chaîne d'exécution, contrat d'action, fournisseurs IA |
| [docs/catalogue.md](docs/catalogue.md) | Agents, skills, réutilisations, paramètres métier |
| [docs/audit-upshift-v1.md](docs/audit-upshift-v1.md) | Grille d'audit du Sprint 1 |
| [docs/cas-usage.md](docs/cas-usage.md) | Fiche de cas d'usage et priorisation |
| [docs/organisation.md](docs/organisation.md) | Rôles, cérémonies, planning des sprints |

## Règles de travail

Données fictives ou anonymisées et destinataires de test uniquement. Aucun secret dans le dépôt ni sur Slack. Chaque capacité est documentée comme *disponible*, *testée*, *simulée* ou *prévue*. Une affaire gagnée dans la démo n'est jamais présentée comme une vente réelle.

## Licence

[Apache 2.0](LICENSE).
