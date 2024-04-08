import $ from "jquery";
import { socket } from "./main.js";

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
    $(".rejouerMenu").hide();
    console.log(`path ${path}`);
    const route = this.routes.find((route) => {
      return route.path === path;
    });
    if (route) {
      if (this.currentRoute) {
        this.currentRoute.view.hide();
      }
      this.currentRoute = route;
      route.view.show();
      if (route.path === "/game") {
        socket.emit("startGame", {
          login: socket.login,
          gameToJoin: socket.gameToJoin,
        });
      } else {
        console.log("pas partie");
        socket.emit("noGame");
      }
      if (!skipPushState) {
        window.history.pushState(null, null, path);
      }
    }
  }
}
