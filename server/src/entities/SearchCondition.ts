import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";
import { BaseEntity } from "./BaseEntity";

export class SearchCondition extends BaseEntity{
    /**
     * 页码，默认从1开始
     */
    @Min(1, {message: "页码必须大于1"})
    @IsInt({message: "页码必须是一个整数"})
    @Type(() => Number)
    public page: number = 1;
    /**
     * 页容量，默认为10
     */
    @IsInt({message: "页容量必须是一个整数"})
    @Min(1, {message: "页容量必须大于1"})
    @Type(() => Number)
    public limit: number = 10;
    /**
     * 查询关键字，默认为空
     */
     @Type(() => String)
    public key: string = "";

    /**
     * 将平面对象转换为SearchCondition对象
     * @param plainObject
     */
    public static transform(plainObject: object): SearchCondition {
        return super.baseTransform(SearchCondition, plainObject);
    }
}