import {Money} from "../../domain/Money";
import {IStatsService} from "./IStatsService";
import {ICandlestick} from "../../domain/ICandlestick";

export class StatsService implements IStatsService {
    constructor(private candles: ICandlestick[]) {
    }

    getMinPrice(): Money {
        const first = this.candles[0];
        return this.candles.reduce((acc, {price}) => Math.min(acc, price), first.price);
    }

    getMaxPrice(): Money {
        const first = this.candles[0];
        return this.candles.reduce((acc, {price}) => Math.max(acc, price), first.price);
    }

    get hasData(): Boolean {
        return this.candles.length > 0;
    }

    getFluctuationsCount(): number {
        if (this.candles.length < 3) {
            return 0;
        }
        return this.candles.reduce((acc, current, index) => {
            if (index < this.candles.length - 1) {
                const next = this.candles[index + 1];
                if (next.type !== current.type) {
                    return acc + 1;
                }
            }
            return acc;
        }, 0);
    }

    getMaxPriceFall(): Money {
        return this.candles.reduce((acc, {closePrice, openPrice}) => {
            return Math.max(closePrice - openPrice, acc);
        }, 0);
    }

    getMaxPriceRise(): Money {
        return this.candles.reduce((acc, {closePrice, openPrice}) => {
            return Math.max(openPrice - closePrice, acc);
        }, 0);
    }
}
