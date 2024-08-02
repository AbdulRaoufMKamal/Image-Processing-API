"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const image_1 = __importDefault(require("../../util/image"));
it('creates an image with requested width and height in the thumb directory', () => {
    const image = new image_1.default(300, 400, 'icelandwaterfall');
    image.resizeImage('550', '550', 'icelandwaterfall');
    const newImagePath = path_1.default.resolve('./assets/thumb/icelandwaterfall_550_550.jpg');
    setTimeout(() => expect(fs_1.default.existsSync(newImagePath)).toBeTruthy(), 2000);
});
