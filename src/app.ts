/// <reference path="Panel.ts"/>
/// <reference path="WebPath.ts"/>
namespace hblog {

    export var webPath: string;
    export var pagePath: string = document.location.pathname;
    export var pageArgs: string = document.location.search;

    export class App {
        public static main(): number {
            console.log('Now running; web path is: "' + webPath + '"; page path is: "' + document.location.pathname + '"');
            const app = new App();
            app.run();
            return 0;
        }

        public pagePath = new hts.WebPath();

        run() {
            if (this.pagePath.checkRouteMatch(webPath + "/page/entry"))
                this.goEntryPage();
            else
                this.goMainPage();
            this.receiveResizeEvent();
            $(window).resize(() => this.receiveResizeEvent());
        }

        get mainContainer(): JQuery {
            return $("#mainContainer");
        }

        set title(a: string) {
            $("#titleSpan").text(a);
        }

        entryListPanel: EntryListPanel;

        goMainPage() {
            this.title = "Главная страница";
            if (this.entryListPanel == null) {
                this.entryListPanel = new EntryListPanel();
                this.mainContainer.append(this.entryListPanel.ui);
            }
            this.entryListPanel.refresh();
        }

        goEntryPage() {
            this.title = "Запись";
            var entryName = this.pagePath.args["entryName"];
            const entryPanel = new EntryPanel(entryName);
            entryPanel.refresh();
            this.mainContainer.append(entryPanel.ui);
        }

        public static getEntryPath(entryName): string {
            return webPath + "/page/entry?entryName=" + encodeURIComponent(entryName);
        }

        receiveResizeEvent() {
            const windowHeight = $(window).height();
            $("#outerContainer").css("min-height", (windowHeight - $("#copyrightBar").outerHeight()) + "px");
        }

        public static splitEntryName(entryName: string) {
            return { date: entryName.split(" ", 1)[0], title: entryName.substring(entryName.indexOf(" ") + 1) };
        }
    }

}