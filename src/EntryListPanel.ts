/// <reference path="Panel.ts"/>
namespace hblog {
    export class EntryListPanel extends Panel {
        previewTextLengthLimit = 600

        constructor() {
            super();
            this.ui = Panel.createElement("div");
        }

        public refresh() {
            jQuery.getJSON(webPath + "/entries", null, (data) => {
                this.data = data;
            });            
        }

        set data(data: Array<string>) {
            this.ui.empty();
            for (const entryName of data) {
                this.renderEntry(entryName);
            }
        }

        renderEntry(entryName: string) {
            const entry = App.splitEntryName(entryName);
            const panel = Panel.createElement("div");
            panel.addClass("w3-leftbar");
            panel.css("margin-bottom", "4px");
            panel.css("padding-left", "3px");

            const dateSpan = Panel.createElement("span");
            dateSpan.text(entry.date);
            panel.append(dateSpan);
            panel.append(Panel.createElement("span").text(" "));

            const hyperlink = Panel.createElement("a");
            hyperlink.attr("href", App.getEntryPath(entryName));
            hyperlink.text(entry.title);
            panel.append(hyperlink);
            panel.append(Panel.createElement("span").text(" "));

            const previewer = Panel.createElement("div");
            previewer.css("white-space", "nowrap");
            previewer.css("overflow", "hidden");
            previewer.css("text-overflow", "ellipsis");
            previewer.css("width", "100%");
            previewer.css("color", "#555555");
            panel.append(previewer);
            jQuery.get(webPath + "/entry/" + encodeURIComponent(entryName), {length: this.previewTextLengthLimit}, (data) => {
                if (data.length == this.previewTextLengthLimit)
                    data = data + "...";
                previewer.text(data);
            });
            this.ui.append(panel);
        }
    }
}