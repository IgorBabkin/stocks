import {ITrade} from "../../domain/ITrade";
import {Money} from "../../domain/Money";
import {RangeType} from "../../core/RangeType";

export type IHistoryServiceFactory = (trades: ITrade[]) => IHistoryService;
export const IHistoryServiceKey = 'IHistoryService';
export interface IHistoryService {
    getMinPrice(range: RangeType<Date>): Money;
    getMaxPrice(range: RangeType<Date>): Money;
}

