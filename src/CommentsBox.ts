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
            data = data.sort((a, b) => compare(b.moment, a.moment));

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
            const header = this.makeHeader(comment);
            const body = this.makeBody(comment);
            const box = Panel.createElement("div");
            box.append(header);
            box.append(body);
            box.css("margin-bottom", "8px");
            if (false) box.css("border", "1px solid lightgrey");
            box.css("box-shadow", "0px 0px 4px 1px rgba(0,0,0,0.5)");
            return box;
        }

        makeDateBox(comment: CommentData) {
            const dateBox = Panel.createElement("div");
            dateBox.text(hts.DateTime.parseV1(comment.moment).toLocaleString());
            return dateBox;
        }

        makeUserBox(comment: CommentData) {
            const userBox = Panel.createElement("span");
            userBox.text(comment.userName);
            userBox.css("margin-right", "4px");
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
            box.css("display", "inline-block");
            const img = Panel.createElement("img");
            img.attr("src", comment.picture);
            box.append(img);
            img.css("max-width", "48px");
            img.css("max-height", "48px");
            return box;
        }

        makeHeader(comment: CommentData) {
            const header = Panel.createElement("div");
            header.css("border-bottom", "1px solid lightgrey");
            header.append(this.makePictureBox(comment));
            const rightBox = Panel.createElement("div");
            rightBox.css("display", "inline-block");
            rightBox.css("margin-left", "4px");
            rightBox.css("vertical-align", "top");
            rightBox.append(this.makeUserBox(comment));
            rightBox.append(this.makeIdBox(comment));
            rightBox.append(this.makeDateBox(comment));
            rightBox.append(Panel.createElement("span").text(" "));
            rightBox.append(Panel.createElement("span").text(" "));
            header.append(rightBox);
            return header;
        }

        makeBody(comment: CommentData) {
            const body = Panel.createElement("div");
            const lines = comment.content.split("\n");
            for (const line of lines) {
                const lineBox = Panel.createElement("div");
                lineBox.text(line);
                body.append(lineBox);
            }
            if (false) body.text(comment.content);
            body.css("padding", "0 4px 4px 4px");
            return body;
        }
    }
}
