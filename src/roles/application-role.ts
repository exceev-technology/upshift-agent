import { defineApplicationRole, SystemPermissionFlag } from 'twenty-sdk/define';

import {
  APP_DISPLAY_NAME,
  DEFAULT_ROLE_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

// Ceiling for the logic functions and for every agent role. No deletion: agents never remove records.
// The AI flag lets logic functions start the app's agents with runAgent().
export default defineApplicationRole({
  universalIdentifier: DEFAULT_ROLE_UNIVERSAL_IDENTIFIER,
  label: `${APP_DISPLAY_NAME} — rôle de l'application`,
  description: `Droits maximaux des fonctions et des agents de ${APP_DISPLAY_NAME}`,
  canReadAllObjectRecords: true,
  canUpdateAllObjectRecords: true,
  canSoftDeleteAllObjectRecords: false,
  canDestroyAllObjectRecords: false,
  permissionFlagUniversalIdentifiers: [SystemPermissionFlag.AI],
});
