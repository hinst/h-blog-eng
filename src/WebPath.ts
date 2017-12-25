namespace hts {
    export class WebPath {

        static global: WebPath = new WebPath();
        public args: {[key: string]: string};
        public path: string;
        public query: string;

        public constructor() {
            this.path = document.location.pathname;
            this.query = document.location.search;
            this.loadArgs();
        }

        loadArgs() {
            const args = {};
            let query = this.query;
            if (query.indexOf("?") == 0)
                query = query.substring(1);
            if (query.length > 0) {
            const rows = query.split("&");
                for (const row of rows) {
                    const parts = row.split("=");
                    if (parts.length < 2)
                        parts.push("");
                    args[parts[0]] = decodeURIComponent(parts[1]);
                }
            }
            this.args = args;
        }

        public checkRouteMatch(route: string) {
            return this.path.indexOf(route) == 0;
        }
    }
}