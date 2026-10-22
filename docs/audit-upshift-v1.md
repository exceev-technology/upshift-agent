# Audit d'Upshift V1 — ECC Upshift Agents

Objectif du Sprint 1 (22 → 28 oct.) : savoir ce qui est réellement disponible dans l'espace avant de construire. La documentation générale ne prouve pas qu'une fonction est activée dans l'espace étudiant (§02).

Statuts : **présente et testée** · **présente mais non configurée** · **absente** · **à vérifier**. Chaque ligne cite sa preuve : capture, lien, commande ou observation datée.

## Espace et accès

| Brique | Statut | Preuve | Responsable |
| --- | --- | --- | --- |
| Version d'Upshift déployée (l'app exige 2.47 ou plus) | présente et testée | 2.47.0, lue sur `/client-config` le 22 oct. | |
| Adresses de connexion publiées en https (`SERVER_URL` du déploiement) | présente mais non configurée | Les métadonnées OAuth annoncent `http://` ; la connexion de la CLI par navigateur échoue (22 oct.) | |
| Accès de chaque membre, rôles attribués | à vérifier | | |
| Droit d'installer une app (Applications) | à vérifier | | |
| Clé d'API ou connexion de la CLI (`yarn upshift remote:add`) | à vérifier | | |
| Budget d'essai des modèles confirmé par l'encadrement | à vérifier | | |

## CRM

| Brique | Statut | Preuve | Responsable |
| --- | --- | --- | --- |
| Entreprises, personnes, opportunités | à vérifier | | |
| Étapes du pipeline des opportunités | à vérifier | | |
| Tâches et notes liées aux fiches | à vérifier | | |
| Vues, filtres et tableaux de bord | à vérifier | | |
| Champs à ajouter (source, date de collecte, score, réserves…) | à vérifier | | |

## Automatisation

| Brique | Statut | Preuve | Responsable |
| --- | --- | --- | --- |
| Workflows : déclencheur sur événement | à vérifier | | |
| Workflows : planification | à vérifier | | |
| Workflows : étape d'agent IA | à vérifier | | |
| Fonctions de l'app : déclencheur sur événement, planification, route | à vérifier | | |
| Canal de messagerie d'essai et destinataires de test | à vérifier | | |

## IA

| Brique | Statut | Preuve | Responsable |
| --- | --- | --- | --- |
| Agents de l'app visibles et utilisables dans l'espace | à vérifier | | |
| Skills de l'app chargés par les agents | à vérifier | | |
| Fournisseurs de modèles configurés, format de `modelId` | à vérifier | | |
| Effet de `canAccessAllTools` sur les outils de l'app | à vérifier | | |
| Rôle d'agent appliqué : accès hors délégation refusé | à vérifier | | |
| Droit IA du rôle de l'application (`runAgent()`) | à vérifier | | |
| Accès à Jev (clé TypeSafe, modèle) | à vérifier | | |
| Deux fournisseurs génératifs réellement appelables | à vérifier | | |
| Serveur MCP de l'espace | à vérifier | | |

## Conclusions

- Ce qui est réutilisé tel quel :
- Ce qui est configuré :
- Ce qui est construit dans l'app, et pourquoi :
- Blocages remontés à l'encadrement :
