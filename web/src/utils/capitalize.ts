export const capitalize = (str?: string) => str && str.trim()[0].toUpperCase() + str.slice(1);

export const splitCapitalize = (str: string) =>
  capitalize(
    str
      .split(/(?=[A-Z])/)
      ?.join(' ')
      .toLowerCase()
  );
