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
const utf_8_1 = require("./utils/utf-8");
const bufferedString_1 = require("./utils/bufferedString");
const constants_1 = require("./utils/constants");
const { LEFT_BRACE, RIGHT_BRACE, LEFT_BRACKET, RIGHT_BRACKET, COLON, COMMA, TRUE, FALSE, NULL, STRING, NUMBER, } = constants_1.TokenType;
// Tokenizer States
var TokenizerStates;
(function (TokenizerStates) {
    TokenizerStates[TokenizerStates["START"] = 0] = "START";
    TokenizerStates[TokenizerStates["STOP"] = 1] = "STOP";
    TokenizerStates[TokenizerStates["ERROR"] = 2] = "ERROR";
    TokenizerStates[TokenizerStates["TRUE1"] = 3] = "TRUE1";
    TokenizerStates[TokenizerStates["TRUE2"] = 4] = "TRUE2";
    TokenizerStates[TokenizerStates["TRUE3"] = 5] = "TRUE3";
    TokenizerStates[TokenizerStates["FALSE1"] = 6] = "FALSE1";
    TokenizerStates[TokenizerStates["FALSE2"] = 7] = "FALSE2";
    TokenizerStates[TokenizerStates["FALSE3"] = 8] = "FALSE3";
    TokenizerStates[TokenizerStates["FALSE4"] = 9] = "FALSE4";
    TokenizerStates[TokenizerStates["NULL1"] = 10] = "NULL1";
    TokenizerStates[TokenizerStates["NULL2"] = 11] = "NULL2";
    TokenizerStates[TokenizerStates["NULL3"] = 12] = "NULL3";
    TokenizerStates[TokenizerStates["STRING_DEFAULT"] = 13] = "STRING_DEFAULT";
    TokenizerStates[TokenizerStates["STRING_AFTER_BACKSLASH"] = 14] = "STRING_AFTER_BACKSLASH";
    TokenizerStates[TokenizerStates["STRING_UNICODE_DIGIT_1"] = 15] = "STRING_UNICODE_DIGIT_1";
    TokenizerStates[TokenizerStates["STRING_UNICODE_DIGIT_2"] = 16] = "STRING_UNICODE_DIGIT_2";
    TokenizerStates[TokenizerStates["STRING_UNICODE_DIGIT_3"] = 17] = "STRING_UNICODE_DIGIT_3";
    TokenizerStates[TokenizerStates["STRING_UNICODE_DIGIT_4"] = 18] = "STRING_UNICODE_DIGIT_4";
    TokenizerStates[TokenizerStates["STRING_INCOMPLETE_CHAR"] = 19] = "STRING_INCOMPLETE_CHAR";
    TokenizerStates[TokenizerStates["NUMBER_AFTER_INITIAL_MINUS"] = 20] = "NUMBER_AFTER_INITIAL_MINUS";
    TokenizerStates[TokenizerStates["NUMBER_AFTER_INITIAL_ZERO"] = 21] = "NUMBER_AFTER_INITIAL_ZERO";
    TokenizerStates[TokenizerStates["NUMBER_AFTER_INITIAL_NON_ZERO"] = 22] = "NUMBER_AFTER_INITIAL_NON_ZERO";
    TokenizerStates[TokenizerStates["NUMBER_AFTER_FULL_STOP"] = 23] = "NUMBER_AFTER_FULL_STOP";
    TokenizerStates[TokenizerStates["NUMBER_AFTER_DECIMAL"] = 24] = "NUMBER_AFTER_DECIMAL";
    TokenizerStates[TokenizerStates["NUMBER_AFTER_E"] = 25] = "NUMBER_AFTER_E";
    TokenizerStates[TokenizerStates["NUMBER_AFTER_E_AND_SIGN"] = 26] = "NUMBER_AFTER_E_AND_SIGN";
    TokenizerStates[TokenizerStates["NUMBER_AFTER_E_AND_DIGIT"] = 27] = "NUMBER_AFTER_E_AND_DIGIT";
})(TokenizerStates || (TokenizerStates = {}));
const defaultOpts = {
    stringBufferSize: 0,
    numberBufferSize: 0,
};
class AsyncTokenizer {
    constructor(opts) {
        this.state = TokenizerStates.START;
        this.unicode = undefined; // unicode escapes
        this.highSurrogate = undefined;
        this.bytesRemaining = 0; // number of bytes remaining in multi byte utf8 char to read after split boundary
        this.bytesInSequence = 0; // bytes in multi byte utf8 char to read
        this.charSplitBuffer = new Uint8Array(4); // for rebuilding chars split before boundary is reached
        this.encoder = new TextEncoder();
        this.offset = -1;
        opts = Object.assign(Object.assign({}, defaultOpts), opts);
        this.bufferedString = opts.stringBufferSize && opts.stringBufferSize > 4
            ? new bufferedString_1.BufferedString(opts.stringBufferSize)
            : new bufferedString_1.NonBufferedString();
        this.bufferedNumber = opts.numberBufferSize && opts.numberBufferSize > 0
            ? new bufferedString_1.BufferedString(opts.numberBufferSize)
            : new bufferedString_1.NonBufferedString();
    }
    write(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let buffer;
            if (input instanceof Uint8Array) {
                buffer = input;
            }
            else if (typeof input === 'string') {
                buffer = this.encoder.encode(input);
            }
            else if (input.buffer || Array.isArray(input)) {
                buffer = Uint8Array.from(input);
            }
            else {
                throw new TypeError('Unexpected type. The `write` function only accepts TypeArrays and Strings.');
            }
            for (let i = 0; i < buffer.length; i += 1) {
                const n = buffer[i]; // get current byte from buffer
                switch (this.state) {
                    case TokenizerStates.START:
                        this.offset += 1;
                        if (n === utf_8_1.charset.SPACE ||
                            n === utf_8_1.charset.NEWLINE ||
                            n === utf_8_1.charset.CARRIAGE_RETURN ||
                            n === utf_8_1.charset.TAB) {
                            // whitespace
                            continue;
                        }
                        if (n === utf_8_1.charset.LEFT_CURLY_BRACKET) {
                            yield this.onToken(LEFT_BRACE, '{', this.offset);
                            continue;
                        }
                        if (n === utf_8_1.charset.RIGHT_CURLY_BRACKET) {
                            yield this.onToken(RIGHT_BRACE, '}', this.offset);
                            continue;
                        }
                        if (n === utf_8_1.charset.LEFT_SQUARE_BRACKET) {
                            yield this.onToken(LEFT_BRACKET, '[', this.offset);
                            continue;
                        }
                        if (n === utf_8_1.charset.RIGHT_SQUARE_BRACKET) {
                            yield this.onToken(RIGHT_BRACKET, ']', this.offset);
                            continue;
                        }
                        if (n === utf_8_1.charset.COLON) {
                            yield this.onToken(COLON, ':', this.offset);
                            continue;
                        }
                        if (n === utf_8_1.charset.COMMA) {
                            yield this.onToken(COMMA, ',', this.offset);
                            continue;
                        }
                        if (n === utf_8_1.charset.LATIN_SMALL_LETTER_T) {
                            this.state = TokenizerStates.TRUE1;
                            continue;
                        }
                        if (n === utf_8_1.charset.LATIN_SMALL_LETTER_F) {
                            this.state = TokenizerStates.FALSE1;
                            continue;
                        }
                        if (n === utf_8_1.charset.LATIN_SMALL_LETTER_N) {
                            this.state = TokenizerStates.NULL1;
                            continue;
                        }
                        if (n === utf_8_1.charset.QUOTATION_MARK) {
                            this.bufferedString.reset();
                            this.state = TokenizerStates.STRING_DEFAULT;
                            continue;
                        }
                        if (n >= utf_8_1.charset.DIGIT_ONE && n <= utf_8_1.charset.DIGIT_NINE) {
                            this.bufferedNumber.reset();
                            this.bufferedNumber.appendChar(n);
                            this.state = TokenizerStates.NUMBER_AFTER_INITIAL_NON_ZERO;
                            continue;
                        }
                        if (n === utf_8_1.charset.DIGIT_ZERO) {
                            this.bufferedNumber.reset();
                            this.bufferedNumber.appendChar(n);
                            this.state = TokenizerStates.NUMBER_AFTER_INITIAL_ZERO;
                            continue;
                        }
                        if (n === utf_8_1.charset.HYPHEN_MINUS) {
                            this.bufferedNumber.reset();
                            this.bufferedNumber.appendChar(n);
                            this.state = TokenizerStates.NUMBER_AFTER_INITIAL_MINUS;
                            continue;
                        }
                        break;
                    // STRING
                    case TokenizerStates.STRING_DEFAULT:
                        if (n === utf_8_1.charset.QUOTATION_MARK) {
                            const str = this.bufferedString.toString();
                            yield this.onToken(STRING, str, this.offset);
                            this.offset += this.bufferedString.byteLength + 1;
                            this.state = TokenizerStates.START;
                            continue;
                        }
                        if (n === utf_8_1.charset.REVERSE_SOLIDUS) {
                            this.state = TokenizerStates.STRING_AFTER_BACKSLASH;
                            continue;
                        }
                        if (n >= 128) { // Parse multi byte (>=128) chars one at a time
                            if (n >= 194 && n <= 223) {
                                this.bytesInSequence = 2;
                            }
                            else if (n <= 239) {
                                this.bytesInSequence = 3;
                            }
                            else {
                                this.bytesInSequence = 4;
                            }
                            if (this.bytesInSequence <= buffer.length - i) {
                                // if bytes needed to complete char fall outside buffer length, we have a boundary split
                                this.bufferedString.appendBuf(buffer, i, i + this.bytesInSequence);
                                i += this.bytesInSequence - 1;
                                continue;
                            }
                            this.bytesRemaining = i + this.bytesInSequence - buffer.length;
                            this.charSplitBuffer.set(buffer.subarray(i));
                            i = buffer.length - 1;
                            this.state = TokenizerStates.STRING_INCOMPLETE_CHAR;
                            continue;
                        }
                        if (n >= utf_8_1.charset.SPACE) {
                            this.bufferedString.appendChar(n);
                            continue;
                        }
                        break;
                    case TokenizerStates.STRING_INCOMPLETE_CHAR:
                        // check for carry over of a multi byte char split between data chunks
                        // & fill temp buffer it with start of this data chunk up to the boundary limit set in the last iteration
                        this.charSplitBuffer.set(buffer.subarray(i, i + this.bytesRemaining), this.bytesInSequence - this.bytesRemaining);
                        this.bufferedString.appendBuf(this.charSplitBuffer, 0, this.bytesInSequence);
                        i = this.bytesRemaining - 1;
                        this.state = TokenizerStates.STRING_DEFAULT;
                        continue;
                    case TokenizerStates.STRING_AFTER_BACKSLASH:
                        const controlChar = utf_8_1.escapedSequences[n];
                        if (controlChar) {
                            this.bufferedString.appendChar(controlChar);
                            this.state = TokenizerStates.STRING_DEFAULT;
                            continue;
                        }
                        if (n === utf_8_1.charset.LATIN_SMALL_LETTER_U) {
                            this.unicode = '';
                            this.state = TokenizerStates.STRING_UNICODE_DIGIT_1;
                            continue;
                        }
                        break;
                    case TokenizerStates.STRING_UNICODE_DIGIT_1:
                    case TokenizerStates.STRING_UNICODE_DIGIT_2:
                    case TokenizerStates.STRING_UNICODE_DIGIT_3:
                        if ((n >= utf_8_1.charset.DIGIT_ZERO && n <= utf_8_1.charset.DIGIT_NINE) ||
                            (n >= utf_8_1.charset.LATIN_CAPITAL_LETTER_A &&
                                n <= utf_8_1.charset.LATIN_CAPITAL_LETTER_F) ||
                            (n >= utf_8_1.charset.LATIN_SMALL_LETTER_A &&
                                n <= utf_8_1.charset.LATIN_SMALL_LETTER_F)) {
                            this.unicode += String.fromCharCode(n);
                            this.state += 1;
                            continue;
                        }
                        break;
                    case TokenizerStates.STRING_UNICODE_DIGIT_4:
                        if ((n >= utf_8_1.charset.DIGIT_ZERO && n <= utf_8_1.charset.DIGIT_NINE) ||
                            (n >= utf_8_1.charset.LATIN_CAPITAL_LETTER_A &&
                                n <= utf_8_1.charset.LATIN_CAPITAL_LETTER_F) ||
                            (n >= utf_8_1.charset.LATIN_SMALL_LETTER_A &&
                                n <= utf_8_1.charset.LATIN_SMALL_LETTER_F)) {
                            const intVal = parseInt(this.unicode + String.fromCharCode(n), 16);
                            if (this.highSurrogate === undefined) {
                                if (intVal >= 0xD800 && intVal <= 0xDBFF) { // <55296,56319> - highSurrogate
                                    this.highSurrogate = intVal;
                                }
                                else {
                                    this.bufferedString.appendBuf(this.encoder.encode(String.fromCharCode(intVal)));
                                }
                            }
                            else {
                                if (intVal >= 0xDC00 && intVal <= 0xDFFF) { // <56320,57343> - lowSurrogate
                                    this.bufferedString.appendBuf(this.encoder.encode(String.fromCharCode(this.highSurrogate, intVal)));
                                }
                                else {
                                    this.bufferedString.appendBuf(this.encoder.encode(String.fromCharCode(this.highSurrogate)));
                                }
                                this.highSurrogate = undefined;
                            }
                            this.state = TokenizerStates.STRING_DEFAULT;
                            continue;
                        }
                    // Number
                    // tslint:disable-next-line:no-switch-case-fall-through
                    case TokenizerStates.NUMBER_AFTER_INITIAL_MINUS:
                        if (n === utf_8_1.charset.DIGIT_ZERO) {
                            this.bufferedNumber.appendChar(n);
                            this.state = TokenizerStates.NUMBER_AFTER_INITIAL_ZERO;
                            continue;
                        }
                        if (n >= utf_8_1.charset.DIGIT_ONE && n <= utf_8_1.charset.DIGIT_NINE) {
                            this.bufferedNumber.appendChar(n);
                            this.state = TokenizerStates.NUMBER_AFTER_INITIAL_NON_ZERO;
                            continue;
                        }
                        break;
                    case TokenizerStates.NUMBER_AFTER_INITIAL_ZERO:
                        if (n === utf_8_1.charset.FULL_STOP) {
                            this.bufferedNumber.appendChar(n);
                            this.state = TokenizerStates.NUMBER_AFTER_FULL_STOP;
                            continue;
                        }
                        if (n === utf_8_1.charset.LATIN_SMALL_LETTER_E ||
                            n === utf_8_1.charset.LATIN_CAPITAL_LETTER_E) {
                            this.bufferedNumber.appendChar(n);
                            this.state = TokenizerStates.NUMBER_AFTER_E;
                            continue;
                        }
                        i -= 1;
                        yield this.emitNumber();
                        this.state = TokenizerStates.START;
                        continue;
                    case TokenizerStates.NUMBER_AFTER_INITIAL_NON_ZERO:
                        if (n >= utf_8_1.charset.DIGIT_ZERO && n <= utf_8_1.charset.DIGIT_NINE) {
                            this.bufferedNumber.appendChar(n);
                            continue;
                        }
                        if (n === utf_8_1.charset.FULL_STOP) {
                            this.bufferedNumber.appendChar(n);
                            this.state = TokenizerStates.NUMBER_AFTER_FULL_STOP;
                            continue;
                        }
                        if (n === utf_8_1.charset.LATIN_SMALL_LETTER_E ||
                            n === utf_8_1.charset.LATIN_CAPITAL_LETTER_E) {
                            this.bufferedNumber.appendChar(n);
                            this.state = TokenizerStates.NUMBER_AFTER_E;
                            continue;
                        }
                        i -= 1;
                        yield this.emitNumber();
                        this.state = TokenizerStates.START;
                        continue;
                    case TokenizerStates.NUMBER_AFTER_FULL_STOP:
                        if (n >= utf_8_1.charset.DIGIT_ZERO && n <= utf_8_1.charset.DIGIT_NINE) {
                            this.bufferedNumber.appendChar(n);
                            this.state = TokenizerStates.NUMBER_AFTER_DECIMAL;
                            continue;
                        }
                        break;
                    case TokenizerStates.NUMBER_AFTER_DECIMAL:
                        if (n >= utf_8_1.charset.DIGIT_ZERO && n <= utf_8_1.charset.DIGIT_NINE) {
                            this.bufferedNumber.appendChar(n);
                            continue;
                        }
                        if (n === utf_8_1.charset.LATIN_SMALL_LETTER_E ||
                            n === utf_8_1.charset.LATIN_CAPITAL_LETTER_E) {
                            this.bufferedNumber.appendChar(n);
                            this.state = TokenizerStates.NUMBER_AFTER_E;
                            continue;
                        }
                        i -= 1;
                        yield this.emitNumber();
                        this.state = TokenizerStates.START;
                        continue;
                    case TokenizerStates.NUMBER_AFTER_E:
                        if (n === utf_8_1.charset.PLUS_SIGN || n === utf_8_1.charset.HYPHEN_MINUS) {
                            this.bufferedNumber.appendChar(n);
                            this.state = TokenizerStates.NUMBER_AFTER_E_AND_SIGN;
                            continue;
                        }
                    // Allow cascading
                    // tslint:disable-next-line:no-switch-case-fall-through
                    case TokenizerStates.NUMBER_AFTER_E_AND_SIGN:
                        if (n >= utf_8_1.charset.DIGIT_ZERO && n <= utf_8_1.charset.DIGIT_NINE) {
                            this.bufferedNumber.appendChar(n);
                            this.state = TokenizerStates.NUMBER_AFTER_E_AND_DIGIT;
                            continue;
                        }
                        break;
                    case TokenizerStates.NUMBER_AFTER_E_AND_DIGIT:
                        if (n >= utf_8_1.charset.DIGIT_ZERO && n <= utf_8_1.charset.DIGIT_NINE) {
                            this.bufferedNumber.appendChar(n);
                            continue;
                        }
                        i -= 1;
                        yield this.emitNumber();
                        this.state = TokenizerStates.START;
                        continue;
                    // TRUE
                    case TokenizerStates.TRUE1:
                        if (n === utf_8_1.charset.LATIN_SMALL_LETTER_R) {
                            this.state = TokenizerStates.TRUE2;
                            continue;
                        }
                        break;
                    case TokenizerStates.TRUE2:
                        if (n === utf_8_1.charset.LATIN_SMALL_LETTER_U) {
                            this.state = TokenizerStates.TRUE3;
                            continue;
                        }
                        break;
                    case TokenizerStates.TRUE3:
                        if (n === utf_8_1.charset.LATIN_SMALL_LETTER_E) {
                            this.state = TokenizerStates.START;
                            yield this.onToken(TRUE, true, this.offset);
                            this.offset += 3;
                            continue;
                        }
                        break;
                    // FALSE
                    case TokenizerStates.FALSE1:
                        if (n === utf_8_1.charset.LATIN_SMALL_LETTER_A) {
                            this.state = TokenizerStates.FALSE2;
                            continue;
                        }
                        break;
                    case TokenizerStates.FALSE2:
                        if (n === utf_8_1.charset.LATIN_SMALL_LETTER_L) {
                            this.state = TokenizerStates.FALSE3;
                            continue;
                        }
                        break;
                    case TokenizerStates.FALSE3:
                        if (n === utf_8_1.charset.LATIN_SMALL_LETTER_S) {
                            this.state = TokenizerStates.FALSE4;
                            continue;
                        }
                        break;
                    case TokenizerStates.FALSE4:
                        if (n === utf_8_1.charset.LATIN_SMALL_LETTER_E) {
                            this.state = TokenizerStates.START;
                            yield this.onToken(FALSE, false, this.offset);
                            this.offset += 4;
                            continue;
                        }
                        break;
                    // NULL
                    case TokenizerStates.NULL1:
                        if (n === utf_8_1.charset.LATIN_SMALL_LETTER_U) {
                            this.state = TokenizerStates.NULL2;
                            continue;
                        }
                    // tslint:disable-next-line:no-switch-case-fall-through
                    case TokenizerStates.NULL2:
                        if (n === utf_8_1.charset.LATIN_SMALL_LETTER_L) {
                            this.state = TokenizerStates.NULL3;
                            continue;
                        }
                    // tslint:disable-next-line:no-switch-case-fall-through
                    case TokenizerStates.NULL3:
                        if (n === utf_8_1.charset.LATIN_SMALL_LETTER_L) {
                            this.state = TokenizerStates.START;
                            yield this.onToken(NULL, null, this.offset);
                            this.offset += 3;
                            continue;
                        }
                }
                throw new Error(`Unexpected "${String.fromCharCode(n)}" at position "${i}" in state ${TokenizerStates[this.state]}`);
            }
        });
    }
    emitNumber() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.onToken(NUMBER, this.parseNumber(this.bufferedNumber.toString()), this.offset);
            this.offset += this.bufferedNumber.byteLength - 1;
        });
    }
    parseNumber(numberStr) {
        return Number(numberStr);
    }
    onToken(token, value, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            // Override
        });
    }
}
exports.default = AsyncTokenizer;
