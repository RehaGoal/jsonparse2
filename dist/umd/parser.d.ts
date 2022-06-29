import { TokenType } from "./utils/constants";
export declare enum ParserMode {
    OBJECT = 0,
    ARRAY = 1
}
export interface StackElement {
    key: string | number | undefined;
    value: any;
    mode: ParserMode | undefined;
}
export default class AsyncParser {
    private state;
    private mode;
    private key;
    private value;
    private stack;
    private push;
    private pop;
    write(token: TokenType, value: any): Promise<void>;
    onValue(value: any, key: string | number | undefined, parent: any, stack: StackElement[]): Promise<void>;
}
