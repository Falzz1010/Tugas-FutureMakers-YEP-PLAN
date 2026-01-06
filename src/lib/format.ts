const LOCALE = "id-ID";
const CURRENCY = "IDR";

export const toNumber = (value: unknown): number => Number(value) || 0;

export const formatCurrency = (value: number | string) => {
    const num = typeof value === "string" ? parseRawPrice(value) : value;

    // Extra safety, though usage of parseRawPrice/toNumber usually handles it
    if (Number.isNaN(num)) return "Rp.0";

    return new Intl.NumberFormat(LOCALE, {
        style: "currency",
        currency: CURRENCY,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(num).replace("Rp", "Rp.");
};

export const parseRawPrice = (formattedPrice: string): number => {
    const raw = formattedPrice.replace(/[^\d-]/g, "");
    return toNumber(raw);
};

export const formatDate = (date: Date = new Date()) => {
    return new Intl.DateTimeFormat(LOCALE, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(date);
};
