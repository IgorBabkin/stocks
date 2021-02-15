type Rangeable = Date | number;

export class RangeType<GType extends Rangeable> {
    constructor(private min: GType, private max: GType) {
    }

    hasValue(value: GType) {
        return this.min <= value && value <= this.max;
    }
}
