export const submitFormOnModEnter = (
  e: React.KeyboardEvent<HTMLTextAreaElement>,
) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.currentTarget.form?.requestSubmit();
  }
};
