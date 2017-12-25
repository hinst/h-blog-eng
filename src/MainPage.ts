/// <reference path="Panel.ts"/>
namespace hblog {
    export class MainPage extends Panel {
        constructor(data: Array<string>) {
            super();
            this.ui = Panel.createDiv();
            for (const item of data) {
                const panel = Panel.createDiv();
                panel.addClass("w3-container w3-border-left");
                panel.text(item);
                this.ui.append(panel);
            }
        }
    }
}