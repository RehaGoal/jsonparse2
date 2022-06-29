import { TokenType } from "./utils/constants";
export interface TokenizerOptions {
    stringBufferSize?: number;
    numberBufferSize?: number;
}
export default class AsyncTokenizer {
    private state;
    private bufferedString;
    private bufferedNumber;
    private unicode;
    private highSurrogate;
    private bytesRemaining;
    private bytesInSequence;
    private charSplitBuffer;
    private encoder;
    private offset;
    constructor(opts: TokenizerOptions);
    write(input: Iterable<number> | string): Promise<void>;
    private emitNumber;
    protected parseNumber(numberStr: string): number;
    onToken(token: TokenType, value: any, offset: number): Promise<void>;
}
