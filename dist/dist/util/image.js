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
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Image {
    constructor(width, height, filePath) {
        this._width = width;
        this._height = height;
        this._filePath = filePath;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get filePath() {
        return this._filePath;
    }
    set width(width) {
        this._width = width;
    }
    set height(height) {
        this._height = height;
    }
    set filePath(filePath) {
        this._filePath = filePath;
    }
    isImageExist(path) {
        if (fs_1.default.existsSync(path))
            return true;
        else
            return false;
    }
    resizeImage(width, height, outPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const imagePath = path_1.default.resolve(`./assets/thumb/${outPath}_${width}_${height}.jpg`);
            const originalImage = path_1.default.resolve(`./assets/full/${outPath}.jpg`);
            const widthNum = parseInt(width);
            const heightNum = parseInt(height);
            if (this.isImageExist(imagePath) || !this.isImageExist(originalImage))
                return;
            yield (0, sharp_1.default)(path_1.default.resolve(`./assets/full/${outPath}.jpg`))
                .resize({
                width: widthNum,
                height: heightNum,
                fit: 'fill',
            })
                .toFile(imagePath)
                .then(() => {
                while (!fs_1.default.existsSync(imagePath))
                    continue;
            });
        });
    }
}
exports.default = Image;
