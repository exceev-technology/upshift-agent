import { defineRole } from 'twenty-sdk/define';

import { QUALIFICATION_ROLE_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';
import { AGENT_ROLE_BASE, canRead } from 'src/roles/agent-permissions';

// Read-only: the agent may change only the qualification fields, which do not exist yet. Its single write
// goes through the crm.prospect.update-qualification tool, checked by checkActionProposal. Once those fields
// exist, field-level permissions can replace this if the agent needs direct writes.
export default defineRole({
  ...AGENT_ROLE_BASE,
  universalIdentifier: QUALIFICATION_ROLE_UNIVERSAL_IDENTIFIER,
  label: 'Agent B · Qualification',
  description:
    "Délégation de l'agent Qualification : lire le dossier ; la qualification s'écrit par l'outil dédié.",
  icon: 'IconTargetArrow',
  objectPermissions: [
    canRead('company'),
    canRead('person'),
    canRead('opportunity'),
    canRead('note'),
  ],
});
