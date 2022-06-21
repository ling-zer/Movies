import { Response } from "express";
import { ISearchResult } from "../entities/CommonTypes";

/***
 * 统一响应的格式
 */
export class ResponseHelper {
    /**
     * 响应一个错误
     * @param err 错误消息
     * @param res
     */
    public static sendError(err: string | string[], res: Response) {
        let error: string;
        if(Array.isArray(err)) {
            error = err.join(";")
        } else {
            error = err;
        }
        // 完成响应
        res.send({
            err: error,
            data: null
        })
    }
    /**
     * 响应数据
     */
    public static sendData(data: any, res: Response) {
        res.send({
            err: null,
            data
        })
    }
    /**
     * 响应分页数据
     * @param result
     * @param res
     */
    public static sendPageData<T>(result: ISearchResult<T>, res: Response) {
        if(result.errors.length > 0) {
            this.sendError(result.errors, res);
        } else {
            res.send({
                err: null,
                data: result.data,
                total: result.count
            })
        }
    }
}