export type Money = number;

export function fromDecimal(value: number, precision: number) {
    return value * Math.pow(10, precision);
}

export function toDecimal(value: number, precision: number) {
    return Math.round(value / Math.pow(10, precision));
}
