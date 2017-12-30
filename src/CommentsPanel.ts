/// <reference path="Panel.ts"/>
namespace hblog {
    export class CommentsPanel extends Panel {
        entryName: string;
        textBox: JQuery;
        googleButton: JQuery;
        commentsBox: CommentsBox;

        public constructor(entryName: string) {
            super();
            this.entryName = entryName;
            this.ui = Panel.createElement("div");

            const titleBar = Panel.createElement("div");
            titleBar.text("Комментарии");
            titleBar.css("background-color", App.instance.backgroundSubColor);
            this.ui.append(titleBar);

            this.commentsBox = new CommentsBox(this.entryName);
            this.commentsBox.refresh();

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
            this.ui.append(this.commentsBox.ui);
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
            sendButton.on("click", () => this.sendComment());
            return sendButton;
        }

        sendComment() {
            const requestData = {
                token: App.instance.googleUser.getAuthResponse().id_token,
                topic: this.entryName,
                comment: this.textBox.val() as string,
            };
            jQuery.ajax(webPath + "/postComment", {
                type: "POST",
                data: JSON.stringify(requestData),
                contentType: "application/json",
                complete: (jqXHR, status) => this.receiveSendCommentResult(jqXHR, status),
            });
        }

        receiveSendCommentResult(jqXHR: JQuery.jqXHR, status: string) {
            if (status == "success") {
                this.textBox.val("");
            } else {
                alert("Не удалось добавить комментарий");
            }
        }
    }
}
