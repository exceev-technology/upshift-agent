# Catalogue des agents et des skills

Source de vérité : `src/catalog/agents.ts` et `src/catalog/skills.ts`. Ce document les résume ; mettez-le à jour dans la même pull request que le code. Tout est au statut **prévu** tant qu'aucun test sur l'espace ne prouve le contraire.

## Agents

| Agent | Mission | Skills | Déclencheurs | Actions permises | Validations |
| --- | --- | --- | --- | --- | --- |
| A · Acquisition | Rechercher des prospects dans les sources autorisées, créer ou rapprocher leur fiche | S1, S2 | manuel, planification | `crm.prospect.upsert` | doublon probable |
| B · Qualification | Analyser un prospect ou un signal, appliquer la grille métier | S2, S3, S4 | prospect créé, signal, manuel | `crm.prospect.update-qualification` | confiance sous le seuil |
| C · Engagement | Préparer le contact, traiter la réponse, organiser le suivi | S5, S6, S7, S3, S4 | prospect prioritaire, réponse entrante | `engagement.message.draft`, `engagement.message.send-test`, `crm.task.create` | envoi d'un message |
| D · Affaires | Faire progresser l'opportunité jusqu'à son issue documentée | S4, S8, S7 | rendez-vous tenu, revue planifiée | `deals.proposal.prepare`, `crm.opportunity.update-stage`, `crm.task.create` | engagement hors limites, passage à « gagnée » |

Passages de relais : A transmet la fiche et ses sources ; B les critères, réserves et priorité ; C le contexte des échanges et les prochaines étapes ; D poursuit jusqu'à l'issue ou l'arrêt justifié. Une seule responsabilité active par étape.

Responsable de chaque agent : à désigner en Sprint 1.

## Skills

| Skill | Entrées principales | Sortie vérifiable | Outils prévus |
| --- | --- | --- | --- |
| S1 · Rechercher | Profil client idéal, critères, sources autorisées | Candidats avec provenance et date | `search-prospects` |
| S2 · Enrichir et dédupliquer | Candidat, preuves, fiches existantes | Fiche rapprochée ou créée, incertitudes conservées | `find-matching-records`, `upsert-prospect` |
| S3 · Qualifier et scorer | Profil, signaux, grille versionnée, fraîcheur | Dimensions, score 0–100, réserves, version | `score-prospect` (Jev Score) |
| S4 · Choisir la prochaine action | État du dossier, objectif, actions permises | Action proposée, attente ou passage à un humain | registre d'actions |
| S5 · Préparer un contact | Contexte vérifié, offre, canal d'essai | Brouillon sans fait inventé | `draft-message` |
| S6 · Analyser une réponse | Message, contexte, étape | Intention, objection, demande ou refus | `classify-reply` (Jev Choice, Noul) |
| S7 · Organiser le suivi | Réponse, responsable, tâches existantes | Tâche ou rendez-vous sans doublon | `create-follow-up-task` |
| S8 · Préparer et suivre l'offre | Besoin qualifié, catalogue, conditions, preuves | Proposition suivie, issue de l'opportunité contrôlée | `prepare-proposal`, `update-opportunity-stage` |

Chaque contrat précise aussi les connaissances métier, les conditions d'arrêt, les effets possibles et les tests à écrire.

## Réutilisation

| Skill | A | B | C | D |
| --- | :-: | :-: | :-: | :-: |
| S1 | ● | | | |
| S2 | ● | ● | | |
| S3 | | ● | ● | |
| S4 | | ● | ● | ● |
| S5 | | | ● | |
| S6 | | | ● | |
| S7 | | | ● | ● |
| S8 | | | | ● |

S3 sert à qualifier un nouveau prospect (B) puis à le réévaluer après une réponse (C). S4 est utilisé par B, C et D. Les tests unitaires vérifient que chaque agent cite la même version du skill.

## Paramètres métier à définir

- Activité retenue et profil client idéal (Sprint 1, à partir des recherches).
- Grille de qualification : niveaux décrits et poids de chaque dimension, versionnés.
- Conditions d'exclusion et de refus de contact.
- Sources de prospects autorisées et corpus d'essai.
- Limites de prix et de remise, preuve requise pour déclarer une affaire gagnée.
- Seuils de confiance, réglés sur les cas de calibrage.
