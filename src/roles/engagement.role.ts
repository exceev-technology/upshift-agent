import { defineRole } from 'twenty-sdk/define';

import { ENGAGEMENT_ROLE_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';
import { AGENT_ROLE_BASE, canRead, canReadAndWrite } from 'src/roles/agent-permissions';

export default defineRole({
  ...AGENT_ROLE_BASE,
  universalIdentifier: ENGAGEMENT_ROLE_UNIVERSAL_IDENTIFIER,
  label: 'Agent C · Engagement',
  description:
    "Délégation de l'agent Engagement : lire les prospects, enregistrer les échanges et créer les tâches de suivi.",
  icon: 'IconMessages',
  objectPermissions: [
    canRead('company'),
    canRead('person'),
    canRead('opportunity'),
    canReadAndWrite('note'),
    canReadAndWrite('noteTarget'),
    canReadAndWrite('task'),
    canReadAndWrite('taskTarget'),
  ],
});
