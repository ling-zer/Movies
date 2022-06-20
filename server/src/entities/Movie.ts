import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, Max, Min } from "class-validator"

export class Movie {
    @IsNotEmpty({message: "电影名称不可以为空"})
    @Type(() => String)
    public name: string;

    // @IsNotEmpty({message: "电影类型不能为空"})
    @ArrayMinSize(1, {message: "电影类型不能为空"})
    @IsArray({message: "电影类型必须是一个数组"})
    @Type(() => String)
    public types: string[];

    @ArrayMinSize(1, {message: "上映地区不能为空"})
    @IsArray({message: "上映地区必须是一个数组"})
    @Type(() => String)
    public area: string[];

    @IsNotEmpty({message: "时长不可以为空"})
    @Min(1, {message: "时长最小一分钟"})
    @Max(9999, {message: "时长过长"})
    @Type(() => Number)
    public timeLong: number;

    @IsNotEmpty({message: "是否热映不可以为空"})
    @Type(() => Boolean)
    public isHot: boolean = false;

    @IsNotEmpty({message: "是否即将上映不可以为空"})
    @Type(() => Boolean)
    public isComing: boolean = false;

    @IsNotEmpty({message: "是否是经典影片不可以为空"})
    @Type(() => Boolean)
    public isClassic: boolean = false;

    // 电影描述
    @Type(() => String)
    public description?: string;

    // 电影海报
    @Type(() => String)
    public poster?: string;
}