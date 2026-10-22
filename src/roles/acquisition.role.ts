import { defineRole } from 'twenty-sdk/define';

import { ACQUISITION_ROLE_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';
import { AGENT_ROLE_BASE, canReadAndWrite } from 'src/roles/agent-permissions';

export default defineRole({
  ...AGENT_ROLE_BASE,
  universalIdentifier: ACQUISITION_ROLE_UNIVERSAL_IDENTIFIER,
  label: 'Agent A · Acquisition',
  description:
    "Délégation de l'agent Acquisition : lire, créer ou rapprocher des entreprises et des personnes.",
  icon: 'IconRadar',
  objectPermissions: [canReadAndWrite('company'), canReadAndWrite('person')],
});
