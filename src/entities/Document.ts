import Person from './Person.js'

export class Document{
    title: string
    subtitle: string
    publishedAt: number | Date
    author: Person

    constructor(title: string, subtitle: string, publishedAt: number | Date, author: Person) {
    this.title = title
    this.subtitle = subtitle
    this.publishedAt = publishedAt
    this.author = author
}
}

export default Document