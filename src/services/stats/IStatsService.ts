import {Money} from "../../domain/Money";
import {ICandlestick} from "../../domain/ICandlestick";

export type IStatsServiceFactory = (candles: ICandlestick[]) => IStatsService;
export const IStatsServiceKey = 'IStatsService';

export interface IStatsService {
    hasData: Boolean;

    getMaxPriceFall(): Money;

    getMaxPriceRise(): Money;

    getFluctuationsCount(): number;

    getMaxPrice(): Money;

    getMinPrice(): Money;
}

