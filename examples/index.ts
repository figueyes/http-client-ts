import { HTTPClient } from '../src/client'

const getResourceFromAPI = async (): Promise<any> => {
    const url = 'https://pokeapi.co/api/v2/pokemon/ditto'
    const client = new HTTPClient()
    return await client.get({
        baseURL: url,
    })
}