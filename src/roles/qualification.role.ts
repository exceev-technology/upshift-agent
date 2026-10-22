import { defineRole } from 'twenty-sdk/define';

import { QUALIFICATION_ROLE_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';
import { AGENT_ROLE_BASE, canRead, canReadAndWrite } from 'src/roles/agent-permissions';

export default defineRole({
  ...AGENT_ROLE_BASE,
  universalIdentifier: QUALIFICATION_ROLE_UNIVERSAL_IDENTIFIER,
  label: 'Agent B · Qualification',
  description:
    "Délégation de l'agent Qualification : lire le dossier et mettre à jour la qualification des prospects.",
  icon: 'IconTargetArrow',
  objectPermissions: [
    canReadAndWrite('company'),
    canReadAndWrite('person'),
    canRead('opportunity'),
    canRead('note'),
  ],
});
