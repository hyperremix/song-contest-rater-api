import { createInputSchema } from './schema.factory';

describe('when creating input schema', () => {
  const inputSchema = {
    required: ['test'],
    properties: {
      test: {
        type: 'string',
      },
    },
  };

  it('then body is required', () => {
    // act
    const result = createInputSchema(inputSchema);

    // assert
    expect(result.required).toEqual(['body']);
  });

  it('then body contains parameter schema', () => {
    // act
    const result = createInputSchema(inputSchema);

    // assert
    expect(result.properties.body).toEqual({ ...inputSchema, type: 'object' });
  });
});
