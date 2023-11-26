//https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: number = 0;

  const debounced = (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

export const objectsAreEqualIgnoringProperty =(
  obj1: object,
  obj2: object,
  propertyToIgnore: string
) => {
  const keys1 = Object.keys(obj1).filter((key) => key !== propertyToIgnore);
  const keys2 = Object.keys(obj2).filter((key) => key !== propertyToIgnore);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if ((obj1 as any)[key] !== (obj2 as any)[key]) {
      return false;
    }
  }

  return true;
}
