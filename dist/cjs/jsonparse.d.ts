import { TokenizerOptions } from "./tokenizer";
import { StackElement } from "./parser";
export default class AsyncJSONParser {
    private tokenizer;
    private parser;
    constructor(opts?: TokenizerOptions);
    write(input: Iterable<number> | string): Promise<void>;
    set onToken(cb: (token: number, value: any, offset: number) => Promise<void>);
    set onValue(cb: (value: any, key: string | number | undefined, parent: any, stack: StackElement[]) => Promise<void>);
}
