export const clearUserStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
    localStorage.removeItem('userBooks');
    localStorage.removeItem('favorites');
    localStorage.removeItem('wishlist');
    console.log('User storage cleared');
  }
};

export const resetTestAccounts = () => {
  if (typeof window !== 'undefined') {
    clearUserStorage();
    console.log('Test accounts reset - please login again');
  }
};
