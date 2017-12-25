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
            console.log(data.length);
            this.ui.empty();
            for (const item of data) {
                const panel = Panel.createElement("div");
                panel.addClass("w3-leftbar");
                panel.css("margin-bottom", "4px");
                panel.css("padding-left", "3px");
                var hyperlink = Panel.createElement("a");
                hyperlink.text(item);
                panel.append(hyperlink);
                console.log(this.ui);
                this.ui.append(panel);
            }
        }
    }
}