import { defineApplication } from 'twenty-sdk/define';

import {
  APP_DESCRIPTION,
  APP_DISPLAY_NAME,
  APPLICATION_UNIVERSAL_IDENTIFIER,
  JEV_MODEL_VARIABLE_UNIVERSAL_IDENTIFIER,
  TYPESAFE_API_KEY_VARIABLE_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineApplication({
  universalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
  displayName: APP_DISPLAY_NAME,
  description: APP_DESCRIPTION,
  author: 'Exceev Technology',
  category: 'Sales',
  logo: 'public/logo.png',
  // Read by logic functions as environment variables; secrets never reach front components.
  applicationVariables: {
    TYPESAFE_API_KEY: {
      universalIdentifier: TYPESAFE_API_KEY_VARIABLE_UNIVERSAL_IDENTIFIER,
      label: 'Clé API TypeSafe',
      description: 'Clé utilisée pour appeler Jev. Fournie par l’encadrement, jamais dans le dépôt.',
      isSecret: true,
      isRequired: false,
    },
    JEV_MODEL: {
      universalIdentifier: JEV_MODEL_VARIABLE_UNIVERSAL_IDENTIFIER,
      label: 'Modèle Jev',
      description: 'Nom du modèle System One appelé pour les décisions bornées.',
      value: 'jev-latest',
      isRequired: false,
    },
  },
});
