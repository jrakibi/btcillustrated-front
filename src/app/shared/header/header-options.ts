export class HeaderOptions {
    isUnderlineDisplayed?: boolean = false
    isSlideShow?: boolean = false
    headerLinks?: HeaderLink[]
    isDarkMode?: boolean = true
    isTransparent?: boolean = false
}

export interface HeaderLink {
    title: string,
    route: string
}