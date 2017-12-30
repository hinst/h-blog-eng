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
            App.instance = app;
            app.run();
            return 0;
        }

        public pagePath = new hts.WebPath();
        public static instance: App;
        backgroundSubColor = "#f1f1f1";
        googleSignInSuccessReceivers: Array<(googleUser: hts.GoogleUser) => void> = [];
        googleUser: hts.GoogleUser;

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

        public receiveGoogleSignIn(googleUser: hts.GoogleUser) {
            this.googleUser = googleUser;
            console.log("googleUser: '" + googleUser.getBasicProfile().getName() + "'");
            for (const receiver of this.googleSignInSuccessReceivers) {
                receiver(googleUser);
            }
        }

        public clickGoogleSignIn() {
            $("#googleSignInButton").children(":first").trigger("click");
        }

        private createSpinner() {
            return $('<div class="spinner"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div>');
        }

        public createSpinnerOverlay() {
            const box = Panel.createCenterOverlay(this.createSpinner());
            box.css("background-color", "#88888888");
            return box;
        }
    }

}

function hblog_receiveGoogleSignIn(googleUser: hts.GoogleUser) {
    hblog.App.instance.receiveGoogleSignIn(googleUser);
};