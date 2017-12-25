/// <reference path="Panel.ts"/>
namespace hblog {

    export var webPath: string;
    export var pagePath: string = document.location.href;

    export class App {
        public static main(): number {
            console.log('Now running; web path is: "' + webPath + '"; page path is: "' + document.location.pathname + '"');
            const app = new App();
            app.run();
            return 0;
        }

        run() {
            this.goMainPage();
        }

        public static checkRoute(path: string): boolean {
            return document.location.pathname.indexOf(path) == 0;
        }

        mainPage: MainPage;

        get mainContainer(): JQuery {
            return $("#mainContainer");
        }

        goMainPage() {
            if (this.mainPage == null) {
                this.mainPage = new MainPage();
                this.mainContainer.append(this.mainPage.ui);
            }
            this.mainPage.refresh();
        }

        _activePanel: Panel;

        set activePanel(a: Panel) {
            this._activePanel = a;
            //this._activePanel.attach(this.mainContainer);
        }
    }

}