import { faker } from "@faker-js/faker";

module.exports = {
    newProductTestData: function () {
        let Product = {
            quantity: faker.number.int({ min: 1, max: 10000 })

            // name: faker.company.buzzNoun(),
            // longName: faker.commerce.productName(),
            // newName: faker.company.buzzNoun(),
            // description: faker.lorem.sentences(3),
            // newDescription: faker.lorem.sentences(2),
            // folderName: faker.company.buzzNoun(),
            // longDescription: faker.lorem.sentences(50),
            // userName: faker.person.lastName(),
            // tokenName: faker.person.lastName()
        };
        return Product;
    },
};