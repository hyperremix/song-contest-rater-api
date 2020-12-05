import { createResponse } from './response.factory';

describe('when creating response', () => {
  it('then status code is set', () => {
    // arrange
    const statusCode = 999;

    // act
    const result = createResponse(statusCode);

    // assert
    expect(result.statusCode).toBe(statusCode);
  });

  it('if body is undefined then body is set to an empty string', () => {
    // act
    const result = createResponse(200);

    // assert
    expect(result.body).toEqual('');
  });

  it('if body is passed then body is set', () => {
    // arrange
    const body = { foo: 'bar' };

    // act
    const result = createResponse(200, body);

    // assert
    expect(result.body).toEqual(JSON.stringify(body));
  });
});
