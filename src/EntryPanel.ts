/// <reference path="Panel.ts"/>
namespace hblog {
    export class EntryPanel extends Panel {
        public entryName: string;
        entryBox: JQuery;
        commentsPanel: CommentsPanel;
        maxWidth = 1000;

        public constructor(entryName: string) {
            super();
            this.entryName = entryName;
            this.ui = Panel.createElement("div")
            this.entryBox = Panel.createElement("div");
            this.ui.append(this.entryBox);
            this.commentsPanel = new CommentsPanel(entryName);
            this.commentsPanel.ui.css("max-width", this.maxWidth + "px");
            this.ui.append(this.commentsPanel.ui);
        }

        public refresh() {
            jQuery.get(webPath + "/entry/" + encodeURIComponent(this.entryName), null, (data) => {
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
            body.css("max-width", this.maxWidth + "px");
            body.css("margin-left", "8px");
            body.css("margin-right", "8px");
            body.html(content);
            this.postProcesCodes(body);
            return body;
        }

        postProcesCodes(body: JQuery) {
            const codes = body.children("pre");
            codes.css("font-family", "Consolas, Monospace");
            codes.css("font-size", "12px");
            codes.css("border-left", "4px solid #CCC");
            codes.each((i, code) => {
                window["hljs"].highlightBlock(code);
            });
        }

        transformText(text: string): string {
            return new EntryContentTransformer(text).result;
        }

        receiveShowContent(data: string) {
            this.entryBox.append(this.makeHeader());
            this.entryBox.append(this.makeBody(data));
        }
    }
}