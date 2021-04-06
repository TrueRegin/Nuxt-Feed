import { ObjectID } from 'bson';
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions
} from 'class-validator';

export function IsObjectID(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isObjectID',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return ObjectID.isValid(value);
                },
            },
        });
    };
}
