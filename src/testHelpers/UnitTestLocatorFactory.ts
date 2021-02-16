import {UnitTestServiceLocator, IUnitTestServiceLocator} from "unit-test-ts-ioc-container";
import {Mock} from "moq.ts";
import {IocServiceLocatorStrategyFactory, metadataCollector} from "ts-ioc-container";
import {MoqFactory} from "./moq/MoqFactory";

export type MoqUnitTestServiceLocator = IUnitTestServiceLocator<Mock<any>>;

export class UnitTestLocatorFactory {
    private strategyFactory = new IocServiceLocatorStrategyFactory(metadataCollector);
    private hooks = [];
    private mockFactory = new MoqFactory();

    create(): MoqUnitTestServiceLocator {
        return new UnitTestServiceLocator(this.strategyFactory, this.hooks, this.mockFactory);
    }
}
