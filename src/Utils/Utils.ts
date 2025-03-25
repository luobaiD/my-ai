class Utils {
  constructor(){
    throw new Error("Utils类无法被实例化")
  }

  static deepEqual(a:any, b:any, visited = new WeakMap()):boolean {
    if (a === b) return true;
    if (typeof a !== 'object' || a === null || b === null) return false;
    if (a.constructor !== b.constructor) return false;

    if (a instanceof Date) return a.getTime() === b.getTime();
    if (a instanceof RegExp) return a.toString() === b.toString();

    if (visited.has(a)) return visited.get(a) === b;
    visited.set(a, b);

    if (a instanceof Set) {
        if (a.size !== b.size) return false;
        const bCopy = new Set(b);
        return [...a].every(itemA => {
            for (let itemB of bCopy) {
                if (this.deepEqual(itemA, itemB, visited)) {
                    bCopy.delete(itemB);
                    return true;
                }
            }
            return false;
        });
    }

    if (a instanceof Map) {
        if (a.size !== b.size) return false;
        return [...a.entries()].every(([keyA, valA]) =>
            [...b.entries()].some(([keyB, valB]) =>
                this.deepEqual(keyA, keyB, visited) && this.deepEqual(valA, valB, visited)
            )
        );
    }

    if (Array.isArray(a)) {
        if (a.length !== b.length) return false;
        return a.every((item, index) => this.deepEqual(item, b[index], visited));
    }

    const aKeys = Object.getOwnPropertyNames(a).concat(Object.getOwnPropertySymbols(a) as unknown as string[]);
    const bKeys = Object.getOwnPropertyNames(b).concat(Object.getOwnPropertySymbols(b) as unknown as string[]);
    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every(key => Reflect.has(b, key) && this.deepEqual(a[key], b[key], visited));
}
}

export default Utils