
export default function findObjectWithKey(root: any, key: string): Record<string, any> {
  function recurse(obj: any, path: string[]): any | null {
    if (!obj || typeof obj !== 'object') return null;
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return obj;
    }
    for (const k of Object.keys(obj)) {
      const v = obj[k];
      if (v && typeof v === 'object') {
        const found = recurse(v, path.concat(k));
        if (found) return found;
      }
    }

    return null;
  }

  return recurse(root, []);
}