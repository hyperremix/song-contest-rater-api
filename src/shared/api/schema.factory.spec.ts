import { createCreateInputSchema } from './schema.factory';

describe('when creating CreateInputSchema', () => {
  const createInputSchema = {
    required: ['test'],
    properties: {
      test: {
        type: 'string',
      },
    },
  };

  it('then body is required', () => {
    // act
    const result = createCreateInputSchema(createInputSchema);

    // assert
    expect(result.required).toEqual(['body']);
  });

  it('then body contains parameter schema', () => {
    // act
    const result = createCreateInputSchema(createInputSchema);

    // assert
    expect(result.properties.body).toEqual({ ...createInputSchema, type: 'object' });
  });
});
