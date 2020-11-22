import Document from "./Document.js";
import Person from './Person.js'

 export class Periodical extends Document{
    issn: number
    volume: number
    issue: number

    constructor(issn: number, volume: number, issue: number, title: string, subtitle: string, publishedAt: number | Date, author: Person){
        super(title, subtitle, publishedAt, author)
        this.issn = issn
        this.volume = volume
        this.issue = issue
    }
}

export default Periodical