"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const image_1 = __importDefault(require("../../util/image"));
const resize = express_1.default.Router();
resize.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isValidData = /^\d+$/.test(req.query.width) &&
        /^\d+$/.test(req.query.height);
    if (!isValidData) {
        res.send('Invalid data entered');
        return;
    }
    const image = new image_1.default();
    const promise = image.resizeImage(req.query.width, req.query.height, req.query.name);
    promise.then(() => {
        const imagePath = path_1.default.resolve(`./assets/thumb/${req.query.name}_${req.query.width}_${req.query.height}.jpg`);
        if (fs_1.default.existsSync(imagePath))
            res.status(200).sendFile(path_1.default.resolve(imagePath));
        else
            res.send('Image was not found');
    });
}));
exports.default = resize;
