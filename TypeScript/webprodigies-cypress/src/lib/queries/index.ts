/**
 * ### ApiWrapper
 * A higher order function that wraps queries to reduce API boilerplate.
 * Returns the data and error: null on success.
 * Returns null data and an error message on failure.
 */
export function apiWrapper<TArgs extends any[], Res>(
  queryFn: (...args: TArgs) => Promise<Res>,
) {
  return async (...args: TArgs) => {
    try {
      const data = await queryFn(...args);

      return { data, error: null };
    } catch (error) {
      console.log(error);

      const message = error instanceof Error ? error.message : "Error";

      return { data: null, error: message };
    }
  };
}
