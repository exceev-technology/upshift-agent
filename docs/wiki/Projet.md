# Le projet

> 🎯 **Créer dans Upshift V1 plusieurs agents et skills métier réutilisables pour prendre en charge les processus de l'entreprise.** Le CRM sert de cas d'application : rechercher des prospects, les qualifier et faire progresser les affaires jusqu'à leur conclusion. Les travaux validés prépareront les capacités agentiques natives d'Upshift V2.

Le cadrage complet est dans le [sujet](https://github.com/exceev-technology/upshift-agent/blob/main/docs/sujet/upshift-ecc-2026-sujet-01-agents-autonomes.md). Cette page en est le résumé de travail.

## La question de recherche

Comment composer dans Upshift des agents et des skills capables de prendre en charge les processus de l'entreprise, en combinant plusieurs modèles d'IA et en maîtrisant les décisions, les permissions et les actions ?

**Hypothèses à tester**

- **Utilité métier** : une chaîne intégrée réduit les tâches manuelles, les ressaisies et les ruptures de suivi.
- **Réutilisation** : un catalogue de skills partagé facilite la création de plusieurs agents sans dupliquer les règles.
- **Complémentarité des modèles** : Jev pour les décisions structurées et d'autres modèles pour l'analyse ou la rédaction améliorent le compromis qualité, délai et coût.

L'utilité se mesure face au même CRM utilisé à la main : pertinence des prospects, qualité des actions, continuité du suivi, temps humain, coût et fiabilité. **Un résultat défavorable reste recevable** s'il est mesuré et expliqué.

## Point de départ

Nous travaillons dans l'espace **ECC Upshift Agents**, sur Upshift V1, avec une configuration CRM de base à améliorer.

1. **Auditer avant de construire** : pour chaque brique (objets, vues, workflows, agents, skills, extensions, API), noter *présente et testée*, *présente mais non configurée*, *absente* ou *à vérifier*. Grille : [audit d'Upshift V1](https://github.com/exceev-technology/upshift-agent/blob/main/docs/audit-upshift-v1.md).
2. **Partir de nos recherches** : elles guident le choix de l'activité, des critères de qualification et du parcours commercial.
3. **Réutiliser l'existant** : configurer et étendre Upshift, ne construire que ce qui manque.

## Quatre agents, un même système

| Agent | Mission | Résultat dans le CRM |
| --- | --- | --- |
| A · Acquisition | Rechercher des prospects dans des sources autorisées | Prospect sourcé et daté, fiche créée ou rapprochée, sans doublon |
| B · Qualification | Enrichir, évaluer les signaux, appliquer la grille métier | Score expliqué, priorité, informations manquantes, prochaine action |
| C · Engagement | Préparer les contacts, analyser les réponses, organiser le suivi | Message de test, réponse classée, tâche ou rendez-vous proposé |
| D · Affaires | Faire progresser l'opportunité, préparer la proposition | Opportunité à jour, proposition préparée, issue documentée |

**Règle** : une seule responsabilité active par étape. Deux agents ne contactent jamais le même prospect en même temps.

**Huit skills réutilisables** : S1 rechercher · S2 enrichir et dédupliquer · S3 qualifier et scorer · S4 choisir la prochaine action · S5 préparer un contact · S6 analyser une réponse · S7 organiser le suivi · S8 préparer et suivre une offre. Au moins un skill est utilisé par deux agents, avec la même version. Détails : [catalogue](https://github.com/exceev-technology/upshift-agent/blob/main/docs/catalogue.md).

## Jev et plusieurs modèles

- **Jev** (fournisseur TypeSafe AI) pour les décisions courtes et structurées : classer une réponse, scorer un prospect, vérifier une condition.
- **D'autres modèles** pour l'analyse, la planification ou la rédaction.
- **Pour le MVP** : un appel réel à Jev et deux fournisseurs génératifs réellement testés, avec accès et budget confirmés par l'encadrement. Les autres sont indiqués *prévus* ou *non testés*.
- Toute proposition d'action passe par un **contrat typé**, validé à l'exécution et soumis aux permissions. Le choix du modèle ne change pas les droits de l'agent.
- Un score n'est pas une probabilité de vente ; une confiance élevée ne remplace jamais une validation obligatoire.

## Ce que l'on vise au 8 décembre

Trois scénarios progressifs, à construire dans cet ordre :

| Scénario | Comportement | Preuve attendue |
| --- | --- | --- |
| 1 · Analyser | Rechercher dans un corpus autorisé, qualifier, proposer une priorité | Sources, critères, réserves et résultat vérifiables |
| 2 · Agir | Créer ou mettre à jour une fiche, organiser une action préautorisée | Écriture réelle, déclenchement automatique, trace, pas de doublon |
| 3 · Coordonner | Faire passer un dossier entre plusieurs agents jusqu'à une issue documentée | Branches, attente, reprise, contrôles, conclusion justifiée |

La démonstration inclura un déclencheur automatique, un skill partagé, une attente suivie d'une reprise, un cas incertain ou refusé, les validations nécessaires et une conclusion d'affaire fondée sur la preuve prévue par le processus.

## Vérifications à montrer en démo

- Un paramètre invalide ou un accès interdit est bloqué, quel que soit le modèle.
- Une validation requise est respectée avant l'action.
- Un refus de contact arrête les relances.
- Un déclencheur rejoué ne crée pas de doublon ; une panne ne produit pas de succès fictif ; la pause est effective.
- Chaque dossier est relié aux agents, skills, modèles, actions et résultats.

Une démo qui ne passe que par les cas favorables ne prouve pas la maîtrise de l'autonomie.

## Où se situe l'innovation

- Composer des skills entre plusieurs agents dans le même outil métier.
- Relier données, décisions et actions sur un parcours commercial complet.
- Combiner les modèles selon la tâche, avec des résultats comparables.
- Rendre l'autonomie configurable, observable et contrôlable.

## Une base pour Upshift V2

Les skills, agents, contrats d'action, adaptateurs et résultats validés serviront de base à V2. V2 doit proposer ces fonctions nativement aux TPE, aux PME et aux grandes entreprises, sur l'ensemble du parcours : prospection et CRM, devis et commandes, achats et stocks, projets et installations, SAV et maintenance, tableaux de bord et reporting.

## Règles de travail

- Données fictives ou anonymisées, corpus de prospects autorisé, destinataires de test uniquement.
- Une affaire « gagnée » dans la démo n'est jamais présentée comme une vente réelle.
- Accès et budget des modèles d'IA confirmés par l'encadrement avant usage.
- Aucun secret dans le dépôt ni dans Slack.
- Chaque capacité est *prévue*, *simulée*, *testée* ou *disponible*. Un simulateur ne valide jamais une intégration réelle.
