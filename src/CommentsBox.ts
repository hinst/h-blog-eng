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
            this.ui.empty();
            jQuery.ajax(webPath + "/comments/" + encodeURIComponent(this.entryName), {
                success: (data) => this.receive(data),
                error: () => this.receiveError(),
            });
        }

        receive(data: Array<CommentData>) {
            for (const comment of data) {
            }
        }

        receiveError() {
            this.ui.text("Не удалось загрузить комментарии");
        }
    }
}
