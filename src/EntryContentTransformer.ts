namespace hblog {
    export class EntryContentTransformer {
        constructor(source: string) {
            const lines = source.split("\n");
            for (let i = 0; i < lines.length; i++) {
                lines[0] = lines[0].replace(/\r/g, "");
            }
        }

        result: string;
    }
}