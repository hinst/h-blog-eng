namespace hblog {
    export class Panel {
        public constructor() {
        }

        public ui: JQuery;

        public detach() {
            if (this.ui != null)
                this.ui.remove();
        }

        public static createElement(tag: string): JQuery {
            return $("<" + tag + "></" + tag + ">");
        }

        public refresh() {
        }
    }
}