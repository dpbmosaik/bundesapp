export function objsAreDeeplyEqual (base: object, comparison: object): boolean {
    const baseKeys = Object.keys(base);
    if (baseKeys.length !== Object.keys(comparison).length) {
        return false;
    }

    for (const key of baseKeys) {
        // the property accesses cause implicit any errors, no idea how to make them explicit
        // the value types dont matter, only their (in-)equality
        // @ts-ignore
        const baseItem = base[key];
        // @ts-ignore
        const comparisonItem = comparison[key];

        if (typeof baseItem === 'object' && typeof comparisonItem === 'object') {
            if (!objsAreDeeplyEqual(baseItem, comparisonItem)) {
                return false;
            }
        } else if (baseItem !== comparisonItem) {
            return false;
        }
    }

    return true;
}