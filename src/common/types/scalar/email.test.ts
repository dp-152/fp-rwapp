import { describe, test, expect } from "@jest/globals";
import { pipe } from "fp-ts/function";
import { isLeft, isRight, getOrElse } from "fp-ts/Either";

import { zodEither } from "@util/zod";

import { emailSchema } from "./email";

const validEmail = "john.doe@example.com";
const invalidEmail = "john.doe@example";

describe("Email Scalar Type", () => {
  test("Should validate email", () => {
    const res = pipe(validEmail, zodEither(emailSchema));
    expect(isRight(res)).toBe(true);
    expect(getOrElse(() => "")(res)).toBe(validEmail);
  });

  test("Should not validate email", () => {
    const res = pipe(invalidEmail, zodEither(emailSchema));
    expect(isLeft(res)).toBe(true);
    expect(getOrElse(() => "")(res)).toBe("");
  });
});
