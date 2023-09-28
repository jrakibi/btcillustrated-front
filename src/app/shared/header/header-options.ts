export class HeaderOptions {
    isUnderlineDisplayed?: boolean = false
    isSlideShow?: boolean = false
    headerLinks?: HeaderLink[]
}

export interface HeaderLink {
    title: string,
    route: string
}