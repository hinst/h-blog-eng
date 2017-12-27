/// <reference path="Panel.ts"/>
namespace hblog {
    export class CommentsPanel extends Panel {
        public entryName: string;
        public textBox: JQuery;
        public static instance: CommentsPanel;
        public googleButton: JQuery;

        public constructor(entryName: string) {
            super();
            CommentsPanel.instance = this;
            this.ui = Panel.createElement("div");

            this.textBox = Panel.createElement("textarea");
            this.textBox.css("width", "100%");

            this.googleButton = $('<div class="g-signin2" data-onsuccess="hblog_CommentsPanel_ReceiveGoogleSignIn"></div>');
            this.googleButton.css("display", "inline-block");
            this.googleButton.css("vertical-align", "bottom");
            const sendButton = Panel.createElement("button");
            sendButton.text("Отправить");
            sendButton.addClass("w3-btn w3-black");
            sendButton.css("vertical-align", "middle");
            const toolBar = Panel.createElement("div");
            toolBar.css("text-align", "right");
            toolBar.append(this.googleButton);
            toolBar.append(sendButton);

            this.ui.append(this.textBox);
            this.ui.append(toolBar);
        }

        public receiveGoogleSignIn() {
            this.googleButton.hide();
        }
    }
}

function hblog_CommentsPanel_ReceiveGoogleSignIn() {
    hblog.CommentsPanel.instance.receiveGoogleSignIn();
}
