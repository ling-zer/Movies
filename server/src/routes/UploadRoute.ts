import Express from "express"
import multer from "multer"
import path from "path";
import { ResponseHelper } from "./ResponseHelper";

const router = Express.Router();

// 文件保存的配置
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../../public/upload'),
    filename(req, file, cb) {
        // 1. 文件名是什么
        const uniqueSuffix = new Date().getTime();
        // 2. 后缀名是什么
        const originalName = file.originalname; // 客户端上传时的文件名
        const extname = path.extname(originalName);
      cb(null, file.fieldname + '-' + uniqueSuffix + extname);
    }
})

const allowedExtensions = [".jpg", ".png", ".jpeg", ".gof", ".bmp", ".jiff"]
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 // 文件最多1M
    },
    fileFilter(req, file, cb) { // 限制上传文件的后缀名
        const ext = path.extname(file.originalname);
        if(allowedExtensions.includes(ext)) {
            cb(null, true)
        } else {
            cb(new Error("文件类型不正确"))
        }
    }
}).single("imgfile");

// const upload = multer({ dest: path.resolve(__dirname, '../../public/upload') });

router.post("/", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
          // A Multer error occurred when uploading.
          ResponseHelper.sendError(err.message, res);
        } else {
           // Everything went fine.
           const url = `/upload/${req.file?.filename}`
           ResponseHelper.sendData(url, res)
        }
      })
})

export default router;