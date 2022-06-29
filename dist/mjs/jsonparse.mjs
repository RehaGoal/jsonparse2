var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AsyncTokenizer from "./tokenizer";
import AsyncParser from "./parser";
export default class AsyncJSONParser {
    constructor(opts = {}) {
        this.tokenizer = new AsyncTokenizer(opts);
        this.parser = new AsyncParser();
        this.tokenizer.onToken = this.parser.write.bind(this.parser);
    }
    write(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tokenizer.write(input);
        });
    }
    set onToken(cb) {
        this.tokenizer.onToken = cb;
    }
    set onValue(cb) {
        this.parser.onValue = cb;
    }
}
