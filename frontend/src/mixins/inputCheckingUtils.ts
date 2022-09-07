export function isEmpty(value: unknown): boolean {
  return value === "";
}

//todo what is exactly included in 'alphanumeric'?
//previously space and / were not included but e.g. street names and Adresszusatz need them
export function isAlphanumeric(value: unknown, set = "default"): boolean {
  if (typeof value !== "string") {
    return false;
  }
  //no idea what these comments do
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sets: { [index: string]: any; default: RegExp; latin: RegExp } = {
    default: /^[a-zA-Z0-9À-ÖØ-öø-ÿĄąĆćĘęŁłŃńŚśŹźŻż,.'\- /]+$/,
    latin: /^[a-zA-Z0-9,.'\- /]+$/,
  };

  const selectedSet = sets.hasOwnProperty(set) ? set : "default";

  // eslint-disable-next-line security/detect-object-injection
  return sets[selectedSet].test(value);
}

//todo same is in isAlphanumeric
export function isAlpha(value: unknown, set = "default"): boolean {
  if (typeof value !== "string") {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sets: { [index: string]: any; default: RegExp; latin: RegExp } = {
    default: /^[a-zA-ZÀ-ÖØ-öø-ÿĄąĆćĘęŁłŃńŚśŹźŻż,.'\- /]+$/,
    latin: /^[a-zA-Z,.'\- /]+$/,
  };

  const selectedSet = sets.hasOwnProperty(set) ? set : "default";
  // eslint-disable-next-line security/detect-object-injection
  return sets[selectedSet].test(value);
}

export function isEmail(value: unknown): boolean {
  if (typeof value !== "string") {
    return false;
  }
  // eslint-disable-next-line security/detect-unsafe-regex
  const isEmail =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return isEmail.test(value);
}

export function isNumeric(value: unknown): boolean {
  if (typeof value !== "string") {
    return false;
  }

  const isNumber = /[0-9]/;

  return isNumber.test(value);
}

export function isUrl(value: unknown): boolean {
  if (typeof value !== "string") {
    return false;
  }
  // eslint-disable-next-line security/detect-unsafe-regex
  const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
  // eslint-disable-next-line security/detect-unsafe-regex
  const localhostDomainRE = /^localhost[:?\d]*(?:[^:?\d]\S*)?$/;
  const nonLocalhostDomainRE = /^[^\s.]+\.\S{2,}$/;

  const match = value.match(protocolAndDomainRE);
  if (!match) {
    return false;
  }
  const everythingAfterProtocol = match[1];
  if (!everythingAfterProtocol) {
    return false;
  }

  if (
    localhostDomainRE.test(everythingAfterProtocol) ||
    nonLocalhostDomainRE.test(everythingAfterProtocol)
  ) {
    return true;
  }

  return false;
}

export function isSecurePassword(value: unknown): boolean {
  if (typeof value !== "string") {
    return false;
  }
  const isSecure =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;

  return isSecure.test(value);
}

//currently allows unlimited numbers, whitespace between ever character
export function isPhoneNumber(value: unknown): boolean {
  if (typeof value !== "string") {
    return false;
  }

  const phoneNumberPattern =
    /^(?:\+\s*[0-9]{2}|0)\s*(?:\d\s*)+(?:-\s*(?:\d\s*)+)?$/;

  return phoneNumberPattern.test(value);
}