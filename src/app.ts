namespace hblog {

    export var webPath: String;

    export class App {
        public static main(): number {
            console.log('Now running; web path is: "' + webPath + '"; page path is: "' + document.location.pathname + '"');
            return 0;
        }
    }

}