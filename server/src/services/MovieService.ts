import { MovieModel } from "../db";
import { IMovie } from "../db/MovieSchema";
import { ISearchResult } from "../entities/CommonTypes";
import { Movie } from "../entities/Movie";
import { SearchCondition } from "../entities/SearchCondition";

export class MovieService {
    /**
     * 添加电影数据
     * @param movie
     * @returns
     */
    public static async addMovie(movie: Movie): Promise<IMovie | string[]> {
        // 1. 转换类型
        movie = Movie.transform(movie);
        // 2. 数据验证
        const errors = await movie.validateThis();
        if(errors.length > 0) { // 验证错误, 直接返回
            return errors;
        }
        // 3. 添加数据到数据库
        return await MovieModel.create(movie)
    }
    /**
     * 修改电影数据
     * @param id
     * @param movie
     */
    public static async edit(id: string, movie: Movie): Promise<string[]> {
        // 1. 转换类型
        const movieObj = Movie.transform(movie);
        // 2. 数据验证
        const errors = await movieObj.validateThis(true);
        if(errors.length > 0) { // 验证错误, 直接返回
            return errors;
        }
        // 3. 修改数据库
        const r = await MovieModel.findByIdAndUpdate(id, {$set: movie}, {new: true})
        console.log(r)
        return errors;
    }

    /**
     * 根据id删除数据
     * @param id
     */
    public static async delete(id: string): Promise<void> {
        await MovieModel.deleteOne({_id: id})
    }
    /**
     * 根据id查找数据
     * @param id
     * @returns
     */
    public static async findById(id: string): Promise<IMovie|null> {
        return await MovieModel.findById(id);
    }
    /**
     * 根据条件查询
     * @param condition {page, limit, key}
     */
    public static async find(condition: SearchCondition): Promise<ISearchResult<IMovie>> {
        // 1. 转换类型
        const conditionObj = SearchCondition.transform(condition);
        // 2. 数据验证
        const errors = await conditionObj.validateThis(true);
        if(errors.length > 0) { // 验证错误, 直接返回
            return {
                data: [],
                count: 0,
                errors
            };
        }
        // 3. 查询数据
        const movies = await MovieModel.find({
            name: {$regex: new RegExp(conditionObj.key)}
        }).skip((conditionObj.page - 1) * conditionObj.limit).limit(conditionObj.limit)
        const count = await MovieModel.find({
            name: {$regex: new RegExp(conditionObj.key)}
        }).countDocuments();
        return {data: movies, count, errors};
    }
}