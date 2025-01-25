export async function to<T>(promise: Promise<T>): Promise<[Error | null, T | null]> {
    return promise
        .then((result) => {
            return [null, result] as [Error | null, T | null];
        })
        .catch((error) => {
            return [error instanceof Error ? error : new Error(String(error)), null];
        });
}
