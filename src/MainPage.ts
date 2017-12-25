/// <reference path="Panel.ts"/>
namespace hblog {
    export class MainPage extends Panel {
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
            for (let i = 0; i < 100; i++)
            for (const item of data) {
                const panel = Panel.createElement("div");
                panel.addClass("w3-leftbar");
                panel.css("margin-bottom", "4px");
                panel.css("padding-left", "3px");
                var hyperlink = Panel.createElement("a");
                hyperlink.text(item);
                panel.append(hyperlink);
                this.ui.append(panel);
            }
        }
    }
}