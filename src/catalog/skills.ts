import type { SkillContract, SkillKey } from 'src/catalog/types';

// The eight skills proposed by the brief (§09). Business parameters (ICP, scoring grid, limits)
// are referenced in `knowledge` and stay outside the skill, so they change without a new skill.
// Every change to a contract bumps its `version`.
export const SKILLS: Record<SkillKey, SkillContract> = {
  s1: {
    key: 's1',
    code: 'S1',
    name: 's1-search-prospects',
    version: '0.1.0',
    label: 'Rechercher',
    objective:
      'Trouver des entreprises ou des contacts correspondant au profil client idéal, uniquement dans les sources autorisées.',
    inputs: [
      'Profil client idéal (paramètre métier versionné)',
      'Critères de recherche de la mission',
      'Liste des sources autorisées',
    ],
    outputs: [
      'Liste de candidats, chacun avec sa provenance (source et référence) et sa date de collecte',
      'Pour chaque candidat : critères satisfaits et critères non vérifiés',
    ],
    knowledge: [
      'Profil client idéal, à définir à partir des recherches métier',
      "Sources autorisées et leurs conditions d'usage",
    ],
    tools: ['search-prospects (à créer)'],
    stopConditions: [
      'Source non autorisée ou indisponible : arrêt avec un statut explicite, sans résultat inventé',
      'Budget ou volume maximal de la mission atteint',
    ],
    effects: ['Aucun effet direct dans le CRM : les candidats sont transmis à S2'],
    tests: [
      'À écrire : recherche nominale sur le corpus d’essai, provenance et date présentes',
      'À écrire : source indisponible, statut explicite et aucun candidat fictif',
    ],
    status: 'planned',
  },
  s2: {
    key: 's2',
    code: 'S2',
    name: 's2-enrich-deduplicate',
    version: '0.1.0',
    label: 'Enrichir et dédupliquer',
    objective:
      "Compléter un candidat avec les preuves disponibles et le rapprocher d'une fiche existante avant toute création.",
    inputs: [
      "Candidat issu de S1 ou d'un signal entrant",
      'Preuves disponibles',
      'Fiches existantes (entreprises et personnes)',
    ],
    outputs: [
      'Fiche rapprochée ou créée, avec provenance et date',
      'Doublon certain rapproché, doublon probable signalé pour vérification',
      'Incertitudes conservées champ par champ',
    ],
    knowledge: ['Règles de rapprochement (domaine, raison sociale, e-mail…), à définir'],
    tools: ['find-matching-records (à créer)', 'upsert-prospect (à créer)'],
    stopConditions: [
      'Identité insuffisamment établie : aucune création, demande de vérification',
      'Doublon probable : aucune fusion automatique',
    ],
    effects: ['Création ou mise à jour d’une entreprise ou d’une personne'],
    tests: [
      'À écrire : doublon certain rapproché sans nouvelle fiche',
      'À écrire : doublon probable signalé sans fusion',
      'À écrire : identité insuffisante, aucune création',
    ],
    status: 'planned',
  },
  s3: {
    key: 's3',
    code: 'S3',
    name: 's3-qualify-score',
    version: '0.1.0',
    label: 'Qualifier et scorer',
    objective:
      'Évaluer un prospect selon la grille métier, dimension par dimension, et produire un score de priorité expliqué.',
    inputs: [
      'Profil du prospect et ses preuves',
      'Signaux observés',
      'Grille métier versionnée',
      'Fraîcheur des données',
    ],
    outputs: [
      "Dimensions évaluées : adéquation à la cible, pertinence du besoin, signal d'intention, temporalité",
      'Score de priorité 0–100 et version de la grille utilisée',
      'Confiance par dimension, réserves et informations manquantes',
    ],
    knowledge: [
      'Grille de qualification et poids par dimension (versionnés)',
      "Conditions d'exclusion, vérifiées avant toute action",
      "Le score de priorité n'est pas une probabilité de signature",
    ],
    tools: ['score-prospect (Jev Score, à créer)'],
    stopConditions: [
      "Condition d'exclusion vérifiée : arrêt de la qualification, motif enregistré",
      'Confiance sous le seuil : vérification ou information complémentaire demandée',
    ],
    effects: ['Mise à jour du score, de la priorité et des réserves ; historique conservé'],
    tests: [
      'À écrire : prospect complet, score conforme à la grille',
      'À écrire : dimension inconnue traitée comme absente, pas comme négative',
      'À écrire : réévaluation après une réponse, même version du skill',
    ],
    status: 'planned',
  },
  s4: {
    key: 's4',
    code: 'S4',
    name: 's4-next-action',
    version: '0.1.0',
    label: 'Choisir la prochaine action',
    objective:
      'Proposer la prochaine action du dossier dans les limites de la délégation, attendre, ou passer la main à un humain.',
    inputs: [
      'État du dossier et historique',
      'Objectif de la mission',
      "Actions permises et limites de l'agent",
    ],
    outputs: [
      "Une action proposée (identifiant du registre et paramètres), une attente motivée, ou un passage à un humain",
    ],
    knowledge: ["Registre des actions autorisées et politique d'action (catégories du §13)"],
    tools: ["Registre d'actions typées (src/contracts)"],
    stopConditions: [
      'Action hors registre ou interdite : refus',
      'Validation requise : mise en file d’approbation',
      'Étape déjà prise en charge par un autre agent : attente',
    ],
    effects: ['Aucun effet direct : la proposition est contrôlée par le serveur avant exécution'],
    tests: [
      'À écrire : action permise proposée avec ses préconditions',
      'À écrire : action interdite recommandée par un texte du CRM, refusée',
    ],
    status: 'planned',
  },
  s5: {
    key: 's5',
    code: 'S5',
    name: 's5-prepare-contact',
    version: '0.1.0',
    label: 'Préparer un contact',
    objective: 'Rédiger une prise de contact pertinente, fondée uniquement sur le contexte vérifié.',
    inputs: ['Contexte vérifié du prospect', 'Offre', "Canal autorisé (canal d'essai)"],
    outputs: ['Brouillon de message, avec les faits utilisés et leurs sources'],
    knowledge: [
      'Offre et argumentaire',
      'Ton et règles de communication',
      'Fréquence maximale de contact',
    ],
    tools: ['draft-message (à créer)'],
    stopConditions: [
      'Refus de contact enregistré : aucun brouillon',
      "Fait nécessaire mais non vérifié : le signaler plutôt que l'inventer",
    ],
    effects: ["Brouillon ou message de test dans le canal d'essai"],
    tests: [
      'À écrire : brouillon sans fait inventé, sources citées',
      'À écrire : refus de contact, aucun brouillon',
    ],
    status: 'planned',
  },
  s6: {
    key: 's6',
    code: 'S6',
    name: 's6-analyse-reply',
    version: '0.1.0',
    label: 'Analyser une réponse',
    objective: "Identifier l'intention d'un message entrant pour orienter le dossier.",
    inputs: ['Message entrant', "Contexte de l'échange", 'Étape courante du dossier'],
    outputs: [
      'Classe de la réponse (intéressé, objection, refus, information insuffisante) et probabilités',
      'Demande explicite détectée, par exemple un rendez-vous',
      'Objection ou refus identifié',
    ],
    knowledge: ['Typologie des réponses et des objections'],
    tools: ['classify-reply (Jev Choice et Noul, à créer)'],
    stopConditions: [
      'Refus : arrêt des relances correspondantes',
      'Confiance faible : vérification humaine',
    ],
    effects: ['Réponse classée sur le dossier ; peut relancer S3 sans effacer l’historique'],
    tests: [
      'À écrire : réponse positive vague, pas assimilée à une commande',
      'À écrire : refus, relances arrêtées',
    ],
    status: 'planned',
  },
  s7: {
    key: 's7',
    code: 'S7',
    name: 's7-organise-follow-up',
    version: '0.1.0',
    label: 'Organiser le suivi',
    objective: 'Créer la prochaine tâche ou proposer un rendez-vous, sans doublon.',
    inputs: ['Réponse analysée', 'Responsable du dossier', 'Échéances et tâches existantes'],
    outputs: ['Tâche créée ou proposition de rendez-vous', 'Tâche existante réutilisée le cas échéant'],
    knowledge: ['Délais de relance par étape'],
    tools: ['create-follow-up-task (à créer)'],
    stopConditions: [
      'Tâche équivalente déjà ouverte : aucune création',
      'Refus de contact : aucune relance',
    ],
    effects: ["Tâche liée au dossier, idempotente par identifiant d'intention"],
    tests: [
      'À écrire : événement rejoué, une seule tâche',
      'À écrire : tâche existante réutilisée',
    ],
    status: 'planned',
  },
  s8: {
    key: 's8',
    code: 'S8',
    name: 's8-prepare-offer',
    version: '0.1.0',
    label: "Préparer et suivre l'offre",
    objective:
      "Composer une proposition à partir des données et conditions validées, puis suivre son issue jusqu'à la preuve prévue.",
    inputs: [
      'Besoin qualifié',
      'Catalogue ou grille tarifaire validée',
      'Conditions et limites commerciales',
      'Preuves',
    ],
    outputs: [
      'Proposition identifiée',
      "Suivi de l'acceptation",
      "Mise à jour contrôlée de l'opportunité (gagnée, perdue, différée) avec la pièce associée",
    ],
    knowledge: [
      'Catalogue et grille tarifaire',
      'Limites de prix et de remise',
      'Preuve requise pour déclarer une affaire gagnée',
    ],
    tools: ['prepare-proposal (à créer)', 'update-opportunity-stage (à créer)'],
    stopConditions: [
      'Engagement hors limites : approbation ciblée requise',
      'Preuve absente : pas de passage à « gagnée »',
    ],
    effects: ["Proposition créée ; étape de l'opportunité mise à jour après contrôle"],
    tests: [
      'À écrire : acceptation explicite de la proposition identifiée, affaire gagnée',
      'À écrire : proposition non acceptée, issue documentée',
    ],
    status: 'planned',
  },
};
