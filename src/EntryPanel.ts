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

        receiveShowContent(data) {
        }
    }
}