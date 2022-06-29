var charset;
(function (charset) {
    charset[charset["BACKSPACE"] = 8] = "BACKSPACE";
    charset[charset["FORM_FEED"] = 12] = "FORM_FEED";
    charset[charset["NEWLINE"] = 10] = "NEWLINE";
    charset[charset["CARRIAGE_RETURN"] = 13] = "CARRIAGE_RETURN";
    charset[charset["TAB"] = 9] = "TAB";
    charset[charset["SPACE"] = 32] = "SPACE";
    charset[charset["EXCLAMATION_MARK"] = 33] = "EXCLAMATION_MARK";
    charset[charset["QUOTATION_MARK"] = 34] = "QUOTATION_MARK";
    charset[charset["NUMBER_SIGN"] = 35] = "NUMBER_SIGN";
    charset[charset["DOLLAR_SIGN"] = 36] = "DOLLAR_SIGN";
    charset[charset["PERCENT_SIGN"] = 37] = "PERCENT_SIGN";
    charset[charset["AMPERSAND"] = 38] = "AMPERSAND";
    charset[charset["APOSTROPHE"] = 39] = "APOSTROPHE";
    charset[charset["LEFT_PARENTHESIS"] = 40] = "LEFT_PARENTHESIS";
    charset[charset["RIGHT_PARENTHESIS"] = 41] = "RIGHT_PARENTHESIS";
    charset[charset["ASTERISK"] = 42] = "ASTERISK";
    charset[charset["PLUS_SIGN"] = 43] = "PLUS_SIGN";
    charset[charset["COMMA"] = 44] = "COMMA";
    charset[charset["HYPHEN_MINUS"] = 45] = "HYPHEN_MINUS";
    charset[charset["FULL_STOP"] = 46] = "FULL_STOP";
    charset[charset["SOLIDUS"] = 47] = "SOLIDUS";
    charset[charset["DIGIT_ZERO"] = 48] = "DIGIT_ZERO";
    charset[charset["DIGIT_ONE"] = 49] = "DIGIT_ONE";
    charset[charset["DIGIT_TWO"] = 50] = "DIGIT_TWO";
    charset[charset["DIGIT_THREE"] = 51] = "DIGIT_THREE";
    charset[charset["DIGIT_FOUR"] = 52] = "DIGIT_FOUR";
    charset[charset["DIGIT_FIVE"] = 53] = "DIGIT_FIVE";
    charset[charset["DIGIT_SIX"] = 54] = "DIGIT_SIX";
    charset[charset["DIGIT_SEVEN"] = 55] = "DIGIT_SEVEN";
    charset[charset["DIGIT_EIGHT"] = 56] = "DIGIT_EIGHT";
    charset[charset["DIGIT_NINE"] = 57] = "DIGIT_NINE";
    charset[charset["COLON"] = 58] = "COLON";
    charset[charset["SEMICOLON"] = 59] = "SEMICOLON";
    charset[charset["LESS_THAN_SIGN"] = 60] = "LESS_THAN_SIGN";
    charset[charset["EQUALS_SIGN"] = 61] = "EQUALS_SIGN";
    charset[charset["GREATER_THAN_SIGN"] = 62] = "GREATER_THAN_SIGN";
    charset[charset["QUESTION_MARK"] = 63] = "QUESTION_MARK";
    charset[charset["COMMERCIAL_AT"] = 64] = "COMMERCIAL_AT";
    charset[charset["LATIN_CAPITAL_LETTER_A"] = 65] = "LATIN_CAPITAL_LETTER_A";
    charset[charset["LATIN_CAPITAL_LETTER_B"] = 66] = "LATIN_CAPITAL_LETTER_B";
    charset[charset["LATIN_CAPITAL_LETTER_C"] = 67] = "LATIN_CAPITAL_LETTER_C";
    charset[charset["LATIN_CAPITAL_LETTER_D"] = 68] = "LATIN_CAPITAL_LETTER_D";
    charset[charset["LATIN_CAPITAL_LETTER_E"] = 69] = "LATIN_CAPITAL_LETTER_E";
    charset[charset["LATIN_CAPITAL_LETTER_F"] = 70] = "LATIN_CAPITAL_LETTER_F";
    charset[charset["LATIN_CAPITAL_LETTER_G"] = 71] = "LATIN_CAPITAL_LETTER_G";
    charset[charset["LATIN_CAPITAL_LETTER_H"] = 72] = "LATIN_CAPITAL_LETTER_H";
    charset[charset["LATIN_CAPITAL_LETTER_I"] = 73] = "LATIN_CAPITAL_LETTER_I";
    charset[charset["LATIN_CAPITAL_LETTER_J"] = 74] = "LATIN_CAPITAL_LETTER_J";
    charset[charset["LATIN_CAPITAL_LETTER_K"] = 75] = "LATIN_CAPITAL_LETTER_K";
    charset[charset["LATIN_CAPITAL_LETTER_L"] = 76] = "LATIN_CAPITAL_LETTER_L";
    charset[charset["LATIN_CAPITAL_LETTER_M"] = 77] = "LATIN_CAPITAL_LETTER_M";
    charset[charset["LATIN_CAPITAL_LETTER_N"] = 78] = "LATIN_CAPITAL_LETTER_N";
    charset[charset["LATIN_CAPITAL_LETTER_O"] = 79] = "LATIN_CAPITAL_LETTER_O";
    charset[charset["LATIN_CAPITAL_LETTER_P"] = 80] = "LATIN_CAPITAL_LETTER_P";
    charset[charset["LATIN_CAPITAL_LETTER_Q"] = 81] = "LATIN_CAPITAL_LETTER_Q";
    charset[charset["LATIN_CAPITAL_LETTER_R"] = 82] = "LATIN_CAPITAL_LETTER_R";
    charset[charset["LATIN_CAPITAL_LETTER_S"] = 83] = "LATIN_CAPITAL_LETTER_S";
    charset[charset["LATIN_CAPITAL_LETTER_T"] = 84] = "LATIN_CAPITAL_LETTER_T";
    charset[charset["LATIN_CAPITAL_LETTER_U"] = 85] = "LATIN_CAPITAL_LETTER_U";
    charset[charset["LATIN_CAPITAL_LETTER_V"] = 86] = "LATIN_CAPITAL_LETTER_V";
    charset[charset["LATIN_CAPITAL_LETTER_W"] = 87] = "LATIN_CAPITAL_LETTER_W";
    charset[charset["LATIN_CAPITAL_LETTER_X"] = 88] = "LATIN_CAPITAL_LETTER_X";
    charset[charset["LATIN_CAPITAL_LETTER_Y"] = 89] = "LATIN_CAPITAL_LETTER_Y";
    charset[charset["LATIN_CAPITAL_LETTER_Z"] = 90] = "LATIN_CAPITAL_LETTER_Z";
    charset[charset["LEFT_SQUARE_BRACKET"] = 91] = "LEFT_SQUARE_BRACKET";
    charset[charset["REVERSE_SOLIDUS"] = 92] = "REVERSE_SOLIDUS";
    charset[charset["RIGHT_SQUARE_BRACKET"] = 93] = "RIGHT_SQUARE_BRACKET";
    charset[charset["CIRCUMFLEX_ACCENT"] = 94] = "CIRCUMFLEX_ACCENT";
    charset[charset["LOW_LINE"] = 95] = "LOW_LINE";
    charset[charset["GRAVE_ACCENT"] = 96] = "GRAVE_ACCENT";
    charset[charset["LATIN_SMALL_LETTER_A"] = 97] = "LATIN_SMALL_LETTER_A";
    charset[charset["LATIN_SMALL_LETTER_B"] = 98] = "LATIN_SMALL_LETTER_B";
    charset[charset["LATIN_SMALL_LETTER_C"] = 99] = "LATIN_SMALL_LETTER_C";
    charset[charset["LATIN_SMALL_LETTER_D"] = 100] = "LATIN_SMALL_LETTER_D";
    charset[charset["LATIN_SMALL_LETTER_E"] = 101] = "LATIN_SMALL_LETTER_E";
    charset[charset["LATIN_SMALL_LETTER_F"] = 102] = "LATIN_SMALL_LETTER_F";
    charset[charset["LATIN_SMALL_LETTER_G"] = 103] = "LATIN_SMALL_LETTER_G";
    charset[charset["LATIN_SMALL_LETTER_H"] = 104] = "LATIN_SMALL_LETTER_H";
    charset[charset["LATIN_SMALL_LETTER_I"] = 105] = "LATIN_SMALL_LETTER_I";
    charset[charset["LATIN_SMALL_LETTER_J"] = 106] = "LATIN_SMALL_LETTER_J";
    charset[charset["LATIN_SMALL_LETTER_K"] = 107] = "LATIN_SMALL_LETTER_K";
    charset[charset["LATIN_SMALL_LETTER_L"] = 108] = "LATIN_SMALL_LETTER_L";
    charset[charset["LATIN_SMALL_LETTER_M"] = 109] = "LATIN_SMALL_LETTER_M";
    charset[charset["LATIN_SMALL_LETTER_N"] = 110] = "LATIN_SMALL_LETTER_N";
    charset[charset["LATIN_SMALL_LETTER_O"] = 111] = "LATIN_SMALL_LETTER_O";
    charset[charset["LATIN_SMALL_LETTER_P"] = 112] = "LATIN_SMALL_LETTER_P";
    charset[charset["LATIN_SMALL_LETTER_Q"] = 113] = "LATIN_SMALL_LETTER_Q";
    charset[charset["LATIN_SMALL_LETTER_R"] = 114] = "LATIN_SMALL_LETTER_R";
    charset[charset["LATIN_SMALL_LETTER_S"] = 115] = "LATIN_SMALL_LETTER_S";
    charset[charset["LATIN_SMALL_LETTER_T"] = 116] = "LATIN_SMALL_LETTER_T";
    charset[charset["LATIN_SMALL_LETTER_U"] = 117] = "LATIN_SMALL_LETTER_U";
    charset[charset["LATIN_SMALL_LETTER_V"] = 118] = "LATIN_SMALL_LETTER_V";
    charset[charset["LATIN_SMALL_LETTER_W"] = 119] = "LATIN_SMALL_LETTER_W";
    charset[charset["LATIN_SMALL_LETTER_X"] = 120] = "LATIN_SMALL_LETTER_X";
    charset[charset["LATIN_SMALL_LETTER_Y"] = 121] = "LATIN_SMALL_LETTER_Y";
    charset[charset["LATIN_SMALL_LETTER_Z"] = 122] = "LATIN_SMALL_LETTER_Z";
    charset[charset["LEFT_CURLY_BRACKET"] = 123] = "LEFT_CURLY_BRACKET";
    charset[charset["VERTICAL_LINE"] = 124] = "VERTICAL_LINE";
    charset[charset["RIGHT_CURLY_BRACKET"] = 125] = "RIGHT_CURLY_BRACKET";
    charset[charset["TILDE"] = 126] = "TILDE";
})(charset || (charset = {}));
const escapedSequences = {
    [charset.QUOTATION_MARK]: charset.QUOTATION_MARK,
    [charset.REVERSE_SOLIDUS]: charset.REVERSE_SOLIDUS,
    [charset.SOLIDUS]: charset.SOLIDUS,
    [charset.LATIN_SMALL_LETTER_B]: charset.BACKSPACE,
    [charset.LATIN_SMALL_LETTER_F]: charset.FORM_FEED,
    [charset.LATIN_SMALL_LETTER_N]: charset.NEWLINE,
    [charset.LATIN_SMALL_LETTER_R]: charset.CARRIAGE_RETURN,
    [charset.LATIN_SMALL_LETTER_T]: charset.TAB,
};

