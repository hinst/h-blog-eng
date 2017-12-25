/// <reference path="Panel.ts"/>
namespace hblog {
    export class EntryPanel extends Panel {
        public constructor(entryName: string) {
            super();
            this.ui = Panel.createElement("div")
        }
    }
}