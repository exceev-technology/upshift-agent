# Politique de sécurité

> **To report a vulnerability, use [GitHub private vulnerability reporting](https://github.com/exceev-technology/upshift-agent/security/advisories/new). Do not open a public issue.** English reports are welcome.

## Signaler une vulnérabilité

**N'ouvrez pas d'issue publique, de discussion ni de message Slack** pour une faille de sécurité.

Utilisez le [signalement privé de GitHub](https://github.com/exceev-technology/upshift-agent/security/advisories/new) (onglet *Security* → *Report a vulnerability*). Seuls les responsables du dépôt voient votre rapport.

Indiquez si possible :

- la nature de la faille et son impact (lecture ou écriture non autorisée, contournement d'un contrôle, fuite de secret…) ;
- le composant concerné (fichier, fonction, workflow, skill, agent) et le commit ou la version ;
- les étapes pour reproduire, avec des données fictives ;
- une piste de correction, si vous en avez une.

## Ce que nous nous engageons à faire

Upshift Agents est un projet étudiant encadré par Exceev Technology : les délais ci-dessous sont des objectifs, tenus au mieux.

| Étape | Délai visé |
| --- | --- |
| Accusé de réception | 3 jours ouvrés |
| Première évaluation (gravité, périmètre) | 7 jours ouvrés |
| Correctif d'une faille critique ou haute | dès que possible, avant toute démonstration |
| Publication d'un avis de sécurité | après le correctif, en vous créditant si vous le souhaitez |

Nous vous tenons informé·e à chaque étape dans le fil du signalement privé.

## Versions prises en charge

| Version | Prise en charge |
| --- | --- |
| `main` | ✅ |
| Dernière version publiée (0.x) | ✅ |
| Versions antérieures | ❌ |

## Périmètre

**Dans le périmètre :**

- le code de ce dépôt : contrats d'action (`src/contracts/`), rôles et délégations (`src/roles/`), fonctions et outils des agents, catalogue des skills et des agents ;
- tout moyen de faire exécuter une écriture **sans passer par `checkActionProposal`**, ou de faire accepter une proposition qui devrait être refusée (action non déléguée, preuve non vérifiée, approbation absente, intention rejouée) ;
- toute injection d'instructions par le contenu du CRM ou d'un message qui amène un agent à agir hors de ses droits : ce contenu est une donnée, jamais une instruction ;
- les workflows GitHub Actions de ce dépôt (permissions excessives, injection dans un workflow, fuite de jeton).

**Hors périmètre :**

- la plateforme Upshift elle-même : signalez-la par le même canal, nous la transmettrons à l'équipe concernée ;
- les attaques par déni de service, l'ingénierie sociale, les tests sur des comptes ou des données qui ne vous appartiennent pas ;
- les rapports issus d'outils automatiques sans démonstration d'impact.

## Secrets

**Aucune clé, aucun jeton, aucun mot de passe** dans le code, la configuration, les tests, les issues, le wiki ou Slack, pas même une valeur par défaut. Les clés passent par l'environnement (`UPSHIFT_API_KEY` pour les tests d'intégration) ; celles des fournisseurs IA se renseignent dans les réglages IA de l'espace.

**Si un secret a été exposé**, même quelques secondes, même sur une branche :

1. **Révoquez-le immédiatement** auprès de son émetteur (espace Upshift, fournisseur IA) et remplacez-le. Supprimer le commit ne suffit pas : l'historique et les copies restent.
2. Prévenez l'encadrement en privé, avec l'heure d'exposition et l'endroit.
3. Nous purgeons ensuite l'historique si nécessaire et documentons l'incident, sans recherche de coupable.

## Mesures en place

| Mesure | Rôle |
| --- | --- |
| Analyse des secrets et protection à l'envoi | Bloque un `git push` qui contient une clé connue |
| Dependabot (alertes et mises à jour de sécurité) | Signale et corrige les dépendances vulnérables |
| CodeQL (`security-extended`) | Analyse statique du TypeScript et des workflows à chaque PR |
| Revue des dépendances | Refuse une PR qui ajoute une dépendance à vulnérabilité haute ou critique |
| OpenSSF Scorecard | Mesure chaque semaine les bonnes pratiques de la chaîne d'approvisionnement |
| Règles de la branche `main` | PR obligatoire, revue, vérifications CI, pas de force-push ni de suppression |
| `CODEOWNERS` | Revue demandée à l'équipe sur chaque PR, et à l'encadrement sur les contrats, les rôles, les identifiants, la CI et les dépendances |
| Workflows à moindre privilège | Jeton en lecture seule par défaut, actions épinglées par empreinte de commit |

## Divulgation responsable

Nous ne poursuivrons pas une personne qui, de bonne foi, recherche et signale une vulnérabilité en respectant cette politique : sans accéder à des données qui ne lui appartiennent pas, sans dégrader le service, et en nous laissant le temps de corriger avant toute publication.
