import tap from "tap";
import JsonParser from "../src/jsonparse";

const { test } = tap;

const values = [
  "0",
  "0e1",
  "0e+1",
  "0e-1",
  "0.123",
  "0.123e00",
  "0.123e+1",
  "0.123e-1",
  "0.123E00",
  "0.123E+1",
  "0.123E-1",
  "-0",
  "-0e1",
  "-0e+1",
  "-0e-1",
  "-0.123",
  "-0.123e00",
  "-0.123e+1",
  "-0.123e-1",
  "-0.123E00",
  "-0.123E+1",
  "-0.123E-1",
  "-123",
  "-123e1",
  "-123e+1",
  "-123e-1",
  "-123.123",
  "-123.123e00",
  "-123.123e+1",
  "-123.123e-1",
  "-123.123E00",
  "-123.123E+1",
  "-123.123E-1",
  "123",
  "123e1",
  "123e+1",
  "123e-1",
  "123.123",
  "123.123e00",
  "123.123e+1",
  "123.123e-1",
  "123.123E00",
  "123.123E+1",
  "123.123E-1",
  "7161093205057351174",
  "21e999",
];
const expected = values.map((str) => JSON.parse(str));

for (const numberBufferSize of [0, 64 * 1024]) {
  test("number", async (t) => {
    t.plan(expected.length);
    let i = 0;

    const p = new JsonParser({ numberBufferSize });
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
      await p.write(" ");
    }
  });

  test("number chuncked", async (t) => {
    t.plan(expected.length);
    let i = 0;

    const p = new JsonParser({ numberBufferSize });
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
      await p.write(" ");
    }
  });
}

test("fail on invalid values", async (t) => {
  const values = [
    "-a",
    "-e",
    "1a",
    "1.a",
    "1.e",
    "1.-",
    "1.0ea",
    "1.0e1.2",
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
