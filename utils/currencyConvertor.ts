export const fetchUSD = async (curr: number, setRate: () => void) => {
  try {
    const response = await fetch(
      `https://api.frankfurter.app/latest?amount=${curr}&from=USD&to=INR`
    );
    const data = await response.json();
    setRate(data.rates.INR);
  } catch (error) {
    console.error("Error:", error);
  }
};
