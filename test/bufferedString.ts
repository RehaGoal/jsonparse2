import tap from "tap";
import JsonParser from "../src/jsonparse";
import { charset } from "../src/utils/utf-8";

const { test } = tap;
const { LATIN_SMALL_LETTER_A, QUOTATION_MARK, DIGIT_ONE } = charset;

const quote = String.fromCharCode(QUOTATION_MARK);

test("can handle large strings without running out of memory", async (t) => {
  const parser = new JsonParser({ stringBufferSize: 64 * 1024 });
  const chunkSize = 1024;
  const chunks = 1024 * 200; // 200mb
  t.plan(1);

  parser.onToken = async (type, value) => {
    t.equal(
        value.length,
        chunkSize * chunks,
        "token should be size of input json",
    );
  };

  await parser.write(quote);
  const buffers = Array(chunks).fill(new Uint8Array(chunkSize).fill(LATIN_SMALL_LETTER_A));
  for (const buffer of buffers) {
    await parser.write(buffer);
  }
  await parser.write(quote);
});

test("can handle large numbers without running out of memory", async (t) => {
  const parser = new JsonParser({ numberBufferSize: 64 * 1024 });
  const chunkSize = 1024;
  const chunks = 1024 * 200; // 200mb
  t.plan(1);

  parser.onToken = async (type, value) => {
    t.equal(value, 1.1111111111111112, "token should be correct");
  };

  await parser.write("1.");
  const buffers = Array(chunks).fill(new Uint8Array(chunkSize).fill(DIGIT_ONE));
  for (const buffer of buffers) {
    await parser.write(buffer);
  }
  await parser.write(" ");
});

test("can handle multi-byte unicode splits", async (t) => {
  const parser = new JsonParser({ numberBufferSize: 1 });
  t.plan(1);

  parser.onToken = async (type, value) => { t.equal(value, "𠜎") };

  await parser.write('"𠜎"');
});
