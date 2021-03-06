import { ANYElement, cl, div, g, Render, S, svg, toSVG, wrap } from "galho";
import { isSelection } from "galho/s";
import { isS } from "inutil";

declare global {
  namespace GalhoUI {
    interface Words {
      cancel?: str;
      confirm?: str;
      search?: str;
      yes?: str;
      no?: str;
      camera?: str;
      save?: str;
    }
    interface Settings {
      // /**class */
      // c: str;

      /**icon scale */
      iconS?: int;
      delay?: int;

      /**icons */
      i?: Dic<Icon> & {
        /**dropdown */
        dd: Icon;
      };
      rem: float

      null?(): Icon;
      /**return value formatted*/
      fmt?(value: any, pattern: str, opts?: Dic): any;
    }

    // interface Theme {
    // }
  }
}
export type FormatType = "s" | "d" | "b" | "n";

export type Classes =
  "mnb";
/** classes */
export const enum C {
  full = "full",
  disabled = "ds",
  //--components
  //----basic
  icon = "c",
  button = "bt",
  //----composite
  column = "col",
  row = "row",
  pagging = "pag",
  form = "f",
  message = "ms",
  buttons = "bs",
  heading = "heading",
  accordion = "ac",
  dropdown = "dd",
  close = "cl",
  tab = "ta",
  menu = "menu",
  menubar = "bar",
  input = "in",
  link = "lk",
  loading = "ld",
  lever = "lv",
  container = "container",
  modalArea = "mda",
  modal = "modal",
  tree = "tree",
  table = "tb",
  grid = "grd",
  placeholder = "ph",
  select = "sel",
  label = "lb",
  checkbox = "cb",
  switch = "sw",
  //-------------------generic
  group = "g",
  item = "i",
  head = "hd",
  body = "bd",
  foot = "ft",
  side = "sd",
  main = "ma",
  separator = "div",
  //-------------------state
  bordered = "brd",
  on = "on",
  // selected = "sd",
  current = "crt",
  inline = "inline",
  off = "off",
  fileSelector /** border  in px */ = "fileSelector",
  extra = "extra",
  options = "opts",
  context = "context",
  mobile = "m"
}

/**settings */
export const $: GalhoUI.Settings = {
  // c: "_",
  iconS: 24,
  delay: 500,
  rem: 14
}
/**words */
export const w: GalhoUI.Words = {}

export type Child = str | int | float | S<ANYElement> | Render;

export function word(key: str) { return key; }
export function sentence(format: str) {
  const exp = /\{\w+\}/;
  format.replace(exp, (v) => w[v.slice(1, v.length - 1)]);
}
//-----------------------------------------utils
export const enum VAlign {
  top = 't',
  middle = 'm',
  bottom = 'b'
}

export const enum HAlign {
  left = 'l',
  center = 'c',
  right = 'r',
  justify = "j"
}
export const enum Ori {
  h = 'h',
  v = 'v'
}
export const enum Size {
  xl = "xl",
  l = "l",
  normal = "n",
  n = "n",
  s = "s",
  xs = "xs"
}
export const enum Color {
  error = "_e",
  main = "_i",
  /** secundary */
  side = "_s",
  normal = "_m",
  warning = "_w",
  accept = "_a"
}
export const body = new S(document.body);
export const doc = new S(document as any);

/**css class */
export const cc = (...cls: str[]) => `._.${cls.join('-')}`;
/**html class */
export const hc = (...cls: str[]) => ['_', cls.join('-')];

export type Icon = { d: str, c?: str | Color } | str | S<SVGSVGElement> | 0;
export function icon(dt: Icon, size?: Size): S<SVGSVGElement>;
export function icon(d: Icon, s?: Size) {
  if (d) {
    if (isS(d)) d = { d };
    else if (isSelection(d))
      return d.cls(cl(C.icon, s));
    return svg('svg', {
      fill: d.c || "currentColor",
      viewBox: `0 0 ${$.iconS} ${$.iconS}`,
    }, svg('path', { d: d.d })).cls(cl(C.icon, s));
  }
}

export type click = (this: HTMLButtonElement, e: MouseEvent) => any;

export type ButtonType = "button" | "submit" | "clear";
export const button = (text: Child, click?: click, type: ButtonType = "button") =>
  g("button", hc(C.button), text).prop("type", type).on("click", click);
export const link = (text: Child, href?: str) => g("a", C.button, text).prop("href", href);

/** button with icon */
export const ibutton = (i: Icon, text: Child, click?: click, type: ButtonType = "button") =>
  g("button", hc(C.button), [icon(i), text])
    .prop("type", type)
    .cls(C.icon, !text).on("click", click);
export const positive = (i: Icon, text: Child, click?: click, type?: ButtonType) =>
  ibutton(i, text, click, type).cls(Color.accept);
export const negative = (i: Icon, text: Child, click?: click, type?: ButtonType) =>
  ibutton(i, text, click, type).cls(Color.error);

/** link with icon */
export const ilink = (i: Icon, text: Child, href?: str) => g("a", C.link, [icon(i), text]).prop("href", href);

/**close button */
export const close = (click?: click) => div(hc(C.close), icon($.i.close)).on("click", click);
/**cancel button */
export const cancel = (click?: click) => negative($.i.cancel, w.cancel, click,);
/**confirm button */
export const confirm = (click?: click) => positive("confirm", w.confirm, click, "submit");

export const buttons = (...buttons: S[]) => div(C.buttons, buttons);

export const img = (src: str, cls?: str | str[]) => g("img", cls).prop("src", src)
export const a = (href: str, content: any, cls?: str | str[]) => g("a", cls, content).prop("href", href)
export const hr = (cls?: str | str[]) => g("hr", cls);

export function logo(v: str | Icon) {
  if (v)
    if (isS(v)) {
      switch (v[0]) {
        case ".":
        case "/":
          return img(v).cls(C.icon);
        case "<":
          return toSVG(v).cls(C.icon);
      }
    } else return icon(v);
}

export const panel = (hd: any, bd: any, ft?: any) => div("_ panel", [
  hd && wrap(hd, "hd"),
  wrap(bd, "bd"),
  ft && wrap(ft, "ft")
]);