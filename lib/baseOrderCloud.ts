import { Filters } from "ordercloud-javascript-sdk";

export function handleError(err: any, reject: (err: string) => void) {
  if (process.env.REACT_APP_LOGGING === "true") {
    console.error(err);
  }
  reject(err);
}

export function getDefaultFilters(): Filters {
  let filters: Filters = {};
  return filters;
}

export function parseJwt(token?: string) {
  if (!token) return {};
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

export const isAnonymous = (
  initialAccessToken: string | undefined
): boolean => {
  if (typeof initialAccessToken === "undefined") {
    return false;
  }
  const parsed = parseJwt(initialAccessToken);
  console.log(parsed)
  return !!parsed.orderid;
};

export const isTokenExpired = function (token: string): boolean {
  if (!token) {
    return true;
  }
  const decodedToken = parseJwt(token);
  const currentSeconds = Date.now() / 1000;
  const currentSecondsWithBuffer = currentSeconds - 10;
  return decodedToken.exp < currentSecondsWithBuffer;
};