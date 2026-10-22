import { STANDARD_OBJECT } from 'twenty-sdk/define';

type StandardObjectName = keyof typeof STANDARD_OBJECT;

// Agent roles start from nothing and list each object they need: the delegation lives in the role,
// a skill never widens it (brief §07, §13). They must stay within the application role or the build fails.
export const AGENT_ROLE_BASE = {
  canBeAssignedToAgents: true,
  canBeAssignedToUsers: false,
  canBeAssignedToApiKeys: false,
  canUpdateAllSettings: false,
  canReadAllObjectRecords: false,
  canUpdateAllObjectRecords: false,
  canSoftDeleteAllObjectRecords: false,
  canDestroyAllObjectRecords: false,
};

export const canRead = (object: StandardObjectName) => ({
  objectUniversalIdentifier: STANDARD_OBJECT[object].universalIdentifier,
  canReadObjectRecords: true,
  canUpdateObjectRecords: false,
  canSoftDeleteObjectRecords: false,
  canDestroyObjectRecords: false,
});

export const canReadAndWrite = (object: StandardObjectName) => ({
  ...canRead(object),
  canUpdateObjectRecords: true,
});
