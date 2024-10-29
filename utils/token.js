export const saveTokens = (accessToken, refreshToken) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", accessToken);
    if (refreshToken) {
      localStorage.setItem("refresh_token", refreshToken);
    }
  }
};

export const getClientSideCookie = (name) => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];

  return cookieValue;
};
