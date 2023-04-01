import { HTTPClient } from '../src/client'
import nock, { type Scope } from 'nock'

const baseURL = 'https://test.com'

nock.disableNetConnect()

describe('client test', () => {
    afterEach(() => {
        nock.cleanAll()
    })
    test('GET with fail caused by timeout', async () => {
        const client = new HTTPClient({
            timeout: 1000,
        })
        const url = { baseURL }
        const scope: Scope = nock(baseURL)
            .get('/')
            .delayConnection(2000)
            .reply(500, { message: 'timeout of 1000ms exceeded' })
        const response = await client.get(url)
        expect(response.status).toEqual(500)
        expect(response.message).toEqual('timeout of 1000ms exceeded')
        scope.done()
    })
    test('GET endpoint with headers', async () => {
        const url = { baseURL }
        const scope = nock(baseURL).get('/').reply(200, 'yep')
        const client = new HTTPClient()
        const response = await client.get(url, {
            'content-type': 'application-json',
        })
        expect(response.status).toEqual(200)
        expect(response.data).toEqual('yep')
        scope.done()
    })
    test('GET endpoint with internal error', async () => {
        const url = { baseURL }
        const scope = nock(baseURL).get('/').reply(500)
        const client = new HTTPClient()
        const response = await client.get(url)
        expect(response.status).toEqual(500)
        scope.done()
    })
    test('GET endpoint with not found with retry', async () => {
        const url = { baseURL }
        const scope = nock(baseURL).get('/').reply(500).get('/').reply(404)
        const client = new HTTPClient({
            retry: 3,
            delayRetry: 1,
        })
        const response = await client.get(url)
        expect(response.status).toEqual(404)
        expect(response.data).toEqual('')
        expect(response.retryAttempt).toEqual(1)
        scope.done()
    })
    test('GET endpoint with http client basePath', async () => {
        const url = { baseURL }
        const scope = nock(baseURL).get('/').reply(200, 'yep')
        const client = new HTTPClient()
        const response = await client.get(url)
        expect(response.status).toEqual(200)
        scope.done()
    })
    test('GET endpoint with retry', async () => {
        const url = { baseURL }
        const scope = nock(baseURL)
            .get('/')
            .replyWithError('500')
            .get('/')
            .replyWithError('500')
            .get('/')
            .reply(200, 'yep')
        const client = new HTTPClient({
            retry: 5,
            delayRetry: 1,
        })

        const response = await client.get(url)
        expect(response.data).toEqual('yep')
        expect(response.retryAttempt).toEqual(2)
        scope.done()
    })
    test('POST with body not retry', async () => {
        const url = { baseURL: baseURL }
        const scope = nock(baseURL)
            .post('/', { foo: 'test' })
            .reply(200, { foo: 'test' })
        const client = new HTTPClient()
        const response = await client.post(url, { foo: 'test' }, {})
        expect(response.status).toEqual(200)
        expect(response.retryAttempt).toEqual(1)
        expect(response.data).toEqual({ foo: 'test' })
        scope.done()
    })
    test('PUT with params and body', async () => {
        const url = { baseURL: `${baseURL}/{1}`, params: ['test'] }
        const client = new HTTPClient()
        const scope = nock(baseURL)
            .put('/test', { foo: 'test' })
            .reply(201, { foo: 'test' })
        const response = await client.put(url, { foo: 'test' }, {})
        expect(response.status).toEqual(201)
        expect(response.retryAttempt).toEqual(1)
        expect(response.data).toEqual({ foo: 'test' })
        scope.done()
    })
    test('PATCH with params and body', async () => {
        const url = { baseURL: `${baseURL}/{1}`, params: ['test'] }
        const client = new HTTPClient()
        const scope = nock(baseURL)
            .patch('/test', { foo: 'test' })
            .reply(201, { foo: 'test' })
        const response = await client.patch(url, { foo: 'test' }, {})
        expect(response.status).toEqual(201)
        expect(response.retryAttempt).toEqual(1)
        expect(response.data).toEqual({ foo: 'test' })
        scope.done()
    })
    test('DELETE with exception and status 500', async () => {
        const url = { baseURL: `${baseURL}/{1}`, params: ['test'] }
        const client = new HTTPClient({
            retry: 2,
            delayRetry: 1,
        })
        const scope: Scope = nock(baseURL)
            .delete('/test')
            .reply(500)
            .delete('/test')
            .reply(500)
            .delete('/test')
            .reply(500)
        const response = await client.delete(url)
        expect(response.status).toEqual(500)
        expect(response.message).toEqual('Request failed with status code 500')
        scope.done()
    })
})
