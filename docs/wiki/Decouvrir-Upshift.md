# Découvrir Upshift

Upshift réunit sur une même plateforme les ventes, les opérations, la finance et les RH : prospection et CRM, devis et commandes, achats et stocks, projets et installations, SAV et maintenance, tableaux de bord. Elle se configure selon les processus de l'entreprise, sans code ou par des apps, et embarque de l'IA : un chat qui comprend le contexte, et des agents qui exécutent des tâches en plusieurs étapes, avec les mêmes droits que le reste de la plateforme.

> 📚 **Documentation officielle** : [docs.upshiftcloud.com](https://docs.upshiftcloud.com/getting-started/introduction). Les pages existent en français : retirez `/en` de l'adresse. La documentation décrit la dernière version d'Upshift ; l'espace ECC Upshift Agents et notre SDK sont en **2.47** : en cas d'écart, l'espace fait foi.

## Les notions clés

| Notion | Ce que c'est | Doc |
| --- | --- | --- |
| **Espace de travail** | Le conteneur des données d'une entreprise ; le nôtre s'appelle **ECC Upshift Agents** | [Glossaire](https://docs.upshiftcloud.com/en/getting-started/core-concepts/glossary) |
| **Objet** | Un type de donnée : objets standard (entreprises, personnes, opportunités, tâches, notes) ou personnalisés | [Modèle de données](https://docs.upshiftcloud.com/en/getting-started/core-concepts/data-model) |
| **Champ** et **relation** | Les propriétés d'un objet (plus de 20 types) et les liens entre objets | [Modèle de données](https://docs.upshiftcloud.com/en/getting-started/core-concepts/data-model) |
| **Enregistrement** | Une instance d'un objet : une entreprise, une personne… | [Glossaire](https://docs.upshiftcloud.com/en/getting-started/core-concepts/glossary) |
| **Vue** | Des filtres, un tri et une disposition enregistrés : table, kanban, calendrier | [Disposition](https://docs.upshiftcloud.com/en/user-guide/layout/overview) |
| **Workflow** | Un déclencheur (événement, manuel, planifié, webhook) suivi d'étapes, dont des étapes IA | [Workflows](https://docs.upshiftcloud.com/en/getting-started/core-concepts/workflows) |
| **Rôle** | Les droits sur les objets, les champs et les réglages ; s'attribue à un membre, une clé d'API ou un agent | [Permissions](https://docs.upshiftcloud.com/en/user-guide/permissions-access/overview) |
| **IA** | Un chat contextuel et des agents pour enrichir, classer, résumer, router | [IA](https://docs.upshiftcloud.com/en/getting-started/core-concepts/ai) |
| **App** | Un paquet TypeScript qui ajoute objets, fonctions, skills, agents, vues ; son rôle limite ce qu'elle peut faire. **Notre projet est une app.** | [Apps](https://docs.upshiftcloud.com/en/getting-started/core-concepts/apps) |

## Parcours de lecture : le guide utilisateur

Environ trois heures, à faire pendant le sprint 1 :

1. [Introduction](https://docs.upshiftcloud.com/getting-started/introduction), [fonctionnalités clés](https://docs.upshiftcloud.com/en/getting-started/key-features), [démarrage rapide](https://docs.upshiftcloud.com/en/getting-started/quickstart)
2. Concepts : [modèle de données](https://docs.upshiftcloud.com/en/getting-started/core-concepts/data-model), [glossaire](https://docs.upshiftcloud.com/en/getting-started/core-concepts/glossary), [workflows](https://docs.upshiftcloud.com/en/getting-started/core-concepts/workflows), [IA](https://docs.upshiftcloud.com/en/getting-started/core-concepts/ai)
3. [Guide utilisateur](https://docs.upshiftcloud.com/en/user-guide/introduction) : [modèle de données](https://docs.upshiftcloud.com/en/user-guide/data-model/overview), puis [disposition et vues](https://docs.upshiftcloud.com/en/user-guide/layout/overview)
4. [Workflows](https://docs.upshiftcloud.com/en/user-guide/workflows/overview), puis [actions de workflow](https://docs.upshiftcloud.com/en/user-guide/workflows/capabilities/workflow-actions) (dont *AI Agent* et *Classify*) et [crédits](https://docs.upshiftcloud.com/en/user-guide/workflows/capabilities/workflow-credits)
5. IA : [vue d'ensemble](https://docs.upshiftcloud.com/en/user-guide/ai/overview), [agents IA](https://docs.upshiftcloud.com/en/user-guide/ai/capabilities/ai-agents), [droits des agents](https://docs.upshiftcloud.com/en/user-guide/ai/capabilities/permissions-access-control), [FAQ](https://docs.upshiftcloud.com/en/user-guide/ai/how-tos/ai-faq)
6. [Permissions](https://docs.upshiftcloud.com/en/user-guide/permissions-access/capabilities/permissions) et [paramètres](https://docs.upshiftcloud.com/en/user-guide/settings/overview)

Ensuite : [SDK Upshift](SDK-Upshift.md) pour la partie développeur.

## Exercices dans l'espace ECC Upshift Agents

Uniquement avec des **données fictives**. Notez vos observations : elles alimentent l'[audit d'Upshift V1](https://github.com/exceev-technology/upshift-agent/blob/main/docs/audit-upshift-v1.md).

1. **Le parcours manuel.** Créez une entreprise fictive, une personne rattachée et une opportunité. Faites avancer l'opportunité d'une étape. Combien de clics, de ressaisies ?
2. **Les vues.** Créez une vue kanban des opportunités par étape, puis une vue filtrée « mes prospects à relancer ».
3. **Le modèle de données.** Dans *Settings → Data Model*, listez les objets et les champs du CRM. Que manque-t-il pour qualifier un prospect ?
4. **Un workflow.** Créez un workflow qui crée une tâche quand une opportunité change d'étape. Testez-le, puis désactivez-le.
5. **L'IA.** Posez au chat une question sur un enregistrement. Dans un workflow, regardez l'action *AI Agent* : que faut-il pour la configurer ?
6. **Les droits.** Ouvrez *Settings → Members → Roles*. Quel rôle a une app ? Comment attribue-t-on un rôle à un agent ?

Partagez une découverte utile dans [Show and tell](https://github.com/exceev-technology/upshift-agent/discussions/categories/show-and-tell).
