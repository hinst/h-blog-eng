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

            const titleBar = Panel.createElement("div");
            titleBar.text("Комментарии");
            titleBar.css("background-color", App.instance.backgroundSubColor);
            this.ui.append(titleBar);

            this.textBox = Panel.createElement("textarea");
            this.textBox.css("width", "100%");

            const sendButton = this.createSendButton();
            const toolBar = Panel.createElement("div");
            toolBar.css("text-align", "right");
            toolBar.css("padding-top", "3px");
            toolBar.css("padding-bottom", "3px");
            this.googleButton = this.createGoogleButton();
            toolBar.append(this.googleButton);
            toolBar.append(sendButton);

            this.ui.append(this.textBox);
            this.ui.append(toolBar);

            App.instance.googleSignInSuccessReceivers.push((a) => this.receiveGoogleSignInSuccess(a));
        }

        receiveGoogleSignInSuccess(googleUser: hts.GoogleUser) {
            this.googleButton.hide();
        }

        public receiveGoogleSignIn() {
            this.googleButton.hide();
        }

        public createGoogleButton(): JQuery {
            const googleButton = Panel.createElement("button");
            googleButton.text("Войти в Google");
            googleButton.addClass("w3-btn w3-black");
            googleButton.css("vertical-align", "top");
            googleButton.css("margin-right", "3px");
            googleButton.on("click", () => {
                App.instance.clickGoogleSignIn();
            });
            return googleButton;
        }

        public createSendButton(): JQuery {
            const sendButton = Panel.createElement("button");
            sendButton.text("Отправить");
            sendButton.addClass("w3-btn w3-black");
            sendButton.css("vertical-align", "top");
            return sendButton;
        }
    }
}

function hblog_CommentsPanel_ReceiveGoogleSignIn() {
    hblog.CommentsPanel.instance.receiveGoogleSignIn();
}
