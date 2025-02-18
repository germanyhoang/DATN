export function truncateStringFunction(str: string, maxLength: number) {
    if (str?.length > maxLength) {
        return str.substring(0, maxLength) + '...';
    } else {
        return str;
    }
}