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
            if (false) console.log(App.checkRoute("/h-blog"));
            this.goMainPage();
        }

        public static checkRoute(path: string): boolean {
            return document.location.pathname.indexOf(path) == 0;
        }

        mainPage: MainPage;

        goMainPage() {
            jQuery.getJSON(webPath + "/entries", null, (data) => {
                this.mainPage = new MainPage(data = data);
            });
        }
    }

}