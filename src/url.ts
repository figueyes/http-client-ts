import buildUrl from 'build-url-ts'

const regExp = /{\d+}/g // identify structures -> {1}

export interface clientURL {
    baseURL: string
    params?: string[]
    queryParams?: Record<string, string>
}

export function buildURL(url: clientURL): string {
    let { baseURL, params, queryParams } = url
    params = params != null ? params : []
    queryParams = queryParams != null ? queryParams : undefined
    const baseURLWithParams = buildBaseURLWithParams(baseURL, params)
    return buildUrl(baseURLWithParams, { queryParams })
}
function buildBaseURLWithParams(base: string, params: string[]): string {
    const replacers = base.match(regExp)?.map((r) => r.toString())
    if (replacers === undefined) {
        return base
    }
    params.forEach((value: string, key: number) => {
        base = base.replace(replacers[key], value)
    })
    return base
}
