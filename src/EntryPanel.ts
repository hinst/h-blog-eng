/// <reference path="Panel.ts"/>
namespace hblog {
    export class EntryPanel extends Panel {
        public entryName: string;

        public constructor(entryName: string) {
            super();
            this.entryName = entryName;
            this.ui = Panel.createElement("div")
        }

        public refresh() {
            jQuery.get(webPath + "/entry/" + this.entryName, null, (data) => {
                this.receiveShowContent(data);
            });
        }

        makeHeadHyperlink() {
            const headHyperLink = Panel.createElement("a");
            headHyperLink.text(App.splitEntryName(this.entryName).title);
            headHyperLink.attr("href", App.getEntryPath(this.entryName));
            return headHyperLink;
        }

        makeHeadDate() {
            const headDate = Panel.createElement("span");
            headDate.text(App.splitEntryName(this.entryName).date);
            return headDate;
        }

        makeHeader() {
            const header = Panel.createElement("h1");
            header.addClass("w3-panel w3-light-grey");
            header.append(this.makeHeadDate());
            header.append(Panel.createElement("span").text(" "));
            header.append(this.makeHeadHyperlink());
            header.css("margin-top", "8px");
            header.css("margin-bottom", "8px");
            return header;
        }   

        makeBody(data: string) {
            const content = this.transformText(data);
            const body = Panel.createElement("div");
            body.css("max-width", "1000px");
            body.html(content);
            const codes = body.children("pre");
            codes.css("font-family", "Consolas, Monospace");
            codes.css("font-size", "12px");
            codes.each((i, code) => {
                $(code).children("br:first").remove();
                code.innerHTML = code.innerHTML.trim().replace(/<br>/g, "\n");
                window["hljs"].highlightBlock(code);
            });
            return body;
        }

        transformText(text: string): string {
            text = hts.WebPath.escapeHtml(text).replace(/\n/g, "<br>");
            text = text.replace(/#hcode-typescript-begin/g, '<pre class="typescript">')
            text = text.replace(/#hcode-begin/g, "<pre>").replace(/#hcode-end/g, "</pre>");
            return text;
        }

        receiveShowContent(data: string) {
            this.ui.append(this.makeHeader());
            this.ui.append(this.makeBody(data));
        }
    }
}