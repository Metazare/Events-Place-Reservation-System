export const formatToMoney = (value) => {
    if (!value) return "0.00";

    // Attempt to convert the value to a number
    const numberValue = Number(value);

    if (isNaN(numberValue)) {
        throw new Error(
            "Input must be a valid number or a convertible string."
        );
    }

    return numberValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};
