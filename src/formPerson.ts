import {Gender} from './entities/Person.js'
import Person from './entities/Person.js'
import { capitalize } from './stringsFuncionais.js'

const name = document.querySelector<HTMLInputElement>('#name')!
const birth = document.querySelector<HTMLInputElement>('#birth')!
const gender = document.querySelector<HTMLSelectElement>('#gender')!
const form = document.querySelector<HTMLFontElement>('form')!
const message = document.querySelector<HTMLDivElement>('#message')!
const salvar = document.querySelector<HTMLButtonElement>('#btnSalvar')!
const filtroName = document.querySelector<HTMLInputElement>('#filtro')!
const table = document.querySelector('table')!
const achar = document.querySelector<HTMLButtonElement>('#btnAchar')!


let personLocalStorage: Array<Person> = JSON.parse(localStorage.getItem("person") || '{}')  
let namesTable = personLocalStorage.map(p => p.name)

const persons: Person[] = []

showPersons()
salvar.addEventListener('click', (ev: Event) => {
    ev.preventDefault()
  
    const valorName = name.value.trim()

    if (!valorName) {
      message.innerText = 'O campo Nome é obrigatório!'
      name.focus()
      return
    }

    if(!birth.value){
    message.innerText = 'Por favor, digite uma data.'
    birth.focus()
    return
    }
    const dataNascimento = new Date(`${birth.value}T00:00:00`)
    console.log(birth.value)
  
    if (Date.now() - Number(dataNascimento) < 0) {
      message.innerText = 'O nascimento deve ter ocorrido no passado!'
      birth.focus()
      return
    }

    if(!gender.value){
        message.innerText = 'Por favor, preencha o campo "gender".'
        gender.focus()
        return
    }

    try{

        var birthNew = new Date(birth.value)

      const person = new Person(
        capitalize(name.value),
        birthNew,
        gender.value === 'f' ? Gender.Female : Gender.Male
        )
        persons.push(person)

        localStorage.setItem('person', JSON.stringify(persons))
        showPersons()
        message.innerText = "Cadastrado com sucesso!"
    }
    catch (error: any) {
        message.innerText = 'Hm, algo deu errado :/'
        return
      }

})
function showPersons() {
    if (localStorage.getItem('persons')) {
      const data = JSON.parse(localStorage.getItem('persons')!)
  
      persons.splice(0)
  
      for (const item of data) {
        persons.push(new Person(
          item.name,
          item.birth,
          item.gender
       ))
     }
   }

   let sortPersons = [...persons].sort()
   let lines = ''
 
   for (const pessoa of sortPersons) {
     lines += `
       <tr>
         <td>${(pessoa as Person).name}</td>
       </tr>
       `  
   }
  table.innerHTML = `
    <thead>
      <tr> 
          Autor
      </tr>
    </thead>
    <tbody>
      ${lines}
    </tbody>
  `
}

achar.addEventListener('click', (ev: Event) =>{
  ev.preventDefault()

  function filter(){
    if (!filtroName.value){
      showPersons()
    } 
    else {
      let personLocalStorage: Array<Person> = JSON.parse(localStorage.getItem("person")!)  


      const onlyName = (obj: typeof personLocalStorage[0]) => obj.name.includes(filtroName.value)
      
      let filter = personLocalStorage.filter(onlyName)
      let lines = ''
      for (const authors of filter){
          lines += `
          <tr>
            <td>${(authors as Person).name}</td>
          </tr>
          `
      }
      table.innerHTML = `
        <thead>
        <tr> 
            Autores
        </tr>
        </thead>
        <tbody>
        ${lines}
        </tbody>
        `
    }}
    filter()
})