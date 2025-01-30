import { NetSuiteError, RawNetsuiteError } from "./error";

export type ParamValue = string | boolean | number

export type ApiParams = Record<string, ParamValue | ParamValue[]>

export type ApiHeaders =  {
    'Content-Type'?: 'application/json' | 'text/html'
}

type HeadersMap = {
    [HK in keyof Required<ApiHeaders>]: {
        name: HK
        values: {
            [HV in Required<ApiHeaders>[HK]]: HV
        } 
    }
}

const headersMap: HeadersMap = {
    "Content-Type": {
        name: 'Content-Type',
        values: {
            "application/json": 'application/json',
            "text/html": 'text/html'
        }
    }
}

export interface Api {
    get<TData extends any, P extends ApiParams = {}>(url: string, params: P): Promise<TData>
    post<TData extends unknown, TBody extends Record<string, any>>(url: string, body: TBody): Promise<TData>
}

export class Api implements Api {
    private headers: ApiHeaders = {
        "Content-Type": 'application/json'
    }

    async get<TData extends unknown, P extends ApiParams = {},>(url: string, params?: P): Promise<TData> {
        return this.fetch(this.mountFullUrl(url, params), {
            headers: this.headers
        })
    }

    async post<TData extends unknown, TBody extends Record<string, any> = Record<string, any>>(url: string, body: TBody): Promise<TData> {
        return this.fetch(url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        })
    }

    //#region Private Methods
    private mountFullUrl(url: string, params?: ApiParams): string {
        const [path = '', attatchedParams = ''] = url.split('?')
        const paramsArray = attatchedParams.split('&')

        if(params){
            Object.entries(params).forEach(([key, value]) => {
                paramsArray.push(`${key}=${value}`)
            })
        }

        return [path, paramsArray.join('&')].join('?')
    }

    private errorMiddleware<TData extends unknown>(res: TData | RawNetsuiteError){   
        if(res && typeof res === 'object' && 'error' in res ){
            throw new NetSuiteError(res)
        }

        return res
    }

    private responseMiddleware<TData extends unknown>(res: Response){
        return new Promise<TData>((resolve, reject) => {
            if(res.ok){
                res.json().then<TData>(res => {
                    resolve(res)
                    
                    return res
                })
            } else {
                const headerContentTypes = res.headers.get(headersMap["Content-Type"].name) ?? ''
                const contentTypeAppJson = headersMap["Content-Type"].values["application/json"]
                const contentTypeIsApplicationJson = headerContentTypes.includes(contentTypeAppJson)

                if(contentTypeIsApplicationJson){
                    res.json().then(reject)
                } else {
                    const error: RawNetsuiteError = {
                        error: {
                            code: 'unknow',
                            message: `[${res.status}] uknown reason. Contact Support`
                        }
                    }

                    reject(error)
                }
            }
        })
    }

    private async fetch<TData extends unknown>(url: string, options: RequestInit){
        return fetch(url, {
            ...options,
            headers: {
                ...this.headers,
                ...options.headers
            },
            
        })
        .then(res => this.responseMiddleware<TData>(res))
        .catch(this.errorMiddleware)
    }
    //#endregion
}