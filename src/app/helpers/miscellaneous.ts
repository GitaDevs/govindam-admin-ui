import { ScreenSize } from "../types/screen";

export function isSmallScreen(screenObject: ScreenSize): boolean {
  return !screenObject['md'] && screenObject['xs'];
}

export function isLargeScreen(screenObject: ScreenSize): boolean {
  return screenObject['md'];
}