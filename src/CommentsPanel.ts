/// <reference path="Panel.ts"/>
namespace hblog {
    export class CommentsPanel extends Panel {
        public entryName: string;

        public constructor(entryName: string) {
            super();
            this.ui = Panel.createElement("div")
            this.ui.append($('<div class="g-signin2" data-onsuccess="onSignIn"></div>'));
        }
    }
}
