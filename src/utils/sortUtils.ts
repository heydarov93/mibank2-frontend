export const getNextSortOrder = (currentSort: string) => {
  if (currentSort === 'ASC') {
    return 'DESC'; 
  } else if (currentSort === 'DESC') {
    return ''; 
  } else {
    return 'ASC'; 
  }
};
