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

        public createCenterOverlay(child: JQuery) {
            const outer = Panel.createElement("div");
            outer.css("display", "table");
            outer.css("width", "100%");
            outer.css("height", "100%");
            outer.css("position", "absolute");
            const middle = Panel.createElement("div");
            middle.css("display", "table-cell");
            middle.css("vertical-align", "middle");
            middle.append(child);
            outer.append(middle);
        }
    }
}