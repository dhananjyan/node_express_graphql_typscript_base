export const normalizeFilteredInput = (input: Object) => Object.fromEntries(
    Object.entries(input).filter(([_, v]) => v !== undefined)
);
