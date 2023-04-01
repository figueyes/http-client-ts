import axios, {
    type AxiosError,
    type AxiosResponse,
    type AxiosStatic,
    type InternalAxiosRequestConfig,
} from 'axios'
import * as rax from 'retry-axios'
import { buildURL, type clientURL } from './url'

interface HTTPResponse<T> {
    status: number
    data?: T
    retryAttempt?: number
    message?: string
}
interface HTTPRequestOptions {
    timeout?: number
    retry?: number
    delayRetry?: number
}
export class HTTPClient {
    private readonly axios: AxiosStatic
    constructor(options?: HTTPRequestOptions) {
        this.axios = axios
        this.axios.defaults.raxConfig = {
            retry: options?.retry != null ? options.retry : 0,
            retryDelay: options?.delayRetry != null ? options?.delayRetry : 0,
        }
        rax.attach(this.axios)
        this.axios.interceptors.request.use(
            (request: InternalAxiosRequestConfig) => {
                request.validateStatus = (status: number) => {
                    return status < 300 || status === 404
                }
                request.timeout = options?.timeout != null ? options.timeout : 0
                return request
            }
        )
    }

    async get<T>(
        url: clientURL,
        headers?: Record<string, string>
    ): Promise<HTTPResponse<T>> {
        try {
            const builtURL = buildURL(url)
            const res = await this.axios.get(builtURL, {
                headers,
            })
            return this.resolveResponse(res)
        } catch (e) {
            return this.rejectResponse(e as AxiosError)
        }
    }

    async post<T, V>(
        url: clientURL,
        body: T,
        headers?: Record<string, string>
    ): Promise<HTTPResponse<V>> {
        try {
            const builtURL = buildURL(url)
            const res = await this.axios.post(builtURL, body, {
                headers,
            })
            return this.resolveResponse(res)
        } catch (e) {
            return this.rejectResponse(e as AxiosError)
        }
    }

    async put<T, V>(
        url: clientURL,
        body: T,
        headers?: Record<string, string>
    ): Promise<HTTPResponse<V>> {
        try {
            const builtURL = buildURL(url)
            const res = await this.axios.put(builtURL, body, {
                headers,
            })
            return this.resolveResponse(res)
        } catch (e) {
            return this.rejectResponse(e as AxiosError)
        }
    }

    async patch<T, V>(
        url: clientURL,
        patch: T,
        headers?: Record<string, string>
    ): Promise<HTTPResponse<V>> {
        try {
            const builtURL = buildURL(url)
            const res = await this.axios.patch(builtURL, patch, {
                headers,
            })
            return this.resolveResponse(res)
        } catch (e) {
            return this.rejectResponse(e as AxiosError)
        }
    }

    async delete<T>(
        url: clientURL,
        headers?: Record<string, string>
    ): Promise<HTTPResponse<T>> {
        try {
            const builtURL = buildURL(url)
            const res = await this.axios.delete(builtURL, {
                headers,
            })
            return this.resolveResponse(res)
        } catch (e) {
            return this.rejectResponse(e as AxiosError)
        }
    }

    private getCurrentRetryAttempt(
        config: InternalAxiosRequestConfig | undefined
    ): number {
        return config?.raxConfig?.currentRetryAttempt !== undefined
            ? config.raxConfig.currentRetryAttempt
            : 1
    }

    private resolveResponse(res: AxiosResponse): HTTPResponse<any> {
        const { config, status, data } = res
        const currentRetryAttempt = this.getCurrentRetryAttempt(config)
        return {
            status,
            data,
            retryAttempt: currentRetryAttempt,
        } satisfies HTTPResponse<any>
    }

    private rejectResponse(error: AxiosError): HTTPResponse<never> {
        const { response, message } = error
        const status = response != null ? response.status : 500
        return {
            status,
            message,
        } satisfies HTTPResponse<never>
    }
}
