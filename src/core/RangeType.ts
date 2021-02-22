type Rangeable = Date | number;

export class RangeType<GType extends Rangeable> {
    constructor(public from: GType, public to: GType) {
    }

    hasValue(value: GType) {
        return this.from <= value && value <= this.to;
    }
}
