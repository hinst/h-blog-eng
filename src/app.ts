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
            var entryName = this.pagePath.args["entryName"];
            const entryPanel = new EntryPanel(entryName);
            this.mainContainer.append(entryPanel.ui);
        }
    }

}