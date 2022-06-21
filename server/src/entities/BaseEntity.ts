import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

export abstract class BaseEntity {
    public async validateThis(skipMissing = false): Promise<string[]> {
        const errors = await validate(this, {
            skipMissingProperties: skipMissing
        });
        const res: string[] = [];
        errors.forEach(e => {
            const constraints = e.constraints;
            for (const prop in constraints) {
                if (Object.prototype.hasOwnProperty.call(constraints, prop)) {
                    res.push(constraints[prop]);
                }
            }
        })
        return res;
    }

    /**
     * 将平面对象转换为Movie对象
     * @param plainObject
     */
    protected static baseTransform<T>(cls: ClassConstructor<T>,plainObject: object): T {
        if(plainObject instanceof cls) {
            return plainObject;
        }
        return plainToClass(cls, plainObject)
    }
}