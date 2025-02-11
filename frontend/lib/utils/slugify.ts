export const createSlug = (name: string, id: string) => {
    return `${name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')}-${id}`;
  };