var utf8 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get charset () { return charset; },
  escapedSequences: escapedSequences
});

class NonBufferedString {
    constructor() {
        this.decoder = new TextDecoder("utf-8");
        this.string = "";
        this.byteLength = 0;
    }
    appendChar(char) {
        this.string += String.fromCharCode(char);
        this.byteLength += 1;
    }
    appendBuf(buf, start = 0, end = buf.length) {
        this.string += this.decoder.decode(buf.subarray(start, end));
        this.byteLength += end - start;
    }
    reset() {
        this.string = "";
        this.byteLength = 0;
    }
    toString() {
        return this.string;
    }
}
class BufferedString {
    constructor(bufferSize) {
        this.decoder = new TextDecoder("utf-8");
        this.bufferOffset = 0;
        this.string = "";
        this.byteLength = 0;
        this.buffer = new Uint8Array(bufferSize);
    }
    appendChar(char) {
        if (this.bufferOffset >= this.buffer.length)
            this.flushStringBuffer();
        this.buffer[this.bufferOffset++] = char;
        this.byteLength += 1;
    }
    appendBuf(buf, start = 0, end = buf.length) {
        const size = end - start;
        if (this.bufferOffset + size > this.buffer.length)
            this.flushStringBuffer();
        this.buffer.set(buf.subarray(start, end), this.bufferOffset);
        this.bufferOffset += size;
        this.byteLength += size;
    }
    flushStringBuffer() {
        this.string += this.decoder.decode(this.buffer.subarray(0, this.bufferOffset));
        this.bufferOffset = 0;
    }
    reset() {
        this.string = "";
        this.bufferOffset = 0;
        this.byteLength = 0;
    }
    toString() {
        this.flushStringBuffer();
        return this.string;
    }
}

