export interface IQueryItem {
    number: string;
    queryRes: string;
}

export interface IRequest {
    data: IResponseData;
    callId: string;
    needResult: boolean;
}

export enum ResponseActions {
    getMatching = 'getMatching',
    matchingRes = 'matchingRes',
    connect = 'connect'
}

export interface IResponseData {
    action: ResponseActions;
    payload: unknown;
}

export enum ServiceEvents {
    connection = 'connection',
    data = 'data',
    open = 'open',
}

export function getRandomNumber(): string {
    let num = '';
    while(num.length < 4) {
        const n = Math.floor(Math.random() * 10);
        if (!num.includes(`${n}`)) {
            num += n;
        }
    }

    return num;
}

export function matchNumbers(privateNumber: string, queryNumber: string): string {

    const matchCount = privateNumber.split('').map((val: string, index: number): boolean => {
        return queryNumber[index] === val;
    }).filter(Boolean).length;

    const includeCount = privateNumber.split('').map((val: string, index: number): boolean => {
        return queryNumber.includes(val);
    }).filter(Boolean).length;

    return `${includeCount}:${matchCount}`;
}

export function isClient(): boolean {
    return !isServer();
}
export function isServer(): boolean {
    return typeof window === 'undefined' || typeof navigator === 'undefined' || !navigator.platform;
}
