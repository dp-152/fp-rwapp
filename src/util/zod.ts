import * as E from "fp-ts/Either";
import * as TE from "fp-ts/lib/TaskEither";
import { ZodError, ZodType } from "zod";

export function zodEither<T extends ZodType>(
  schema: T,
): (value: unknown) => E.Either<ZodError<T["_input"]>, T["_output"]> {
  return (value: unknown) =>
    E.tryCatch(
      () => schema.parse(value),
      (error) => (error instanceof ZodError ? error : new ZodError([])),
    );
}

export function zodTaskEither<T extends ZodType>(
  schema: T,
): (value: unknown) => TE.TaskEither<ZodError<T["_input"]>, T["_output"]> {
  return (value: unknown) =>
    TE.tryCatch(
      () => schema.parseAsync(value),
      (error) => (error instanceof ZodError ? error : new ZodError([])),
    );
}
