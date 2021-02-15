import {Money} from "../../domain/Money";
import {IHistoryService} from "./IHistoryService";
import {ITrade} from "../../domain/ITrade";
import {RangeType} from "../../core/RangeType";

export class HistoryService implements IHistoryService {
    constructor(private trades: ITrade[]) {
    }

    getMinPrice(dateRange: RangeType<Date>): Money {
        const first = this.trades[0];
        return this.trades.reduce((acc, {price, timestamp}) => {
            return dateRange.hasValue(timestamp) ? Math.min(acc, price) : acc;
        }, first.price);
    }

    getMaxPrice(dateRange: RangeType<Date>): Money {
        const first = this.trades[0];
        return this.trades.reduce((acc, {price, timestamp}) => {
            return dateRange.hasValue(timestamp) ? Math.max(acc, price) : acc;
        }, first.price);
    }
}
