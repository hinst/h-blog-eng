namespace hblog {
    export class Panel {
        public constructor() {
        }

        public ui: JQuery;

        public attach(target: JQuery) {
            if (this.ui != null)
                this.ui.appendTo(target);
        }

        public detach() {
            if (this.ui != null)
                this.ui.remove();
        }

        public static createDiv(): JQuery {
            return $("<div></div>");
        }
    }
}