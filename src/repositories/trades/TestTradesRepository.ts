import {ITrade} from "../../domain/ITrade";
import {ITradesRepository} from "./ITradesRepository";
import {UserId} from "../../domain/IUser";
import {RangeType} from "../../core/RangeType";
import {SymbolId} from "../../domain/ISymbol";

export class TestTradesRepository implements ITradesRepository {
    fetchAll(): Promise<ITrade[]> {
        return Promise.resolve([{
            id: '21',
            price: 1234,
            shares: 20,
            symbol: 'USD',
            timestamp: new Date(),
            type: 'buy',
            user: {
                id: '2',
                name: 'Daniel',
            }
        }]);
    }

    create(query: ITrade): Promise<ITrade> {
        return Promise.resolve({
            id: '21',
            price: 1234,
            shares: 20,
            symbol: 'USD',
            timestamp: new Date(),
            type: 'buy',
            user: {
                id: '2',
                name: 'Daniel',
            }
        });
    }

    deleteAll(): Promise<void> {
        return Promise.resolve(undefined);
    }

    fetchByUser(id: UserId): Promise<ITrade[]> {
        return Promise.resolve([{
            id: '21',
            price: 1234,
            shares: 20,
            symbol: 'USD',
            timestamp: new Date(),
            type: 'buy',
            user: {
                id: '2',
                name: 'Daniel',
            }
        }]);
    }

    fetchBySymbol(id: SymbolId, dateRange?: RangeType<Date>): Promise<ITrade[]> {
        return Promise.resolve([]);
    }
}

/*
SELECT
	start_table.start_price,
	end_table.end_price,
	start_table.created_date
FROM (
	SELECT DISTINCT ON (created_date)
		created_date,
		price as start_price
	FROM (
		SELECT price, id, date(created_at) as created_date
		FROM trades
		ORDER BY created_at ASC
	) AS t1
) as start_table
INNER JOIN
(
	SELECT DISTINCT ON (created_date)
		created_date,
		price as end_price
	FROM (
		SELECT price, id, date(created_at) as created_date
		FROM trades
		ORDER BY created_at DESC
	) AS t1
) as end_table
ON start_table.created_date = end_table.created_date
 */
