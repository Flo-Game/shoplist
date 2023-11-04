import jwtDecode from "jwt-decode";

export function retrieveJWT(): string | null {
  return localStorage.getItem("jwt");
}

export function storeJWT(jwt: string) {
  localStorage.setItem("jwt", jwt);
}

export function removeJWT() {
  localStorage.removeItem("jwt");
}

export function getLoginInfoFromJWT(jwt: string | null): { userId: string; roles: "a"|"u"} | null {
  if (!jwt) {
    return null;
  }
  const payload: any = jwtDecode(jwt);
  const userId = payload.sub;
  const roles = payload.roles;
  if (!userId || !roles) {
    return null;
  }
  return { userId, roles };
}
