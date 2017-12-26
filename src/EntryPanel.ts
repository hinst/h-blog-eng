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
            headHyperLink.text(this.entryName);
            headHyperLink.attr("href", App.getEntryPath(this.entryName));
            return headHyperLink;
        }

        makeHeader() {
            const header = Panel.createElement("h1");
            header.addClass("w3-panel w3-light-grey");
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
            return body;
        }

        transformText(text: string): string {
            text = hts.WebPath.escapeHtml(text).replace(/\n/g, "<br/>");
            text = text.replace(/#hcode-begin/g, "<code>").replace(/#hcode-end/g, "</code>");
            return text;
        }

        receiveShowContent(data: string) {
            this.ui.append(this.makeHeader());
            this.ui.append(this.makeBody(data));
        }
    }
}