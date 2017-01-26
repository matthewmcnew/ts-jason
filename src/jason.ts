export class ModelItem {
    constructor(private provider: string,
                private modelId: number) {
    }

    static fromJSON({provider, modelId}: any) {
        return new ModelItem(provider, modelId);
    }
}

export class Model {
    constructor(private modelItem: ModelItem) {
    }

    static fromJSON({modelItem}: any) {
        return new Model(modelItem);
    }
}

export class Wheels {
    constructor(public numberOfWheels: number) {
    }

    static fromJSON({numberOfWheels}: any) {
        return new Wheels(numberOfWheels);
    }
}

export class Car {

    constructor(private currentValue: number | null,
                private model: Model | null,
                private originalPurchasePrice: number | null,
                private wheels: Wheels,
                private type: string,
    ) {
    }

    static fromJSON({currentValue, model, originalPurchasePrice, wheels, type}: any) {
        return new Car(currentValue, model, originalPurchasePrice, wheels, type);
    }
}

interface FromJSON {
    fromJSON(payload: any): any
}

class Mapper {
    private types: Record<string, FromJSON>;

    constructor() {
        this.types = {};
    }

    public add(type: string, fromJSON: FromJSON) {
        this.types[type] = fromJSON;
        return this;
    }

    public map<T>(payload: any, ExpectedType: any): any {
        const objectKeys = Object.keys(payload)
            .filter((key) => payload[key].constructor.name === 'Object')
            .filter((key) => this.includesMappingFor(key))
            .map((key) => {
                return {[key]: this.map(payload[key], this.types[key])}
            })
            .reduce((a, b) => Object.assign(a, b), {});

        return ExpectedType.fromJSON({...payload, ...objectKeys});
    }

    private includesMappingFor(key: string) {
        return !!this.types[key];
    }
}

export const mapper = new Mapper()
    .add('car', Car)
    .add('wheels', Wheels)
    .add('model', Model)
    .add('modelItem', ModelItem);
