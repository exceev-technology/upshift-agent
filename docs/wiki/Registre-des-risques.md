# Registre des risques

Ce qui peut empêcher une démonstration réussie le 8 décembre, ce qui nous alerte, et ce qu'on fait pour l'éviter. Le registre est revu à chaque Sprint Review ; toute personne peut proposer un risque par une pull request ou dans une discussion.

**Échelle** : probabilité (P) et impact (I) de 1 (faible) à 3 (élevé). **Score = P × I** : 6 ou plus, on agit ce sprint ; 3 à 4, on surveille ; 1 à 2, on accepte.

| ID | Risque | P | I | Score | Signal d'alerte | Parade | Responsable | Statut |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R1 | Accès à Jev, aux fournisseurs génératifs ou au budget IA confirmés trop tard | 2 | 3 | 6 | Aucun appel réel à Jev à la fin du sprint 2 | Confirmer les accès au sprint 1 ; en attendant, développer contre un simulateur déclaré *simulé* | Encadrement, PO | ouvert |
| R2 | Membres pas encore actifs sur GitHub | 2 | 3 | 6 | Un membre sans PR fusionnée à la fin du sprint 1 | Invitations envoyées, issue d'arrivée assignée, binôme pour la première PR | Hamza | ouvert |
| R3 | Courbe d'apprentissage cumulée : Git, Scrum, SDK, agents | 3 | 2 | 6 | PR ouvertes depuis plus de 3 jours, CI rouge répétée, peu de commits | Parcours d'arrivée, exercices du wiki, programmation en binôme, questions en Q&A | Responsable de la semaine | ouvert |
| R4 | Revues lentes : les PR attendent et bloquent | 2 | 2 | 4 | Une PR en attente de revue depuis plus de 24 h ouvrées | Revue sous 24 h, demandée nominativement ; zones sensibles relues deux fois par semaine | Toute l'équipe | ouvert |
| R5 | Périmètre trop ambitieux, scénario 3 inachevé | 2 | 3 | 6 | Scénario 1 non démontré à la fin du sprint 3 | Scénarios dans l'ordre ; réduire d'abord canaux, sources et modèles ; arbitrage en review | PO | ouvert |
| R6 | Démo limitée aux cas favorables | 2 | 3 | 6 | Stories sans critère de refus ou de panne | Un cas refusé ou en erreur obligatoire dans la Definition of Ready | PO | ouvert |
| R7 | Fuite d'un secret (clé d'API dans le code, un journal ou Slack) | 1 | 3 | 3 | Alerte d'analyse des secrets, push bloqué | Protection à l'envoi, clés par l'environnement, procédure de [SECURITY.md](https://github.com/exceev-technology/upshift-agent/blob/main/SECURITY.md) | Toute l'équipe | surveillé |
| R8 | Écarts de version : SDK 2.47, CLI 2.46, documentation plus récente | 2 | 2 | 4 | Une fonction documentée absente ou différente dans l'espace | Versions alignées sur l'espace, vérification dans l'espace avant de s'appuyer sur la doc | Hamza | surveillé |
| R9 | Skills et agents encore *alpha* dans le SDK | 2 | 2 | 4 | Comportement qui change entre deux versions | Contrats dans notre code (`src/catalog/`), tests, mise à jour du SDK seulement en connaissance de cause | Hamza | surveillé |
| R10 | Indisponibilité de l'instance de test amont dans la CI | 1 | 2 | 2 | Tests d'intégration rouges sans changement de code | Action épinglée par empreinte, relance, ticket si persistant | Hamza | accepté |
| R11 | Jours fériés (6 et 18 nov.) et charge académique | 3 | 1 | 3 | Vélocité en baisse sur les sprints 3 et 4 | Moins de tâches planifiées sur ces sprints | Responsable de la semaine | surveillé |
| R12 | Décisions produit tardives | 2 | 2 | 4 | Issues `statut: à trier` depuis plus de 3 jours | Tri deux fois par semaine, arbitrages écrits dans l'issue | PO | ouvert |
| R13 | Données réelles introduites par erreur | 1 | 3 | 3 | Nom ou adresse réels dans le corpus, une issue ou une capture | Corpus autorisé et fictif, vérification en revue | Toute l'équipe | surveillé |
| R14 | Crédits IA épuisés pendant les essais ou la démo | 2 | 2 | 4 | Exécutions d'agent en échec pour crédits | Suivi des crédits, budget par sprint, état d'échec explicite | Encadrement | ouvert |
| R15 | Connaissance concentrée sur une personne (contrats, CI) | 2 | 2 | 4 | Une seule personne modifie et comprend `src/contracts/` | Revues croisées, binômes, documentation à jour | Responsable de la semaine | ouvert |

## Risques fermés

Un risque fermé reste ici, avec la date et la raison de sa fermeture.

| ID | Risque | Fermé le | Raison |
| --- | --- | --- | --- |
