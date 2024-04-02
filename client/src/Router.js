import $ from "jquery";

export default class Router {
  static routes = [];
  static currentRoute;

  static #setInnerLinks;

  static setInnerLinks(setInnerLinks) {
    this.#setInnerLinks = setInnerLinks;
    $(".innerLink", this.#setInnerLinks).on("click", (event) => {
      event.preventDefault();
      console.log("innerLink");
      Router.navigate($(event.currentTarget).attr("href"));
    });
  }

  static navigate(path, skipPushState = false) {
    console.log(`path ${path}`);
    const route = this.routes.find((route) => {
      return route.path === path;
    });
    console.log(`route2 ${route}`);
    if (route) {
      if (this.currentRoute) {
        this.currentRoute.view.hide();
      }
      this.currentRoute = route;
      route.view.show();
      if (route.path === "/game") {
        /*
         * Emit le start de la game
         */
      }
      if (!skipPushState) {
        window.history.pushState(null, null, path);
      }
    }
  }
}
