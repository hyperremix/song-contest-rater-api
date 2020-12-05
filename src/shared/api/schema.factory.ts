export function createCreateInputSchema(inputSchema: any): any {
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
