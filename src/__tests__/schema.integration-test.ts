import { CoreApiClient } from 'twenty-client-sdk/core';
import { MetadataApiClient } from 'twenty-client-sdk/metadata';
import { APPLICATION_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';
import { describe, expect, it } from 'vitest';

describe('App installation', () => {
  it('should find the installed app in the applications list', async () => {
    const client = new MetadataApiClient();

    const result = await client.query({
      findManyApplications: {
        id: true,
        name: true,
        universalIdentifier: true,
      },
    });

    const app = result.findManyApplications.find(
      (a: { universalIdentifier: string }) =>
        a.universalIdentifier === APPLICATION_UNIVERSAL_IDENTIFIER,
    );

    expect(app).toBeDefined();
  });
});

describe('CoreApiClient', () => {
  it('should support CRUD on standard objects', async () => {
    const client = new CoreApiClient();

    const created = await client.mutation({
      createNote: {
        __args: { data: { title: 'Integration test note' } },
        id: true,
      },
    });
    // The generated client may type the result as optional, depending on the workspace schema.
    const noteId = created.createNote?.id;

    if (noteId === undefined) {
      throw new Error('createNote returned no id');
    }

    await client.mutation({
      destroyNote: {
        __args: { id: noteId },
        id: true,
      },
    });
  });
});
