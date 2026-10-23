<!--
Titre de la PR : Conventional Commits, en anglais, par exemple « feat: add score-prospect tool ».
Il devient le message du commit sur main.
-->

## Ce qui change

<!-- Quoi et pourquoi, en quelques lignes. -->

Closes #

## Comment tester

<!-- Les commandes ou le parcours dans l'espace qui prouvent que ça marche, y compris un cas refusé ou en erreur. -->

1.

## Statut de la capacité

<!-- Cochez une case. Un simulateur ne valide jamais une intégration réelle. -->

- [ ] prévue
- [ ] simulée
- [ ] testée
- [ ] disponible

## Captures ou journaux

<!-- Facultatif. Sans secret ni donnée réelle. -->

## Vérifications

- [ ] `yarn lint`, `yarn typecheck`, `yarn test:unit` et `yarn upshift dev:build` passent en local
- [ ] Les tests couvrent le comportement nouveau, y compris un refus ou une panne
- [ ] Toute écriture passe par `checkActionProposal`
- [ ] Skill modifié : `version` incrémentée dans `src/catalog/skills.ts`
- [ ] Aucun `universalIdentifier` déjà synchronisé n'a changé
- [ ] Documentation, catalogue, wiki ou CHANGELOG à jour si le changement est visible
- [ ] Aucun secret ni donnée réelle ; tous les textes visibles disent « Upshift »
