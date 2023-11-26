export class HeaderOptions {
    isUnderlineDisplayed?: boolean = false
    isSlideShow?: boolean = false
    headerLinks?: HeaderLink[]
    isDarkMode?: boolean = true
}

export interface HeaderLink {
    title: string,
    route: string
}