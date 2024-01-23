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
const GPTDocx_1 = __importDefault(require("./lib/GPTDocx"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const filename = yield new GPTDocx_1.default({
            service: "coverLetter",
            prompt: "Write a cover letter for Matthew Eddy who is an excellent software engineer. His skills are Fullstack JavaScript development, Python, and AWS Webservices. Make the canindate seem polite, professional, but an expert in his field.", // required
        }).createFile();
        console.log('Filename: ', filename);
        return filename;
    });
}
main();
