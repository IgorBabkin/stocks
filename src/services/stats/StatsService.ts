import {Money} from "../../domain/Money";
import {IStatsService} from "./IStatsService";
import {ITrade} from "../../domain/ITrade";

export class PriceFluctuationCounter {
    count: number = 0;
    private state: 'initial' | 'up' | 'down' = 'initial';
    private prevPrice: Money = 0;

    add(price: Money): void {
        switch (this.state) {
            case "down":
                if (price > this.prevPrice) {
                    this.count++;
                }
                break;
            case "up":
                if (price < this.prevPrice) {
                    this.count++;
                }
                break;
            default:
                this.prevPrice = price;
                break;
        }
    }
}

class MaxDailyPriceFallCounter {
    max: number = 0;
    diff: number = 0;
    private state: 'initial' | 'up' | 'down' = 'initial';
    private min: Money = 0;

    add(timestamp: Date, price: Money) {

    }
}

export class StatsService implements IStatsService {
    constructor(private trades: ITrade[]) {
    }

    getMinPrice(): Money {
        const first = this.trades[0];
        return this.trades.reduce((acc, {price}) => Math.min(acc, price), first.price);
    }

    getMaxPrice(): Money {
        const first = this.trades[0];
        return this.trades.reduce((acc, {price}) => Math.max(acc, price), first.price);
    }

    get hasData(): Boolean {
        return this.trades.length > 0;
    }

    getFluctuationsCount(): Money {
        if (this.trades.length < 3) {
            return 0;
        }
        // const fluctuationCounter = new PriceFluctuationCounter();
        // this.trades.forEach((trade) => {
        //     fluctuationCounter.add(trade.price);
        // })
        return 0;
    }

    getMaxPriceFall(): Money {
        if (this.trades.length < 3) {
            return 0;
        }
        // const counter = new MaxDailyPriceFallCounter();
        // this.trades.forEach((trade) => {
        //     counter.add(trade.timestamp, trade.price);
        // })
        return 0;
    }

    getMaxPriceRise(): Money {
        if (this.trades.length < 3) {
            return 0;
        }
        return 0;
    }
}
