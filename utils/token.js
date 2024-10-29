export const saveTokens = (accessToken, refreshToken) => {
   if (typeof window !== "undefined") {
     localStorage.setItem("token", accessToken);
     if (refreshToken) {
       localStorage.setItem("refresh_token", refreshToken);
     }
   }
 };