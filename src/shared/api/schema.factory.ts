export function createInputSchema(inputSchema: any): any {
  return {
    required: ['body'],
    properties: {
      body: {
        type: 'object',
        ...inputSchema,
      },
    },
  };
}
