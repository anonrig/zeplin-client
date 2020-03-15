import Client from './'

describe('client', () => {
  it('initialize properly', () => {
    const client = new Client('id', 'secret', 'redirect-uri')
    expect(client['clientId']).toEqual('id')
    expect(client['clientSecret']).toEqual('secret')
    expect(client['redirectUri']).toEqual('redirect-uri')
  })
})
