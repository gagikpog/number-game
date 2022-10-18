export interface IQueryItem {
    number: string;
    queryRes: string;
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

    return `${matchCount}:${includeCount}`;
}
