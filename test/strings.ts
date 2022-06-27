import tap from "tap";
import JsonParser from "../src/jsonparse";
import { charset } from "../src/utils/utf-8";

const { test } = tap;

const { QUOTATION_MARK } = charset;

const quote = String.fromCharCode(QUOTATION_MARK);

for (const stringBufferSize of [0, 64 * 1024]) {
  test(`simple string with stringBufferSize = ${stringBufferSize}`, async (t) => {
    const values = [
      "Hello world!",
      '\\r\\n\\f\\t\\\\\\/\\"',
      "\\u039b\\u03ac\\u03bc\\u03b2\\u03b4\\u03b1",
      "☃",
      "├──",
      "snow: ☃!",
      "õ",
    ];
    const expected = values.map((str) => JSON.parse(`"${str}"`));

    t.plan(expected.length);
    let i = 0;

    const p = new JsonParser({ stringBufferSize });
    p.onValue = async (value) => {
      t.equal(
        value,
        expected[i],
        `Error on expectation ${i} (${value} !== ${expected[i]})`,
      );
      i += 1;
    };

    for (const str of values) {
      await p.write(quote);
      for (const c of str.split("")) {
        await p.write(c);
      }
      await p.write(quote);
    }
  });

  test("multibyte characters", async (t) => {
    t.plan(5);

    t.test("2 byte utf8 'De' character: д", async (t) => {
      t.plan(1);

      const p = new JsonParser({ stringBufferSize });
      p.onValue = async (value) => t.equal(value, "д");

      await p.write(quote);
      await p.write(new Uint8Array([0xd0, 0xb4]));
      await p.write(quote);
    });

    t.test("3 byte utf8 'Han' character: 我", async (t) => {
      t.plan(1);

      const p = new JsonParser({ stringBufferSize });
      p.onValue = async (value) => t.equal(value, "我");

      await p.write(quote);
      await p.write(new Uint8Array([0xe6, 0x88, 0x91]));
      await p.write(quote);
    });

    t.test("4 byte utf8 character (unicode scalar U+2070E): 𠜎", async (t) => {
      t.plan(1);

      const p = new JsonParser({ stringBufferSize });
      p.onValue = async (value) => t.equal(value, "𠜎");

      await p.write(quote);
      await p.write(new Uint8Array([0xf0, 0xa0, 0x9c, 0x8e]));
      await p.write(quote);
    });

    t.test("chunking", (t) => {
      t.plan(4);

      t.test("2 byte utf8 'De' character chunked inbetween 1st and 3nd byte: д", async (
        t,
      ) => {
        t.plan(1);

        const p = new JsonParser({ stringBufferSize });
        p.onValue = async (value) => t.equal(value, "д");

        await p.write(quote);
        await p.write(new Uint8Array([0xd0]));
        await p.write(new Uint8Array([0xb4]));
        await p.write(quote);
      });

      t.test("3 byte utf8 'Han' character chunked inbetween 2nd and 3rd byte: 我", async (
        t,
      ) => {
        t.plan(1);

        const p = new JsonParser({ stringBufferSize });
        p.onValue = async (value) => t.equal(value, "我");

        await p.write(quote);
        await p.write(new Uint8Array([0xe6, 0x88]));
        await p.write(new Uint8Array([0x91]));
        await p.write(quote);
      });

      t.test("4 byte utf8 character (unicode scalar U+2070E) chunked inbetween 2nd and 3rd byte: 𠜎", async (
        t,
      ) => {
        t.plan(1);

        const p = new JsonParser({ stringBufferSize });
        p.onValue = async (value) => t.equal(value, "𠜎");

        await p.write(quote);
        await p.write(new Uint8Array([0xf0, 0xa0]));
        await p.write(new Uint8Array([0x9c, 0x8e]));
        await p.write(quote);
      });

      t.test("1-4 byte utf8 character string chunked inbetween random bytes: Aж文𠜱B", async (
        t,
      ) => {
        t.plan(11);

        const p = new JsonParser({ stringBufferSize });
        p.onValue = async (value) => t.equal(value, "Aж文𠜱B");

        const eclectic_buffer = new Uint8Array([
          0x41, // A
          0xd0,
          0xb6, // ж
          0xe6,
          0x96,
          0x87, // 文
          0xf0,
          0xa0,
          0x9c,
          0xb1, // 𠜱
          0x42,
        ]); // B

        for (let i = 0; i < 11; i++) {
          const first_buffer = eclectic_buffer.slice(0, i);
          const second_buffer = eclectic_buffer.slice(i);
          await p.write(quote);
          await p.write(first_buffer);
          await p.write(second_buffer);
          await p.write(quote);
        }
      });
    });

    t.test("surrogate", async (t) => {
      t.plan(3);

      t.test("parse surrogate pair", async (t) => {
        t.plan(1);

        const p = new JsonParser({ stringBufferSize });
        p.onValue = async (value) => t.equal(value, "😋");

        await p.write('"\\uD83D\\uDE0B"');
      });

      t.test("parse chunked surrogate pair", async (t) => {
        t.plan(1);

        const p = new JsonParser({ stringBufferSize });
        p.onValue = async (value) => t.equal(value, "😋");

        await p.write(quote);
        await p.write("\\uD83D");
        await p.write("\\uDE0B");
        await p.write(quote);
      });

      t.test("not error on broken surrogate pair", async (t) => {
        t.plan(1);

        const p = new JsonParser({ stringBufferSize });
        p.onValue = async (value) => t.equal(value, "�");

        await p.write(quote);
        await p.write("\\uD83D\\uEFFF");
        await p.write(quote);
      });
    });
  });
}

test("should flush the buffer if there is not space for incoming data", async (t) => {
  t.plan(1);
  const p = new JsonParser({ stringBufferSize: 5 });
  p.onValue = async (value) => t.equal(value, "aaaa𠜎");

  await p.write(quote);
  await p.write("aaaa");
  await p.write("𠜎");
  await p.write(quote);
});

test("fail on invalid values", async (t) => {
  const values = [
    "\n",
    "\\j",
    "\\ua",
    "\\u1*",
    "\\u12*",
    "\\u123*",
  ];
  t.plan(values.length);

  for (const str of values) {
    const p = new JsonParser();
    try {
      await p.write(quote);
      await p.write(str);
      await p.write(quote);
      t.fail(`Expected to fail on value "${str}"`);
    } catch (e) {
      t.pass();
    }
  }
});
