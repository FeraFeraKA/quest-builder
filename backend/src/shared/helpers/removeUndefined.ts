type RemoveUndefinedValues<T extends Record<string, unknown>> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K];
} & {
  [K in keyof T as undefined extends T[K] ? K : never]?: Exclude<
    T[K],
    undefined
  >;
};

export function removeUndefined<T extends Record<string, unknown>>(
  obj: T,
): RemoveUndefinedValues<T> {
  const result: Record<string, unknown> = {};

  for (const key of Object.keys(obj) as Array<keyof T>) {
    const value = obj[key];

    if (value !== undefined) {
      result[key as string] = value;
    }
  }

  return result as RemoveUndefinedValues<T>;
}
