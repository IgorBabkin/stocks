import {ITrade} from "../../domain/ITrade";
import {Money} from "../../domain/Money";

export type IStatsServiceFactory = (trades: ITrade[]) => IStatsService;
export const IStatsServiceKey = 'IStatsService';

export interface IStatsService {
    hasData: Boolean;

    getMinPrice(): Money;

    getMaxPrice(): Money;

    getMaxPriceFall(): Money;

    getMaxPriceRise(): Money;

    getFluctuationsCount(): number;
}

