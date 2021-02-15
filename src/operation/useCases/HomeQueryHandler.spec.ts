import 'reflect-metadata';
import {HomeQueryHandler} from "./HomeQueryHandler";
import {ISomeService, ISomeServiceKey} from "../../services/someService/ISomeService";
import {Mock} from "moq.ts";
import {MoqUnitTestServiceLocator, UnitTestLocatorFactory} from "../../testHelpers/UnitTestLocatorFactory";

describe("HomeQueryHandler", () => {
    const unitTestLocatorFactory = new UnitTestLocatorFactory();
    let testLocator: MoqUnitTestServiceLocator;
    let someServiceMock: Mock<ISomeService>;

    beforeEach(() => {
        testLocator = unitTestLocatorFactory.create();
        someServiceMock = testLocator.resolveMock(ISomeServiceKey);
    })

    it("returns greeting", async () => {
        someServiceMock.setup(i => i.findSmth()).returns(Promise.resolve(15));

        const queryHandler = testLocator.resolve(HomeQueryHandler);
        const response = await queryHandler.handle({});

        expect(response.greeting).toBe("Hello 15");
    });
});
