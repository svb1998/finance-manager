/**
 * Given a backgroundColor, determine the text color depending on the lumninance of the background color.
 * @param backgroundColor
 * @returns The text color to use.
 */
export function setTextColor(backgroundColor: string | undefined) {
    if (!backgroundColor) return "black";

    const color = backgroundColor.replace("#", "");

    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    const luminance = (r * 0.299 + g * 0.587 + b * 0.114) / 255;

    if (luminance > 0.5) {
        return "black";
    } else {
        return "white";
    }
}
