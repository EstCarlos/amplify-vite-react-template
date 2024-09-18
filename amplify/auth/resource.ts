import { defineAuth } from '@aws-amplify/backend';
import { readFileSync } from 'fs';
import path from 'path';
/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
const xmlFilePath = path.join(process.cwd(), 'SAML', 'metadata.xml');
const metadataContent = readFileSync(xmlFilePath, 'utf8');
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      saml: {
        name: 'GoogleIDSAML',
        metadata: {
          metadataContent: metadataContent, // or content of the metadata file
          metadataType: 'FILE', // or 'FILE'
        },
        attributeMapping: {
          email: 'EMAIL',
          familyName: 'Last name',
          givenName: 'First name'
        }
      },
      logoutUrls: ['http://localhost:3000/', 'https://main.d35s0i2t8frbrj.amplifyapp.com'],
      callbackUrls: [
        'http://localhost:3000/',
        'https://main.d35s0i2t8frbrj.amplifyapp.com',
      ],
    },
  },
});