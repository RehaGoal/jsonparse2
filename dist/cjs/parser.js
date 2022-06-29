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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserMode = void 0;
const constants_1 = require("./utils/constants");
const { LEFT_BRACE, RIGHT_BRACE, LEFT_BRACKET, RIGHT_BRACKET, COLON, COMMA, TRUE, FALSE, NULL, STRING, NUMBER, } = constants_1.TokenType;
// Parser States
var ParserState;
(function (ParserState) {
    ParserState[ParserState["VALUE"] = 0] = "VALUE";
    ParserState[ParserState["KEY"] = 1] = "KEY";
    ParserState[ParserState["COLON"] = 2] = "COLON";
    ParserState[ParserState["COMMA"] = 3] = "COMMA";
    ParserState[ParserState["STOP"] = 4] = "STOP";
    ParserState[ParserState["ERROR"] = 5] = "ERROR";
})(ParserState || (ParserState = {}));
// Parser Modes
var ParserMode;
(function (ParserMode) {
    ParserMode[ParserMode["OBJECT"] = 0] = "OBJECT";
    ParserMode[ParserMode["ARRAY"] = 1] = "ARRAY";
})(ParserMode = exports.ParserMode || (exports.ParserMode = {}));
class AsyncParser {
    constructor() {
        this.state = ParserState.VALUE;
        this.mode = undefined;
        this.key = undefined;
        this.value = undefined;
        this.stack = [];
    }
    push() {
        this.stack.push({ key: this.key, value: this.value, mode: this.mode });
    }
    pop() {
        return __awaiter(this, void 0, void 0, function* () {
            const value = this.value;
            ({ key: this.key, value: this.value, mode: this.mode } = this.stack
                .pop());
            yield this.onValue(value, this.key, this.value, this.stack);
            this.state = this.mode !== undefined
                ? ParserState.COMMA
                : ParserState.VALUE;
        });
    }
    write(token, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state === ParserState.VALUE) {
                if (token === STRING || token === NUMBER || token === TRUE ||
                    token === FALSE || token === NULL) {
                    if (this.mode === ParserMode.OBJECT) {
                        this.value[this.key] = value;
                        this.state = ParserState.COMMA;
                    }
                    else if (this.mode === ParserMode.ARRAY) {
                        this.value.push(value);
                        this.state = ParserState.COMMA;
                    }
                    yield this.onValue(value, this.key, this.value, this.stack);
                    return;
                }
                if (token === LEFT_BRACE) {
                    this.push();
                    if (this.mode === ParserMode.OBJECT) {
                        this.value = this.value[this.key] = {};
                    }
                    else if (this.mode === ParserMode.ARRAY) {
                        const val = {};
                        this.value.push(val);
                        this.value = val;
                    }
                    else {
                        this.value = {};
                    }
                    this.mode = ParserMode.OBJECT;
                    this.state = ParserState.KEY;
                    this.key = undefined;
                    return;
                }
                if (token === LEFT_BRACKET) {
                    this.push();
                    if (this.mode === ParserMode.OBJECT) {
                        this.value = this.value[this.key] = [];
                    }
                    else if (this.mode === ParserMode.ARRAY) {
                        const val = [];
                        this.value.push(val);
                        this.value = val;
                    }
                    else {
                        this.value = [];
                    }
                    this.mode = ParserMode.ARRAY;
                    this.state = ParserState.VALUE;
                    this.key = 0;
                    return;
                }
                if (this.mode === ParserMode.ARRAY && token === RIGHT_BRACKET &&
                    this.value.length === 0) {
                    yield this.pop();
                    return;
                }
            }
            if (this.state === ParserState.KEY) {
                if (token === STRING) {
                    this.key = value;
                    this.state = ParserState.COLON;
                    return;
                }
                if (token === RIGHT_BRACE && Object.keys(this.value).length === 0) {
                    yield this.pop();
                    return;
                }
            }
            if (this.state === ParserState.COLON) {
                if (token === COLON) {
                    this.state = ParserState.VALUE;
                    return;
                }
            }
            if (this.state === ParserState.COMMA) {
                if (token === COMMA) {
                    if (this.mode === ParserMode.ARRAY) {
                        this.state = ParserState.VALUE;
                        this.key += 1;
                        return;
                    }
                    if (this.mode === ParserMode.OBJECT) {
                        this.state = ParserState.KEY;
                        return;
                    }
                }
                if (token === RIGHT_BRACE && this.mode === ParserMode.OBJECT ||
                    token === RIGHT_BRACKET && this.mode === ParserMode.ARRAY) {
                    yield this.pop();
                    return;
                }
            }
            throw new Error("Unexpected " + constants_1.TokenType[token] + (("(" + JSON.stringify(value) + ")")) +
                " in state " + ParserState[this.state]);
        });
    }
    onValue(value, key, parent, stack) {
        return __awaiter(this, void 0, void 0, function* () {
            // Override me
        });
    }
}
exports.default = AsyncParser;
