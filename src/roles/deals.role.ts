import { defineRole } from 'twenty-sdk/define';

import { DEALS_ROLE_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';
import { AGENT_ROLE_BASE, canRead, canReadAndWrite } from 'src/roles/agent-permissions';

export default defineRole({
  ...AGENT_ROLE_BASE,
  universalIdentifier: DEALS_ROLE_UNIVERSAL_IDENTIFIER,
  label: 'Agent D · Affaires',
  description:
    "Délégation de l'agent Affaires : faire progresser les opportunités, avec leurs notes et leurs tâches.",
  icon: 'IconBriefcase',
  objectPermissions: [
    canRead('company'),
    canRead('person'),
    canReadAndWrite('opportunity'),
    canReadAndWrite('note'),
    canReadAndWrite('noteTarget'),
    canReadAndWrite('task'),
    canReadAndWrite('taskTarget'),
  ],
});
