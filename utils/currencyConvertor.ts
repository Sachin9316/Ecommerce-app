export const fetchUSD = async (curr: number) => {
  try {
    const response = await fetch(
      `https://api.frankfurter.app/latest?amount=${curr}&from=USD&to=INR`
    );
    const data = await response.json();
    return data.rates.INR;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const staticConvertor = (amt: number) => {
  let usd = 85;
  return amt * usd
};
