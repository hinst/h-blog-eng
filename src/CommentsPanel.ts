/// <reference path="Panel.ts"/>
namespace hblog {
    export class CommentsPanel extends Panel {
        entryName: string;
        textBox: JQuery;
        googleButton: JQuery;
        public commentsBox: CommentsBox;
        public sendButton: JQuery;
        spinner: JQuery;

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
            this.prepareSpinner(textBoxDiv);
            textBoxDiv.append(this.textBox);
            textBoxDiv.css("position", "relative");

            const sendButton = this.createSendButton();
            this.sendButton = sendButton;
            const toolBar = Panel.createElement("div");
            toolBar.css("text-align", "right");
            toolBar.css("padding-top", "3px");
            toolBar.css("padding-bottom", "3px");
            this.googleButton = this.createGoogleButton();
            toolBar.append(this.googleButton);
            toolBar.append(sendButton);

            this.ui.append(textBoxDiv);
            this.ui.append(toolBar);
            this.ui.append(this.commentsBox.ui);

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
            sendButton.attr("title", "Ctrl+Enter");
            return sendButton;
        }

        sendComment() {
            const requestData = {
                token: App.instance.googleUser.getAuthResponse().id_token,
                topic: this.entryName,
                comment: this.textBox.val() as string,
            };
            if (requestData.comment.length > 0) {
                this.sendButton.addClass("spinner");
                jQuery.ajax(webPath + "/postComment", {
                    type: "POST",
                    data: JSON.stringify(requestData),
                    contentType: "application/json",
                    complete: (jqXHR, status) => this.receiveSendCommentResult(jqXHR, status),
                });
            }
        }

        receiveSendCommentResult(jqXHR: JQuery.jqXHR, status: string) {
            
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

        prepareSpinner(parent: JQuery) {
            const outer = Panel.createElement("div");
            outer.css("display", "table");
            outer.css("width", "100%");
            outer.css("height", "100%");
            outer.css("position", "absolute");
            const middle = Panel.createElement("div");
            middle.css("display", "table-cell");
            middle.css("vertical-align", "middle");
            middle.append(App.instance.createSpinner());
            outer.append(middle);
            this.spinner = outer;
            parent.append(this.spinner);
        }
    }
}
