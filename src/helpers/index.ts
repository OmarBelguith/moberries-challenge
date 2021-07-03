import axios from "axios";

export const creditCardValidator = (value: string) => {
  return value.length > 16 || !/^[0-9 ]*$/.test(value.trim());
};
export const cvvCodeValidator = (value: string) => {
  return value.length > 3 || !/^[0-9]*$/.test(value.trim());
};
export const valid_credit_card = (value: string) => {
  // Takes a credit card string value and returns true on valid number
  // Accept only digits, dashes or spaces
  if (/[^0-9-\s]+/.test(value)) return false;

  // The Luhn Algorithm. It's so pretty.
  let nCheck = 0,
    bEven = false;
  value = value.replace(/\D/g, "");

  for (var n = value.length - 1; n >= 0; n--) {
    var cDigit = value.charAt(n),
      nDigit = parseInt(cDigit, 10);

    if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

    nCheck += nDigit;
    bEven = !bEven;
  }

  return nCheck % 10 === 0;
};

export const requestForger = async (
  f: Function,
  params: any[],
  showError: boolean = true
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await f(...params);
      return resolve(data);
    } catch (e) {
      let error, message;
      if (showError && axios.isAxiosError(e) && e.response) {
        error = "Error " + e.response.status;
        message = e.response.data.message;
        return Promise.reject({ error, message });
      }
      error = e?.request?.message || "Error";
      message = e.response?.message || "There was an Unexpected Error";
      return reject({ error, message });
    }
  });
};
