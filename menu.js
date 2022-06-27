"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mbsep = exports.mbitem = exports.right = exports.menubar = exports.menusep = exports.submenu = exports.menucb = exports.menuitem = exports.wait = exports.menu = void 0;
const galho_1 = require("galho");
const s_1 = require("galho/s");
const inutil_1 = require("inutil");
const galhui_1 = require("./galhui");
const hover_1 = require("./hover");
const wait_1 = require("./wait");
function menu(items) { return (0, galho_1.div)("_ menu", (0, galho_1.g)("table", 0, items)); }
exports.menu = menu;
/** */
const wait = (callback) => (0, inutil_1.call)((0, galho_1.g)("tr", 0, (0, galho_1.g)("td", 0, (0, wait_1.wait)(1 /* out */)).prop("colSpan", 4)), tr => (0, wait_1.waiter)(tr, callback));
exports.wait = wait;
/**menu item */
const menuitem = (i, text, action, side) => (0, galho_1.g)("tr", "i" /* item */, [
    (0, galho_1.g)("td", 0, (0, galhui_1.icon)(i)),
    (0, galho_1.g)("td", 0, text),
    (0, galho_1.g)("td", "sd" /* side */, side),
    (0, galho_1.g)("td")
]).on("click", action);
exports.menuitem = menuitem;
/**checkbox */
function menucb(checked, text, toggle, disabled, id = (0, inutil_1.uuid)(4)) {
    let input = (0, galho_1.g)("input", { id, checked, disabled, indeterminate: checked == null, type: "checkbox" });
    toggle && input.on("input", () => toggle.call(input, input.e.checked));
    return (0, galho_1.g)("tr", (0, galho_1.cl)("i", disabled && "ds" /* disabled */), [
        (0, galho_1.g)("td", 0, input.on("click", e => e.stopPropagation())),
        (0, galho_1.g)("td", 0, (0, galho_1.g)("label", 0, text).prop("htmlFor", id)),
        (0, galho_1.g)("td"), (0, galho_1.g)("td")
    ]);
}
exports.menucb = menucb;
const submenu = (i, text, items) => (0, inutil_1.call)((0, galho_1.g)("tr", "i" /* item */, [
    (0, galho_1.g)("td", 0, (0, galhui_1.icon)(i)),
    (0, galho_1.g)("td", 0, text),
    (0, galho_1.g)("td"),
    (0, galho_1.g)("td", 0, (0, galhui_1.icon)("menuR"))
]), e => {
    let mn;
    e.on("click", () => {
        (0, s_1.is)(e.tcls("on" /* on */), '.' + "on" /* on */) ?
            (0, hover_1.fluid)((0, s_1.rect)(e), (mn ||= (0, galho_1.g)("table", "menu" /* menu */, items)).addTo(e)) :
            mn.remove();
    });
});
exports.submenu = submenu;
const menusep = () => (0, galho_1.g)("tr").cls("div" /* separator */);
exports.menusep = menusep;
/** */
const menubar = (...items) => (0, galho_1.div)("_ bar", items);
exports.menubar = menubar;
/** */
const right = () => (0, galho_1.div)("r" /* right */);
exports.right = right;
const mbitem = (i, text, action) => (0, galho_1.g)("button", "i", [(0, galhui_1.icon)(i), text]).on("click", action);
exports.mbitem = mbitem;
/**menubar separator */
const mbsep = () => (0, galho_1.g)("hr");
exports.mbsep = mbsep;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQWlEO0FBQ2pELCtCQUFtQztBQUNuQyxtQ0FBOEM7QUFDOUMscUNBQXdEO0FBQ3hELG1DQUFnQztBQUNoQyxpQ0FBMkU7QUFLM0UsU0FBZ0IsSUFBSSxDQUFDLEtBQWlCLElBQUksT0FBTyxJQUFBLFdBQUcsRUFBQyxRQUFRLEVBQUUsSUFBQSxTQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUF2RixvQkFBdUY7QUFFdkYsTUFBTTtBQUNDLE1BQU0sSUFBSSxHQUFHLENBQUMsUUFBaUIsRUFBRSxFQUFFLENBQ3hDLElBQUEsYUFBSSxFQUFDLElBQUEsU0FBQyxFQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBQSxTQUFDLEVBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFBLFdBQUssY0FBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBQSxhQUFNLEVBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFEcEYsUUFBQSxJQUFJLFFBQ2dGO0FBRWpHLGVBQWU7QUFDUixNQUFNLFFBQVEsR0FBRyxDQUFDLENBQU8sRUFBRSxJQUFTLEVBQUUsTUFBYyxFQUFFLElBQUssRUFBRSxFQUFFLENBQUMsSUFBQSxTQUFDLEVBQUMsSUFBSSxrQkFBVTtJQUNyRixJQUFBLFNBQUMsRUFBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUEsYUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLElBQUEsU0FBQyxFQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDO0lBQ2hCLElBQUEsU0FBQyxFQUFDLElBQUksbUJBQVUsSUFBSSxDQUFDO0lBQ3JCLElBQUEsU0FBQyxF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