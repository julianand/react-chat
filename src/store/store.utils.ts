export const getMockBaseFn = async (fn: () => unknown) => {
  await new Promise((r) => setTimeout(r, 500));

  try {
    return { data: fn() };
  } catch (error) {
    return { error };
  }
};
