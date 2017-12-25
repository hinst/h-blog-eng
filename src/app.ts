/// <reference path="Panel.ts"/>
namespace hblog {

    export var webPath: string;
    export var pagePath: string = document.location.pathname;

    export class App {
        public static main(): number {
            console.log('Now running; web path is: "' + webPath + '"; page path is: "' + document.location.pathname + '"');
            const app = new App();
            app.run();
            return 0;
        }

        run() {
            if (App.checkRoute(webPath + "/page/entry"))
                this.goEntryPage();
            this.goMainPage();
        }

        public static checkRoute(path: string): boolean {
            return document.location.pathname.indexOf(path) == 0;
        }

        get mainContainer(): JQuery {
            return $("#mainContainer");
        }

        entryListPanel: EntryListPanel;

        goMainPage() {
            if (this.entryListPanel == null) {
                this.entryListPanel = new EntryListPanel();
                this.mainContainer.append(this.entryListPanel.ui);
            }
            this.entryListPanel.refresh();
        }

        goEntryPage() {
            const entryPanel = new EntryPanel("");
        }
    }

}