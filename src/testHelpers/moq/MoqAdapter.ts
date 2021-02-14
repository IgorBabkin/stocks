import { Mock } from 'moq.ts';
import {MockAdapter} from "unit-test-ts-ioc-container";

export class MoqAdapter<GInstance> extends MockAdapter<Mock<GInstance>, GInstance> {
    public getInstance(): GInstance {
        return this.decorated.object();
    }
}
