import AsyncTokenizer, { TokenizerOptions } from "./tokenizer";
import AsyncParser, { StackElement } from "./parser";

export default class AsyncJSONParser {
  private tokenizer: AsyncTokenizer;
  private parser: AsyncParser;

  constructor(opts: TokenizerOptions = {}) {
    this.tokenizer = new AsyncTokenizer(opts);
    this.parser = new AsyncParser();
    this.tokenizer.onToken = this.parser.write.bind(this.parser);
  }

  public async write(input: Iterable<number> | string): Promise<void> {
    return this.tokenizer.write(input);
  }

  public set onToken(cb: (token: number, value: any, offset: number) => Promise<void>) {
    this.tokenizer.onToken = cb;
  }

  public set onValue(
    cb: (
      value: any,
      key: string | number | undefined,
      parent: any,
      stack: StackElement[],
    ) => Promise<void>,
  ) {
    this.parser.onValue = cb;
  }
}
