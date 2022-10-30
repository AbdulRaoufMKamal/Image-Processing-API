"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const supertest_1 = __importDefault(require("supertest"));
const fs_1 = __importDefault(require("fs"));
const __1 = __importDefault(require(".."));
const request = (0, supertest_1.default)(__1.default);
describe('Test endpoint responses', () => {
    it('gets the api endpoint status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?width=300&height=300&name=fjord');
        expect(response.status).toBe(200);
    })),
        it('creates an image with the width and height requested', () => __awaiter(void 0, void 0, void 0, function* () {
            const [fileName, width, height] = ['fjord', 450, 300];
            yield request.get(`/api/images?width=${width}&height=${height}&name=${fileName}`);
            expect(fs_1.default.existsSync(path_1.default.resolve(`./assets/thumb/${fileName}_${width}_${height}.jpg`))).toBeTruthy();
        }));
});
