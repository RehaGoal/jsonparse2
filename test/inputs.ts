import tap from "tap";
import JsonParser from "../src/jsonparse";
import { charset } from "../src/utils/utf-8";

const { test } = tap;

const { QUOTATION_MARK } = charset;

const quote = String.fromCharCode(QUOTATION_MARK);

test("write accept strings", async (t) => {
  t.plan(1);
  const value = "test";

  const p = new JsonParser();
  p.onValue = async (v) => t.equal(v, value);
  await p.write(quote);
  await p.write(value);
  await p.write(quote);
});

test("write accept Uint8Array", async (t) => {
  t.plan(1);
  const value = "test";

  const p = new JsonParser();
  p.onValue = async (v) => t.equal(v, value);
  await p.write(quote);
  await p.write(new Uint8Array([116, 101, 115, 116]));
  await p.write(quote);
});

test("write accept Uint16Array", async (t) => {
  t.plan(1);
  const value = "test";

  const p = new JsonParser();
  p.onValue = async (v) => t.equal(v, value);
  await p.write(quote);
  await p.write(new Uint16Array([116, 101, 115, 116]));
  await p.write(quote);
});

test("write accept Uint32Array", async (t) => {
  t.plan(1);
  const value = "test";

  const p = new JsonParser();
  p.onValue = async (v) => t.equal(v, value);
  await p.write(quote);
  await p.write(new Uint32Array([116, 101, 115, 116]));
  await p.write(quote);
});

test("write accept Array", async (t) => {
  t.plan(1);
  const value = "test";

  const p = new JsonParser();
  p.onValue = async (v) => t.equal(v, value);
  await p.write(quote);
  await p.write([116, 101, 115, 116]);
  await p.write(quote);
});

test("write throw on invalid type", async (t) => {
  t.plan(1);

  const p = new JsonParser();
  try {
    await p.write(745674 as any);
    t.fail(`Expected to fail on number input.`);
  } catch (e) {
    t.pass();
  }
});
