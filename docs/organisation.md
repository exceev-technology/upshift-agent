# Organisation

Scrum allégé, sprints d'une semaine du jeudi au mercredi. Communication dans le canal Slack `#ecc-bootcamp-upshift-agent`, questions et blocages en fil de discussion.

Le mode d'emploi détaillé (tableau, jalons, modèles d'issues, cérémonies dans GitHub) est dans le wiki : [Scrum dans GitHub](wiki/Scrum-dans-GitHub.md).

## Rôles

| Rôle | Qui | Responsabilité |
| --- | --- | --- |
| Product Owner | Mostafa (ECC) | Priorise le backlog, valide ce qui est démontré en revue |
| Responsable de la semaine | Un élève, en rotation à chaque sprint | Poste le planning et le récapitulatif, signale les blocages |
| Équipe de développement | Asmae, Lina, Idriss T., Idriss E. | Réalise et démontre les tâches du sprint |
| Référent | Hamza (Exceev) | Encadrement technique, accès et budget, revue des zones sensibles |
| Accompagnement | Hajar (Exceev), Nouhan (ECC) | Support et suivi pédagogique |

## Cérémonies

| Cérémonie | Quand | Format |
| --- | --- | --- |
| Sprint Planning | Jeudi, 1er jour du sprint | Écrit dans le canal : objectif + 3 à 5 tâches, chacune avec un responsable |
| Daily | Chaque jour ouvré | Écrit, en fil : Hier / Aujourd'hui / Blocage |
| Sprint Review | Mercredi, dernier jour | Visio de 30 min : démo de ce qui fonctionne, retours, priorités suivantes |

Modèle de daily :

> ✅ Hier : …
> 🎯 Aujourd'hui : …
> 🚧 Blocage : aucun / …

## Planning

| Période | Objectif | Preuve en revue |
| --- | --- | --- |
| Bootcamp · 15 → 21 oct. | Recherches, prise en main, cadrage | Besoins, parcours choisi, questions ouvertes |
| Sprint 1 · 22 → 28 oct. | Auditer Upshift et définir le catalogue | [Audit](audit-upshift-v1.md), 4 missions, 8 skills, accès aux modèles |
| Sprint 2 · 29 oct. → 4 nov. | Améliorer le CRM et préparer les preuves | Parcours manuel, corpus d'essai, grille métier, premiers outils |
| Sprint 3 · 5 → 11 nov. | Scénario 1 : acquisition et qualification | Recherche sourcée, déduplication, appel Jev, score vérifiable |
| Sprint 4 · 12 → 18 nov. | Scénario 2 : engagement et autonomie simple | Message de test, réponse traitée, déclencheur, actions sans doublon |
| Sprint 5 · 19 → 25 nov. | Scénario 3 : parcours d'affaire et coordination | 4 agents, skills partagés, proposition, conclusion documentée |
| Sprint 6 · 26 nov. → 2 déc. | Comparer et fiabiliser | 2 fournisseurs testés, évaluation, erreurs, composants candidats pour Upshift Agent |
| Sprint 7 · 3 → 9 déc. | Stabiliser, documenter, soutenir | Version figée avant le 8, soutenance le 8, dossier de transfert |

Jours fériés : 6 nov. (Marche Verte) et 18 nov. (Fête de l'Indépendance). En cas de retard, on réduit d'abord les canaux, sources et modèles supplémentaires ; on préserve le parcours principal, les skills réutilisables et les contrôles.

## Travailler dans le dépôt

- Une issue, une branche, une pull request. Branches : `feat/12-…`, `fix/…`, `docs/…`. Détails : [CONTRIBUTING.md](../CONTRIBUTING.md).
- Messages de commit et titres de PR en anglais, au format Conventional Commits (`feat: add score-prospect tool`).
- Avant la revue : `yarn lint`, `yarn typecheck`, `yarn test:unit` et `yarn upshift dev:build` passent.
- Backlog : le [tableau GitHub du projet](https://github.com/orgs/exceev-technology/projects/2) (Backlog, Todo, In Progress, In Review, Done) ; un sprint = un [jalon](https://github.com/exceev-technology/upshift-agent/milestones).
- Découpez en tâches de 1 à 2 jours. Bloqué plus d'une demi-journée : écrivez-le dans le canal.

## À montrer en démonstration

- Un paramètre invalide ou un accès interdit est bloqué, quel que soit le modèle.
- Une validation requise est respectée avant l'action.
- Un refus de contact arrête les relances.
- Un déclencheur rejoué ne crée pas de doublon ; une panne ne produit pas de succès fictif ; la pause est effective.
- Chaque dossier est relié aux agents, skills, modèles, actions et résultats.
