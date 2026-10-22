// Identifiers are permanent: changing one after the first sync deletes the entity and its data.
// Generate new ones with `node -e "console.log(crypto.randomUUID())"`.

export const APP_DISPLAY_NAME = 'Upshift Agents';
export const APP_DESCRIPTION =
  "Agents et skills autonomes pour les processus de l'entreprise, avec le CRM comme cas d'application.";

export const APPLICATION_UNIVERSAL_IDENTIFIER =
  '244829db-7cfc-4da4-a6bf-ab92ce1a0f37';
export const DEFAULT_ROLE_UNIVERSAL_IDENTIFIER =
  '2011052d-db2a-4de3-baac-2f54ab3690dd';
export const HEALTH_CHECK_UNIVERSAL_IDENTIFIER =
  '8165738a-f822-4ed5-9022-ac05b2862a3d';

// Agents
export const ACQUISITION_AGENT_UNIVERSAL_IDENTIFIER =
  '4a9b5ae6-9a7c-44e8-8f2a-2de8346e6ab7';
export const QUALIFICATION_AGENT_UNIVERSAL_IDENTIFIER =
  '0ecda6b9-c348-4597-b0b1-a5bda4e4afb6';
export const ENGAGEMENT_AGENT_UNIVERSAL_IDENTIFIER =
  'ec597395-2aa8-4018-94c9-6fd95fc5158c';
export const DEALS_AGENT_UNIVERSAL_IDENTIFIER =
  'adc6d739-7625-49b6-bd28-64f193291062';

// Agent roles
export const ACQUISITION_ROLE_UNIVERSAL_IDENTIFIER =
  '93afffdd-0dfb-4a4c-a6ff-da7c2e85d110';
export const QUALIFICATION_ROLE_UNIVERSAL_IDENTIFIER =
  '60d887af-1fc2-45a7-a752-c0213153ff1f';
export const ENGAGEMENT_ROLE_UNIVERSAL_IDENTIFIER =
  'bc64fecb-d96c-4f2c-9448-fc3d664afa16';
export const DEALS_ROLE_UNIVERSAL_IDENTIFIER =
  'a73f6f5f-07a5-446a-b488-5858a63535c8';

// Skills
export const S1_SEARCH_SKILL_UNIVERSAL_IDENTIFIER =
  'ac629fd4-91cd-4588-936b-f21debf7d0d9';
export const S2_ENRICH_DEDUPLICATE_SKILL_UNIVERSAL_IDENTIFIER =
  '1a815d16-d450-4238-992c-786d8ea31d27';
export const S3_QUALIFY_SCORE_SKILL_UNIVERSAL_IDENTIFIER =
  '859ada77-8a69-4aa6-90e9-7ff7567d2fa6';
export const S4_NEXT_ACTION_SKILL_UNIVERSAL_IDENTIFIER =
  'b7594520-7fdd-413e-bbaa-a40a90d73d61';
export const S5_PREPARE_CONTACT_SKILL_UNIVERSAL_IDENTIFIER =
  'c7aa38a5-1806-456c-b03e-ff9e30401491';
export const S6_ANALYSE_REPLY_SKILL_UNIVERSAL_IDENTIFIER =
  '25173c85-1d2f-49cb-bcca-3a0f23f688d2';
export const S7_ORGANISE_FOLLOW_UP_SKILL_UNIVERSAL_IDENTIFIER =
  'f3ff7be9-f5ad-4179-b37f-dd20118ba1b5';
export const S8_PREPARE_OFFER_SKILL_UNIVERSAL_IDENTIFIER =
  'defcfbb9-2f10-4f17-9548-f400915e7d14';
