# Definition of Done

## Definition of Ready : une issue peut entrer dans un sprint quand…

- le besoin est écrit comme une story (« En tant que…, je veux…, afin de… ») ou un objectif clair ;
- les critères d'acceptation sont vérifiables, **y compris au moins un cas refusé ou en erreur** ;
- elle est estimée (`taille:`), et ne dépasse pas `taille: L` ;
- ses dépendances (accès, données, autre issue) sont connues ;
- elle porte le libellé `statut: prêt`.

## Definition of Done : une tâche est terminée quand…

- le besoin et le résultat attendu sont clairs ;
- elle est intégrée dans **ECC Upshift Agents** et visible dans le CRM, ou documentée si elle ne s'y voit pas ;
- les droits et les erreurs sont traités, le scénario est reproductible ;
- les versions (skill, agent, modèle) sont identifiables ;
- la documentation indique si c'est *disponible*, *testé*, *simulé* ou *prévu* ;
- le code a été **relu et approuvé** par un autre membre, puis fusionné sur `main` ;
- lint, typecheck, tests unitaires, build et tests d'intégration passent dans la CI ;
- aucun secret n'est dans le code ni sur Slack.

## Les statuts d'une capacité

| Statut | Signifie | Exemple |
| --- | --- | --- |
| **prévu** | Décrit, pas encore construit | Skill S8 dans le catalogue |
| **simulé** | Fonctionne avec une réponse factice ; **ne valide jamais une intégration réelle** | Score renvoyé par un faux fournisseur |
| **testé** | Vérifié par des tests automatiques ou un essai réel documenté | Appel réel à Jev sur le corpus de test |
| **disponible** | Utilisable dans ECC Upshift Agents par l'équipe | Agent B qualifie un prospect depuis le CRM |

## Pas de succès fictif

Une panne, un budget épuisé ou une donnée manquante produit un **état explicite**. Une démo qui ne passe que par les cas favorables ne prouve pas la maîtrise de l'autonomie.
