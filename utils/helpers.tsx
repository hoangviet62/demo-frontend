import moment from "moment";

export function formatLocalTime(
    timeInString: string,
    format = 'YYYY-MM-DD HH:mm:ss'
) {
    if (timeInString) {
        const str = moment(timeInString);

        return str.format(format);
    }
}
