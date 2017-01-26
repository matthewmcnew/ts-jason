import {mapper, Car, Model, ModelItem, Wheels} from "../src/jason";
import {expect} from "chai";


describe('Jason.ts', () => {

    it('generates javascript classes', () => {

        const car = mapper.map({
                model: {modelItem: {provider: 'belushi', modelId: 12}},
                currentValue: 10,
                originalPurchasePrice: 22,
                type: 'ford',
                wheels: {numberOfWheels: 10}
            },
            Car);



        expect(car).to.deep.eq(new Car(10, new Model(new ModelItem('belushi', 12)), 22, new Wheels(10), 'ford'))
        expect(car.model.constructor.name).to.equals('Model')

    });
});
