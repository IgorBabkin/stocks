import {IUnitTestServiceLocator, UnitTestServiceLocatorFactory} from "unit-test-ts-ioc-container";
import {Mock} from "moq.ts";
import {MoqFactory} from "./moq/MoqFactory";

export type MoqUnitTestServiceLocator = IUnitTestServiceLocator<Mock<any>>;

export class UnitTestLocatorFactory {
    private factory = new UnitTestServiceLocatorFactory(new MoqFactory())

    create(): MoqUnitTestServiceLocator {
        return this.factory.createIoCLocator();
    }
}
