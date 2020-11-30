import {Gender} from './entities/Person.js'
import Person from './entities/Person.js'

const name = document.querySelector<HTMLInputElement>('#name')!
const birth = document.querySelector<HTMLInputElement>('#birth')!
const gender = document.querySelector<HTMLSelectElement>('#gender')!
const form = document.querySelector<HTMLFontElement>('form')!
const message = document.querySelector<HTMLDivElement>('#message')!

const persons: Person[] = []
showPersons()

form.addEventListener('submit', (ev: Event) => {
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
            name.value,
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
 } 

