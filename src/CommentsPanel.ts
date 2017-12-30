/// <reference path="Panel.ts"/>
namespace hblog {
    export class CommentsPanel extends Panel {
        entryName: string;
        textBox: JQuery;
        googleButton: JQuery;
        commentsBox: CommentsBox;
        spinner: JQuery;
        senderNameBox: JQuery;

        public constructor(entryName: string) {
            super();
            this.entryName = entryName;
            this.ui = Panel.createElement("div");

            const titleBar = Panel.createElement("div");
            titleBar.text("Комментарии");
            titleBar.css("background-color", App.instance.backgroundSubColor);
            this.ui.append(titleBar);

            this.commentsBox = new CommentsBox(this.entryName);
            this.commentsBox.ui.css("margin-top", "4px");

            const textBoxDiv = Panel.createElement("div");
            this.textBox = Panel.createElement("textarea");
            this.textBox.css("width", "100%");
            this.textBox.keydown((event) => {
                if (event.ctrlKey && event.keyCode == 13)
                    this.sendComment();
            });
            this.spinner = App.instance.createSpinnerOverlay();
            this.spinner.hide();
            textBoxDiv.append(this.spinner);
            textBoxDiv.append(this.textBox);
            textBoxDiv.css("position", "relative");

            this.senderNameBox = this.makeSenderNameBox();
            const sendButton = this.createSendButton();
            const toolBar = Panel.createElement("div");
            toolBar.css("text-align", "right");
            toolBar.css("padding-top", "3px");
            toolBar.css("padding-bottom", "3px");
            this.googleButton = this.createGoogleButton();
            toolBar.append(this.senderNameBox);
            toolBar.append(this.googleButton);
            toolBar.append(sendButton);

            this.ui.append(textBoxDiv);
            this.ui.append(toolBar);
            this.ui.append(this.commentsBox.ui);

            App.instance.googleSignInSuccessReceivers.push((a) => this.receiveGoogleSignInSuccess(a));
        }

        private receiveGoogleSignInSuccess(googleUser: hts.GoogleUser) {
            this.googleButton.hide();
            this.senderNameBox.text(googleUser.getBasicProfile().getName());
        }

        private createGoogleButton(): JQuery {
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

        private createSendButton(): JQuery {
            const sendButton = Panel.createElement("button");
            sendButton.text("Отправить");
            sendButton.addClass("w3-btn w3-black");
            sendButton.css("vertical-align", "top");
            sendButton.on("click", () => this.sendComment());
            sendButton.attr("title", "Ctrl+Enter");
            return sendButton;
        }

        private sendComment() {
            const requestData = {
                token: App.instance.googleUser.getAuthResponse().id_token,
                topic: this.entryName,
                comment: this.textBox.val() as string,
            };
            this.spinner.show();
            if (requestData.comment.length > 0) {
                jQuery.ajax(webPath + "/postComment", {
                    type: "POST",
                    data: JSON.stringify(requestData),
                    contentType: "application/json",
                    complete: (jqXHR, status) => this.receiveSendCommentResult(jqXHR, status),
                });
            }
        }

        private receiveSendCommentResult(jqXHR: JQuery.jqXHR, status: string) {
            this.spinner.hide();
            if (status == "success") {
                this.textBox.val("");
                this.commentsBox.refresh();
            } else {
                alert("Не удалось добавить комментарий");
            }
        }

        public refresh() {
            this.commentsBox.refresh();
        }

        private makeSenderNameBox() {
            const logOut = Panel.createElement("a");
            logOut.text("выйти");
            const box = Panel.createElement("div");
            box.css("display", "inline-block");
            box.css("padding", "8px 8px 0 0");
            return box;
        }
    }
}
