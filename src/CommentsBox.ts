/// <reference path="Panel.ts"/>
namespace hblog {
    export class CommentsBox extends Panel {
        entryName: string;

        public constructor(entryName: string) {
            super();
            this.entryName = entryName;
            this.ui = Panel.createElement("div");
        }

        public refresh() {
            jQuery.ajax(webPath + "/comments/" + encodeURIComponent(this.entryName), {
                success: (data) => this.receive(data),
                error: () => this.receiveError(),
            });
        }

        receive(data: Array<CommentData>) {
            function compare(a, b) {
                if (a < b) return -1;
                if (a == b) return 0;
                return 1;
            }
            data = data.sort((a, b) => compare(a.moment, b.moment));

            this.ui.empty();
            for (const comment of data) {
                const box = this.makeCommentBox(comment);
                this.ui.append(box);
            }
        }

        receiveError() {
            this.ui.text("Не удалось загрузить комментарии");
        }

        makeCommentBox(comment: CommentData): JQuery {
            const header = Panel.createElement("div");
            header.css("border-top", "1px solid lightgrey");
            header.append(this.makePictureBox(comment));
            header.append(this.makeDateBox(comment));
            header.append(Panel.createElement("span").text(" "));
            header.append(this.makeUserBox(comment));
            header.append(Panel.createElement("span").text(" "));
            header.append(this.makeIdBox(comment));
            const body = Panel.createElement("div");
            body.text(comment.content);
            const box = Panel.createElement("div");
            box.append(header);
            box.append(body);
            return box;
        }

        makeDateBox(comment: CommentData) {
            const dateBox = Panel.createElement("span");
            dateBox.css("background-color", App.instance.backgroundSubColor);
            dateBox.css("vertical-align", "top");
            dateBox.css("display", "inline-block");
            dateBox.text(comment.moment);
            dateBox.css("padding", "0 4px 0 4px");
            return dateBox;
        }

        makeUserBox(comment: CommentData) {
            const userBox = Panel.createElement("span");
            userBox.text(comment.userName + " ");
            return userBox;
        }

        makeIdBox(comment: CommentData) {
            const idBox = Panel.createElement("span");
            idBox.text("u" + comment.userRowId);
            idBox.css("display", "inline-block");
            idBox.css("background-color", App.instance.backgroundSubColor);
            idBox.css("padding", "0 4px 0 4px");
            return idBox;
        }

        makePictureBox(comment: CommentData) {
            const box = Panel.createElement("div");
            box.css("display", "inline-box");
            const img = Panel.createElement("img");
            img.attr("src", comment.picture);
            box.append(img);
            return box;
        }
    }
}
