namespace hts {
    export class DateTime {
        // hts.DateTime.parseV1("2017-12-30 20:28:16");
        static parseV1(s: string): Date {
            const yearStr = s.split("-")[0];
            s = s.substring(yearStr.length + 1);
            const monthStr = s[0] + s[1];
            const dayStr = s[3] + s[4];
            s = s.substring(6);
            const timeParts = s.split(":");
            const hourStr = timeParts[0];
            const minuteStr = timeParts[1];
            const secondStr = timeParts[2];
            const result = new Date(Date.UTC(+yearStr, +monthStr - 1, +dayStr, +hourStr, +minuteStr, +secondStr));
            return result;
        }
    }
}