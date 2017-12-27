namespace hblog {
    export class EntryContentTransformer {
        constructor(source: string) {
            const lines = source.split("\n");
            let inCode = false;
            for (let i = 0; i < lines.length; i++) {
                lines[i] = lines[i].replace(/\r/g, "");
                const trimmedLine = lines[i];
                if (trimmedLine == "#hcode-typescript-begin") {
                    lines[i] = '<pre class="typescript">';
                    inCode = true;
                }
                if (trimmedLine == "#hcode-begin") {
                    lines[i] = '<pre>';
                    inCode = true;
                }
                if (!inCode)
                    lines[i] = lines[i] + "<br>";
                if (trimmedLine == "#hcode-end") {
                    lines[i] = '</pre>';
                    inCode = false;
                }
            }
            if (inCode)
                lines.push('</pre>');
            this.result = lines.join("");
        }

        result: string;
    }
}