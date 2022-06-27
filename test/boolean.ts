import tap from "tap";
import JsonParser from "../src/jsonparse";

const { test } = tap;

const values = [
  "true",
  "false",
];
const expected = values.map((str) => JSON.parse(str));

test("boolean", async (t) => {
  t.plan(expected.length);
  let i = 0;

  const p = new JsonParser();
  p.onValue = async (value) => {
    t.equal(
      value,
      expected[i],
      `Error on expectation ${i} (${value} !== ${expected[i]})`,
    );
    i += 1;
  };

  for (const str of values) {
    await p.write(str);
  }
});

test("boolean chunked", async (t) => {
  t.plan(expected.length);
  let i = 0;

  const p = new JsonParser();
  p.onValue = async (value) => {
    t.equal(
      value,
      expected[i],
      `Error on expectation ${i} (${value} !== ${expected[i]})`,
    );
    i += 1;
  };

  for (const str of values) {
    for (const c of str.split("")) {
      await p.write(c);
    }
  }
});

test("fail on invalid values", async (t) => {
  const values = [
    "tRue",
    "trUe",
    "truE",
    "fAlse",
    "faLse",
    "falSe",
    "falsE",
  ];
  t.plan(values.length);

  for (const str of values) {
    const p = new JsonParser();
    try {
      await p.write(str);
      t.fail(`Expected to fail on value "${str}"`);
    } catch (e) {
      t.pass();
    }
  }
});