var TokenType;
(function (TokenType) {
    TokenType[TokenType["LEFT_BRACE"] = 1] = "LEFT_BRACE";
    TokenType[TokenType["RIGHT_BRACE"] = 2] = "RIGHT_BRACE";
    TokenType[TokenType["LEFT_BRACKET"] = 3] = "LEFT_BRACKET";
    TokenType[TokenType["RIGHT_BRACKET"] = 4] = "RIGHT_BRACKET";
    TokenType[TokenType["COLON"] = 5] = "COLON";
    TokenType[TokenType["COMMA"] = 6] = "COMMA";
    TokenType[TokenType["TRUE"] = 7] = "TRUE";
    TokenType[TokenType["FALSE"] = 8] = "FALSE";
    TokenType[TokenType["NULL"] = 9] = "NULL";
    TokenType[TokenType["STRING"] = 10] = "STRING";
    TokenType[TokenType["NUMBER"] = 11] = "NUMBER";
})(TokenType || (TokenType = {}));

const { LEFT_BRACE, RIGHT_BRACE, LEFT_BRACKET, RIGHT_BRACKET, COLON, COMMA, TRUE, FALSE, NULL, STRING, NUMBER, } = TokenType;
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
            ? new BufferedString(opts.stringBufferSize)
            : new NonBufferedString();
        this.bufferedNumber = opts.numberBufferSize && opts.numberBufferSize > 0
            ? new BufferedString(opts.numberBufferSize)
            : new NonBufferedString();
    }
    async write(input) {
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
                    if (n === charset.SPACE ||
                        n === charset.NEWLINE ||
                        n === charset.CARRIAGE_RETURN ||
                        n === charset.TAB) {
                        // whitespace
                        continue;
                    }
                    if (n === charset.LEFT_CURLY_BRACKET) {
                        await this.onToken(LEFT_BRACE, '{', this.offset);
                        continue;
                    }
                    if (n === charset.RIGHT_CURLY_BRACKET) {
                        await this.onToken(RIGHT_BRACE, '}', this.offset);
                        continue;
                    }
                    if (n === charset.LEFT_SQUARE_BRACKET) {
                        await this.onToken(LEFT_BRACKET, '[', this.offset);
                        continue;
                    }
                    if (n === charset.RIGHT_SQUARE_BRACKET) {
                        await this.onToken(RIGHT_BRACKET, ']', this.offset);
                        continue;
                    }
                    if (n === charset.COLON) {
                        await this.onToken(COLON, ':', this.offset);
                        continue;
                    }
                    if (n === charset.COMMA) {
                        await this.onToken(COMMA, ',', this.offset);
                        continue;
                    }
                    if (n === charset.LATIN_SMALL_LETTER_T) {
                        this.state = TokenizerStates.TRUE1;
                        continue;
                    }
                    if (n === charset.LATIN_SMALL_LETTER_F) {
                        this.state = TokenizerStates.FALSE1;
                        continue;
                    }
                    if (n === charset.LATIN_SMALL_LETTER_N) {
                        this.state = TokenizerStates.NULL1;
                        continue;
                    }
                    if (n === charset.QUOTATION_MARK) {
                        this.bufferedString.reset();
                        this.state = TokenizerStates.STRING_DEFAULT;
                        continue;
                    }
                    if (n >= charset.DIGIT_ONE && n <= charset.DIGIT_NINE) {
                        this.bufferedNumber.reset();
                        this.bufferedNumber.appendChar(n);
                        this.state = TokenizerStates.NUMBER_AFTER_INITIAL_NON_ZERO;
                        continue;
                    }
                    if (n === charset.DIGIT_ZERO) {
                        this.bufferedNumber.reset();
                        this.bufferedNumber.appendChar(n);
                        this.state = TokenizerStates.NUMBER_AFTER_INITIAL_ZERO;
                        continue;
                    }
                    if (n === charset.HYPHEN_MINUS) {
                        this.bufferedNumber.reset();
                        this.bufferedNumber.appendChar(n);
                        this.state = TokenizerStates.NUMBER_AFTER_INITIAL_MINUS;
                        continue;
                    }
                    break;
                // STRING
                case TokenizerStates.STRING_DEFAULT:
                    if (n === charset.QUOTATION_MARK) {
                        const str = this.bufferedString.toString();
                        await this.onToken(STRING, str, this.offset);
                        this.offset += this.bufferedString.byteLength + 1;
                        this.state = TokenizerStates.START;
                        continue;
                    }
                    if (n === charset.REVERSE_SOLIDUS) {
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
                    if (n >= charset.SPACE) {
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
                    const controlChar = escapedSequences[n];
                    if (controlChar) {
                        this.bufferedString.appendChar(controlChar);
                        this.state = TokenizerStates.STRING_DEFAULT;
                        continue;
                    }
                    if (n === charset.LATIN_SMALL_LETTER_U) {
                        this.unicode = '';
                        this.state = TokenizerStates.STRING_UNICODE_DIGIT_1;
                        continue;
                    }
                    break;
                case TokenizerStates.STRING_UNICODE_DIGIT_1:
                case TokenizerStates.STRING_UNICODE_DIGIT_2:
                case TokenizerStates.STRING_UNICODE_DIGIT_3:
                    if ((n >= charset.DIGIT_ZERO && n <= charset.DIGIT_NINE) ||
                        (n >= charset.LATIN_CAPITAL_LETTER_A &&
                            n <= charset.LATIN_CAPITAL_LETTER_F) ||
                        (n >= charset.LATIN_SMALL_LETTER_A &&
                            n <= charset.LATIN_SMALL_LETTER_F)) {
                        this.unicode += String.fromCharCode(n);
                        this.state += 1;
                        continue;
                    }
                    break;
                case TokenizerStates.STRING_UNICODE_DIGIT_4:
                    if ((n >= charset.DIGIT_ZERO && n <= charset.DIGIT_NINE) ||
                        (n >= charset.LATIN_CAPITAL_LETTER_A &&
                            n <= charset.LATIN_CAPITAL_LETTER_F) ||
                        (n >= charset.LATIN_SMALL_LETTER_A &&
                            n <= charset.LATIN_SMALL_LETTER_F)) {
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
                    if (n === charset.DIGIT_ZERO) {
                        this.bufferedNumber.appendChar(n);
                        this.state = TokenizerStates.NUMBER_AFTER_INITIAL_ZERO;
                        continue;
                    }
                    if (n >= charset.DIGIT_ONE && n <= charset.DIGIT_NINE) {
                        this.bufferedNumber.appendChar(n);
                        this.state = TokenizerStates.NUMBER_AFTER_INITIAL_NON_ZERO;
                        continue;
                    }
                    break;
                case TokenizerStates.NUMBER_AFTER_INITIAL_ZERO:
                    if (n === charset.FULL_STOP) {
                        this.bufferedNumber.appendChar(n);
                        this.state = TokenizerStates.NUMBER_AFTER_FULL_STOP;
                        continue;
                    }
                    if (n === charset.LATIN_SMALL_LETTER_E ||
                        n === charset.LATIN_CAPITAL_LETTER_E) {
                        this.bufferedNumber.appendChar(n);
                        this.state = TokenizerStates.NUMBER_AFTER_E;
                        continue;
                    }
                    i -= 1;
                    await this.emitNumber();
                    this.state = TokenizerStates.START;
                    continue;
                case TokenizerStates.NUMBER_AFTER_INITIAL_NON_ZERO:
                    if (n >= charset.DIGIT_ZERO && n <= charset.DIGIT_NINE) {
                        this.bufferedNumber.appendChar(n);
                        continue;
                    }
                    if (n === charset.FULL_STOP) {
                        this.bufferedNumber.appendChar(n);
                        this.state = TokenizerStates.NUMBER_AFTER_FULL_STOP;
                        continue;
                    }
                    if (n === charset.LATIN_SMALL_LETTER_E ||
                        n === charset.LATIN_CAPITAL_LETTER_E) {
                        this.bufferedNumber.appendChar(n);
                        this.state = TokenizerStates.NUMBER_AFTER_E;
                        continue;
                    }
                    i -= 1;
                    await this.emitNumber();
                    this.state = TokenizerStates.START;
                    continue;
                case TokenizerStates.NUMBER_AFTER_FULL_STOP:
                    if (n >= charset.DIGIT_ZERO && n <= charset.DIGIT_NINE) {
                        this.bufferedNumber.appendChar(n);
                        this.state = TokenizerStates.NUMBER_AFTER_DECIMAL;
                        continue;
                    }
                    break;
                case TokenizerStates.NUMBER_AFTER_DECIMAL:
                    if (n >= charset.DIGIT_ZERO && n <= charset.DIGIT_NINE) {
                        this.bufferedNumber.appendChar(n);
                        continue;
                    }
                    if (n === charset.LATIN_SMALL_LETTER_E ||
                        n === charset.LATIN_CAPITAL_LETTER_E) {
                        this.bufferedNumber.appendChar(n);
                        this.state = TokenizerStates.NUMBER_AFTER_E;
                        continue;
                    }
                    i -= 1;
                    await this.emitNumber();
                    this.state = TokenizerStates.START;
                    continue;
                case TokenizerStates.NUMBER_AFTER_E:
                    if (n === charset.PLUS_SIGN || n === charset.HYPHEN_MINUS) {
                        this.bufferedNumber.appendChar(n);
                        this.state = TokenizerStates.NUMBER_AFTER_E_AND_SIGN;
                        continue;
                    }
                // Allow cascading
                // tslint:disable-next-line:no-switch-case-fall-through
                case TokenizerStates.NUMBER_AFTER_E_AND_SIGN:
                    if (n >= charset.DIGIT_ZERO && n <= charset.DIGIT_NINE) {
                        this.bufferedNumber.appendChar(n);
                        this.state = TokenizerStates.NUMBER_AFTER_E_AND_DIGIT;
                        continue;
                    }
                    break;
                case TokenizerStates.NUMBER_AFTER_E_AND_DIGIT:
                    if (n >= charset.DIGIT_ZERO && n <= charset.DIGIT_NINE) {
                        this.bufferedNumber.appendChar(n);
                        continue;
                    }
                    i -= 1;
                    await this.emitNumber();
                    this.state = TokenizerStates.START;
                    continue;
                // TRUE
                case TokenizerStates.TRUE1:
                    if (n === charset.LATIN_SMALL_LETTER_R) {
                        this.state = TokenizerStates.TRUE2;
                        continue;
                    }
                    break;
                case TokenizerStates.TRUE2:
                    if (n === charset.LATIN_SMALL_LETTER_U) {
                        this.state = TokenizerStates.TRUE3;
                        continue;
                    }
                    break;
                case TokenizerStates.TRUE3:
                    if (n === charset.LATIN_SMALL_LETTER_E) {
                        this.state = TokenizerStates.START;
                        await this.onToken(TRUE, true, this.offset);
                        this.offset += 3;
                        continue;
                    }
                    break;
                // FALSE
                case TokenizerStates.FALSE1:
                    if (n === charset.LATIN_SMALL_LETTER_A) {
                        this.state = TokenizerStates.FALSE2;
                        continue;
                    }
                    break;
                case TokenizerStates.FALSE2:
                    if (n === charset.LATIN_SMALL_LETTER_L) {
                        this.state = TokenizerStates.FALSE3;
                        continue;
                    }
                    break;
                case TokenizerStates.FALSE3:
                    if (n === charset.LATIN_SMALL_LETTER_S) {
                        this.state = TokenizerStates.FALSE4;
                        continue;
                    }
                    break;
                case TokenizerStates.FALSE4:
                    if (n === charset.LATIN_SMALL_LETTER_E) {
                        this.state = TokenizerStates.START;
                        await this.onToken(FALSE, false, this.offset);
                        this.offset += 4;
                        continue;
                    }
                    break;
                // NULL
                case TokenizerStates.NULL1:
                    if (n === charset.LATIN_SMALL_LETTER_U) {
                        this.state = TokenizerStates.NULL2;
                        continue;
                    }
                // tslint:disable-next-line:no-switch-case-fall-through
                case TokenizerStates.NULL2:
                    if (n === charset.LATIN_SMALL_LETTER_L) {
                        this.state = TokenizerStates.NULL3;
                        continue;
                    }
                // tslint:disable-next-line:no-switch-case-fall-through
                case TokenizerStates.NULL3:
                    if (n === charset.LATIN_SMALL_LETTER_L) {
                        this.state = TokenizerStates.START;
                        await this.onToken(NULL, null, this.offset);
                        this.offset += 3;
                        continue;
                    }
            }
            throw new Error(`Unexpected "${String.fromCharCode(n)}" at position "${i}" in state ${TokenizerStates[this.state]}`);
        }
    }
    async emitNumber() {
        await this.onToken(NUMBER, this.parseNumber(this.bufferedNumber.toString()), this.offset);
        this.offset += this.bufferedNumber.byteLength - 1;
    }
    parseNumber(numberStr) {
        return Number(numberStr);
    }
    async onToken(token, value, offset) {
        // Override
    }
}

