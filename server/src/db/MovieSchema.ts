import Mongoose from "mongoose";
import { Movie } from "../entities/Movie";

// Movie里缺少数据库中必须的id等字段，依靠内置的Document扩展
export interface IMovie extends Movie, Mongoose.Document{}

const movieSchema = new Mongoose.Schema<IMovie>({
    name: String,
    types: [String],
    area: [String],
    timeLong: Number,
    isHot: Boolean,
    isComing: Boolean,
    isClassic: Boolean,
    description: String,
    poster: String
}, {
    versionKey: false
})

export default Mongoose.model<Movie>("Movie", movieSchema);
