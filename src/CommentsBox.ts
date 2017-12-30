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
            header.text(comment.userName);
            header.addClass('w3-leftbar');
            const body = Panel.createElement("div");
            body.text(comment.content);
            const box = Panel.createElement("div");
            box.append(header);
            box.append(body);
            return box;
        }
    }
}
