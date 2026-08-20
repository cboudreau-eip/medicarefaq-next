/**
 * Resolver hook so plain Node can import the project's .ts modules.
 *
 * src/lib/content-validator.ts imports "./writing-config" with no extension,
 * which Node's ESM resolver rejects. This hook retries such specifiers with
 * a .ts extension. Combined with Node's native type stripping (v22.6+), it
 * lets us run the REAL validator instead of reimplementing its rules.
 */
export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context);
  } catch (err) {
    if (
      (err?.code === "ERR_MODULE_NOT_FOUND" || err?.code === "ERR_UNSUPPORTED_DIR_IMPORT") &&
      specifier.startsWith(".") &&
      !/\.[cm]?[jt]s$/.test(specifier)
    ) {
      for (const ext of [".ts", ".tsx", "/index.ts"]) {
        try {
          return await nextResolve(specifier + ext, context);
        } catch {
          /* try next */
        }
      }
    }
    throw err;
  }
}
