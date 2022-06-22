import Express from "express"
import { MovieService } from "../services/MovieService";
import { ResponseHelper } from "./ResponseHelper";

const router = Express.Router();

// localhost:3000/api/movie/100001xxx params
// localhost:3000/api/movie?id=100001XXX query
router.get("/:id", async (req, res) => {
    try {
        const movieId = req.params.id;
        // 根据id 获取电影
        const movie = await MovieService.findById(movieId);
        // 响应：服务器的响应格式，往往是一种标准格式
        ResponseHelper.sendData(movie, res);
    }catch {
        ResponseHelper.sendData(null, res);
    }
})

router.get("/", async (req, res) => {
    try {
        const result = await MovieService.find(req.query as any);
        ResponseHelper.sendPageData(result, res);
    }catch {
        ResponseHelper.sendData(null, res);
    }
})

router.post("/", async(req, res) => {
    try {
        const result = await MovieService.addMovie(req.body);
        if(Array.isArray(result)) {
            ResponseHelper.sendError(result, res);
        } else {
            ResponseHelper.sendData(result, res);
        }
    }catch {
        ResponseHelper.sendData(null, res);
    }
})

router.put("/:id", async (req, res) => {
    try {
        const movieId = req.params.id;
        const result = await MovieService.edit(movieId, req.body);
        if(result.length > 0) {
            ResponseHelper.sendError(result, res);
        } else {
            ResponseHelper.sendData(true, res);
        }
    }catch {
        ResponseHelper.sendError("id错误", res);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const movieId = req.params.id;
        await MovieService.delete(movieId);
        ResponseHelper.sendData(true, res);
    }catch {
        ResponseHelper.sendError("id错误", res);
    }
})

export default router;