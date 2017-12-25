/// <reference path="Panel.ts"/>
namespace hblog {
    export class MainPage extends Panel {
        constructor() {
            super();
            this.ui = Panel.createDiv();
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
                const panel = Panel.createDiv();
                panel.addClass("w3-leftbar");
                panel.css("margin-bottom", "4px");
                panel.css("padding-left", "3px");
                panel.text(item);
                console.log(this.ui);
                this.ui.append(panel);
            }
        }
    }
}