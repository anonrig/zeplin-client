import Client from './';

describe('client', () => {
  it('returns a message with the name parameter', () => {
    const client = new Client('id', 'secret', 'redirect-uri');
    expect(client).toBe(Object);
  });
});
