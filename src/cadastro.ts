import Book from './entities/Book.js'
import Periodical from './entities/Periodical.js'
import Person from './entities/Person.js'


const selectType = document.querySelector<HTMLSelectElement>('#type')!
const title = document.querySelector<HTMLInputElement>('#title')!
const subtitle = document.querySelector<HTMLInputElement>('#subtitle')!
const publishedAt = document.querySelector<HTMLInputElement>('#publishedAt')!
const author = document.querySelector<HTMLSelectElement>('#author')!
const isbn = document.querySelector<HTMLInputElement>('#isbn')!
const edition = document.querySelector<HTMLInputElement>('#edition')!
const volume = document.querySelector<HTMLInputElement>('#volume')!
const issn = document.querySelector<HTMLInputElement>('#issn')!
const issue = document.querySelector<HTMLInputElement>('#issue')!
const message = document.querySelector<HTMLParagraphElement>('#message')!
const form = document.querySelector<HTMLFormElement>('form')!

const books: Book[] = []
const periodicais: Periodical[] = []

let personsLocalStorage: Array<Person> = JSON.parse(localStorage.getItem("person")!)  // bucar no local storage a person
let names = personsLocalStorage.map(p => p.name)  // pegar so os name de person

function carregarAuthor() {
    author.options.length = 0 
    author.add(new Option("Selecione um autor:", ""))
    for (var i = 0; i < names.length; i++) {
        author.add(new Option(names[i].toString(), i.toString()));
    }
}

showBooks()
showPeriodical()

selectType.addEventListener('change', (event) => {
    if(selectType.value == "livros"){
        title.style.display = "block";
        subtitle.style.display = "block";
        publishedAt.style.display = "block";
        author.style.display = "block";
        isbn.style.display = "block";
        edition.style.display = "block";
        volume.style.display = "block";
        issue.style.display = "none";
        issn.style.display = "none";

     carregarAuthor()

    }
    else if(selectType.value == "periodicos"){
        title.style.display = "block";
        subtitle.style.display = "block";
        publishedAt.style.display = "block";
        author.style.display = "block";
        issue.style.display = "block";
        issn.style.display = "block";
        volume.style.display = "block";
        isbn.style.display = "none";
        edition.style.display = "none";
        carregarAuthor()
    } 
    else{
        title.style.display = "none";
        subtitle.style.display = "none";
        publishedAt.style.display = "none";
        author.style.display = "none";
        issue.style.display = "none";
        issn.style.display = "none";
        volume.style.display = "none";
        isbn.style.display = "none";
        edition.style.display = "none";  
        carregarAuthor() 
    }
});

form.addEventListener('submit', (ev: Event) =>{
    ev.preventDefault()

    var indice = author.value
    let person = personsLocalStorage[parseInt(indice)]

    


    if(!title.value.trim()){
        message.innerText = 'Preenchao campo "Titulo"'
        title.focus()
        return
    }
    if(!subtitle.value.trim()){
        message.innerText = 'Preenchao campo "subtitulo"'
        subtitle.focus()
        return
    }
    const dataPublicacao = new Date(`${publishedAt.value}T00:00:00`)
    console.log(publishedAt.value)
  
    if (Date.now() - Number(dataPublicacao) < 0) {
      message.innerText = 'As publicações deve ter ocorrido no passado!'
      publishedAt.focus()
      return
    }

    if(!publishedAt.value){
        message.innerText = 'Preenchao campo "data de publicação"'
        publishedAt.focus()
        return
    }

    if(!author.value.trim()){
        message.innerText = 'Preenchao campo "author"'
        author.focus()
        return
    }

    if(!volume.value.trim()){
        message.innerText = 'Preenchao campo "volume"'
        volume.focus()
        return
    }

    if (selectType.value == "livros"){

    if(!isbn.value.trim()){
        message.innerText = 'Preenchao campo "ISBN"'
        isbn.focus()
        return
    }
    if(!edition.value.trim()){
        message.innerText = 'Preenchao campo "edição"'
        edition.focus()
        return
    }

}
   else if (selectType.value == "periodicos"){
    if(!issn.value.trim()){
        message.innerText = 'Preenchao campo "ISSN"'
        issn.focus()
        return
    }

    if(!issue.value.trim()){
        message.innerText = 'Preencha o campo "ISSUE"'
        issue.focus()
        return
    } }

if (selectType.value == "livros") {

    try{
        var datapublishedAt = new Date(publishedAt.value)

        const book = new Book(
            parseInt(isbn.value),
            parseInt(edition.value),
            parseInt(volume.value),
            title.value,
            subtitle.value,
            datapublishedAt,
            person
        )

        books.push(book)

        localStorage.setItem('book', JSON.stringify(books))
        showBooks()
        message.innerText = "Cadastrado com sucesso!"
    }
    catch (error: any) {
        message.innerText = 'Hm, algo deu errado :/'
        return
      }

    }

    if(selectType.value == "periodicos") {
      try{
          
        let datapublishedAt = new Date(publishedAt.value)


        const periodical = new Periodical(
            parseInt(issn.value),
            parseInt(volume.value),
            parseInt(issue.value),
            title.value,
            subtitle.value,
            datapublishedAt,
            person
        )
        
        periodicais.push(periodical)

        localStorage.setItem('periodical', JSON.stringify(periodicais))
        showPeriodical()
        message.innerText = "Cadastrado com sucesso!"
    }
    catch (error: any) {
        message.innerText = 'Hm, algo deu errado :/'
        return
      }


   }   })
function showBooks() {
    if (localStorage.getItem('books')) {
      const data = JSON.parse(localStorage.getItem('books')!)
  
      books.splice(0)
  
      for (const item of data) {
        books.push(new Book(
            item.isbn,
            item.edition,
            item.volume,
            item.title,
            item.subtitle,
            item.publishedAt,
            item.author
        ))
     }
   }
 }
 function showPeriodical() {
    if (localStorage.getItem('periodicais')) {
      const data = JSON.parse(localStorage.getItem('periodicais')!)
  
      periodicais.splice(0)
  
      for (const item of data) {
        periodicais.push(new Periodical(
            item.issn,
            item.volume,
            item.issue,
            item.title,
            item.subtitle,
            item.publishedAt,
            item.author
        ))
     }
   }
 }