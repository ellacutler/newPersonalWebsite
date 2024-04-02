export function convertUnixTimestampToLongDate(unixTimestamp) {
    
    const date = new Date(unixTimestamp *1000); // Convert to milliseconds
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    console.log(date.toLocaleDateString(undefined, options));
    return date.toLocaleDateString(undefined, options);
}
