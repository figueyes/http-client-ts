import { buildURL } from '../src/url'

const url = 'http://test'
describe('URL builder test', () => {
    test('build url with param', () => {
        const response = buildURL({
            baseURL: `${url}/{1}`,
            params: ['test'],
        })
        expect(response).toEqual(`${url}/test`)
    })
    test('build url with params /test/{1}/test/{2}', () => {
        const response = buildURL({
            baseURL: `${url}/test/{1}/test/{2}`,
            params: ['foo', 'bar'],
        })
        expect(response).toEqual(`${url}/test/foo/test/bar`)
    })
    test('build url with param and query', () => {
        const queryParams = {
            foo: 'test',
            bar: 'test',
        }
        const response = buildURL({
            baseURL: `${url}/{1}`,
            params: ['test'],
            queryParams,
        })
        expect(response).toEqual(`${url}/test?foo=test&bar=test`)
    })
})
