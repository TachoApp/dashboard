export const useLogout = () => {
  localStorage.clear();
  window.location.reload();
};