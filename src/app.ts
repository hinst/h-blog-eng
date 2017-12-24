namespace hblog {

    export var webPath: String;

    export class App {
        public static main(): number {
            console.log('Now running; web path is: ' + webPath);
            return 0;
        }
    }

}