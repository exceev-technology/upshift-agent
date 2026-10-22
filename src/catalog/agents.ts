import type { AgentCard, AgentKey } from 'src/catalog/types';

const DECISION_MODEL = 'Jev (TypeSafe) pour les décisions bornées';
const GENERATION_MODEL = "Modèle par défaut de l'espace, à choisir et comparer (§12)";

// The four agents proposed by the brief (§08). Action identifiers refer to src/contracts/action-registry.ts.
export const AGENTS: Record<AgentKey, AgentCard> = {
  acquisition: {
    key: 'acquisition',
    code: 'A',
    name: 'acquisition-agent',
    version: '0.1.0',
    label: 'A · Acquisition',
    mission:
      'Rechercher des entreprises ou des contacts à partir du profil cible et des sources autorisées, puis créer ou rapprocher leur fiche.',
    owner: 'À désigner',
    skills: ['s1', 's2'],
    dataSources: ["Sources de prospects autorisées (corpus d'essai)", 'Entreprises et personnes du CRM'],
    triggers: [
      { type: 'manual' },
      { type: 'schedule', description: 'Recherche planifiée, fréquence à définir' },
    ],
    models: { decisions: DECISION_MODEL, generation: GENERATION_MODEL },
    allowedActions: ['crm.prospect.upsert'],
    limits: ['Sources autorisées uniquement', 'Volume maximal de candidats par exécution : à définir'],
    approvals: ['Doublon probable : vérification humaine avant tout rapprochement'],
    handOff: 'Transmet la fiche et ses sources à la qualification.',
    state: 'draft',
  },
  qualification: {
    key: 'qualification',
    code: 'B',
    name: 'qualification-agent',
    version: '0.1.0',
    label: 'B · Qualification',
    mission:
      'Analyser un prospect ou un nouveau signal, vérifier les informations et appliquer la grille métier.',
    owner: 'À désigner',
    skills: ['s2', 's3', 's4'],
    dataSources: ['Entreprises, personnes et signaux du CRM', 'Grille de qualification versionnée'],
    triggers: [
      { type: 'event', description: 'Prospect créé ou nouveau signal enregistré' },
      { type: 'manual' },
    ],
    models: { decisions: DECISION_MODEL, generation: GENERATION_MODEL },
    allowedActions: ['crm.prospect.update-qualification'],
    limits: ['Ne modifie que les champs de qualification'],
    approvals: ['Confiance sous le seuil : vérification humaine'],
    handOff: "Transmet les critères, les réserves et la priorité à l'engagement.",
    state: 'draft',
  },
  engagement: {
    key: 'engagement',
    code: 'C',
    name: 'engagement-agent',
    version: '0.1.0',
    label: 'C · Engagement',
    mission:
      'Préparer une prise de contact pertinente, traiter une réponse et organiser le suivi autorisé.',
    owner: 'À désigner',
    skills: ['s5', 's6', 's7', 's3', 's4'],
    dataSources: ['Prospects qualifiés', 'Échanges et tâches du dossier'],
    triggers: [
      { type: 'event', description: 'Prospect qualifié prioritaire' },
      { type: 'event', description: 'Réponse entrante sur le canal d’essai' },
    ],
    models: { decisions: DECISION_MODEL, generation: GENERATION_MODEL },
    allowedActions: ['engagement.message.draft', 'engagement.message.send-test', 'crm.task.create'],
    limits: [
      "Canal d'essai et destinataires de test uniquement",
      'Fréquence maximale de contact : à définir',
      'Arrêt des relances après un refus',
    ],
    approvals: ["Envoi d'un message : validation du contenu exact"],
    handOff: "Transmet le contexte des échanges et les prochaines étapes au suivi d'affaire.",
    state: 'draft',
  },
  deals: {
    key: 'deals',
    code: 'D',
    name: 'deals-agent',
    version: '0.1.0',
    label: 'D · Affaires',
    mission:
      "Faire progresser l'opportunité, préparer la proposition, suivre les étapes et constater la conclusion.",
    owner: 'À désigner',
    skills: ['s4', 's8', 's7'],
    dataSources: ['Opportunités, propositions et pièces du dossier', 'Catalogue et conditions validés'],
    triggers: [
      { type: 'event', description: 'Rendez-vous tenu ou besoin précisé' },
      { type: 'schedule', description: 'Revue des opportunités ouvertes' },
    ],
    models: { decisions: DECISION_MODEL, generation: GENERATION_MODEL },
    allowedActions: ['deals.proposal.prepare', 'crm.opportunity.update-stage', 'crm.task.create'],
    limits: ["Limites de prix et de remise de l'entreprise"],
    approvals: [
      'Engagement commercial hors limites',
      'Passage à « gagnée » : preuve prévue obligatoire',
    ],
    handOff: "Poursuit le dossier jusqu'à son issue documentée ou son arrêt justifié.",
    state: 'draft',
  },
};
