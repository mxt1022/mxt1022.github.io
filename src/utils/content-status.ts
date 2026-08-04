const activeStatusPattern = /(进行中|持续|编写中|更新中|训练中)/;

export const getActiveContentStatus = (status?: string) => {
  const label = status?.trim();
  return label && activeStatusPattern.test(label) ? label : null;
};
