import tap from "tap";
import JsonParser from "../src/jsonparse";

const { test } = tap;

test("objects", async (t) => {
  const values = [
    "{}",
    '{ "a": 0, "b": 1, "c": -1 }',
    '{ "a": 1.0, "b": 1.1, "c": -1.1, "d": -1.0 }{ "e": -1 }{ "f": -0.1 }',
    '{ "a": 6.02e23, "b": 6.02e+23, "c": 6.02e-23, "d": 0e23 }',
    '{ "a": 7161093205057351174 }',
  ];

  const expected = [
    [[], {}],
    [["a"], 0],
    [["b"], 1],
    [["c"], -1],
    [[], { a: 0, b: 1, c: -1 }],
    [["a"], 1],
    [["b"], 1.1],
    [["c"], -1.1],
    [["d"], -1],
    [[], { a: 1, b: 1.1, c: -1.1, d: -1 }],
    [["e"], -1],
    [[], { e: -1 }],
    [["f"], -0.1],
    [[], { f: -0.1 }],
    [["a"], 6.02e+23],
    [["b"], 6.02e+23],
    [["c"], 6.02e-23],
    [["d"], 0e23],
    [[], { a: 6.02e+23, b: 6.02e+23, c: 6.02e-23, d: 0e23 }],
    [["a"], "7161093205057351174"],
    [[], { a: "7161093205057351174" }],
  ];

  t.plan(expected.length);

  const p = new JsonParser();
  p.onValue = async function (value) {
    const keys = this.stack
      .slice(1)
      .map((item) => item.key)
      .concat(this.key !== undefined ? this.key : []);

    t.deepEqual(
      [keys, value],
      expected.shift(),
    );
  };

  for (const str of values) {
    await p.write(str);
  }
});

test("fail on invalid values", async (t) => {
  const values = [
    "{,",
    '{"test": eer[ }',
    "{ test: 1 }",
    '{ "test", }',
    '{ "test": 1 ;',
    '{ "test": 1 ]',
    '{ "test": 1, }',
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