const { LEFT_BRACE: LEFT_BRACE$1, RIGHT_BRACE: RIGHT_BRACE$1, LEFT_BRACKET: LEFT_BRACKET$1, RIGHT_BRACKET: RIGHT_BRACKET$1, COLON: COLON$1, COMMA: COMMA$1, TRUE: TRUE$1, FALSE: FALSE$1, NULL: NULL$1, STRING: STRING$1, NUMBER: NUMBER$1, } = TokenType;
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
})(ParserMode || (ParserMode = {}));
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
    async pop() {
        const value = this.value;
        ({ key: this.key, value: this.value, mode: this.mode } = this.stack
            .pop());
        await this.onValue(value, this.key, this.value, this.stack);
        this.state = this.mode !== undefined
            ? ParserState.COMMA
            : ParserState.VALUE;
    }
    async write(token, value) {
        if (this.state === ParserState.VALUE) {
            if (token === STRING$1 || token === NUMBER$1 || token === TRUE$1 ||
                token === FALSE$1 || token === NULL$1) {
                if (this.mode === ParserMode.OBJECT) {
                    this.value[this.key] = value;
                    this.state = ParserState.COMMA;
                }
                else if (this.mode === ParserMode.ARRAY) {
                    this.value.push(value);
                    this.state = ParserState.COMMA;
                }
                await this.onValue(value, this.key, this.value, this.stack);
                return;
            }
            if (token === LEFT_BRACE$1) {
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
            if (token === LEFT_BRACKET$1) {
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
            if (this.mode === ParserMode.ARRAY && token === RIGHT_BRACKET$1 &&
                this.value.length === 0) {
                await this.pop();
                return;
            }
        }
        if (this.state === ParserState.KEY) {
            if (token === STRING$1) {
                this.key = value;
                this.state = ParserState.COLON;
                return;
            }
            if (token === RIGHT_BRACE$1 && Object.keys(this.value).length === 0) {
                await this.pop();
                return;
            }
        }
        if (this.state === ParserState.COLON) {
            if (token === COLON$1) {
                this.state = ParserState.VALUE;
                return;
            }
        }
        if (this.state === ParserState.COMMA) {
            if (token === COMMA$1) {
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
            if (token === RIGHT_BRACE$1 && this.mode === ParserMode.OBJECT ||
                token === RIGHT_BRACKET$1 && this.mode === ParserMode.ARRAY) {
                await this.pop();
                return;
            }
        }
        throw new Error("Unexpected " + TokenType[token] + (("(" + JSON.stringify(value) + ")")) +
            " in state " + ParserState[this.state]);
    }
    async onValue(value, key, parent, stack) {
        // Override me
    }
}

class AsyncJSONParser {
    constructor(opts = {}) {
        this.tokenizer = new AsyncTokenizer(opts);
        this.parser = new AsyncParser();
        this.tokenizer.onToken = this.parser.write.bind(this.parser);
    }
    async write(input) {
        return this.tokenizer.write(input);
    }
    set onToken(cb) {
        this.tokenizer.onToken = cb;
    }
    set onValue(cb) {
        this.parser.onValue = cb;
    }
}

export { AsyncJSONParser as JsonParser, AsyncParser as Parser, TokenType, AsyncTokenizer as Tokenizer, utf8 };
