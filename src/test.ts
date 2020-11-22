import Book from "./entities/Book.js";
import Person from './entities/Person.js'
import {Gender} from './entities/Person.js'
import Periodical from './entities/Periodical.js'


//instancia 
const authorI = new Person('H. P. Lovecraft', new Date('1890-08-20T00:00:00'), Gender.Male )
const authorII = new Person('Nicholas Sparks', new Date('1965-12-31T00:00:00'), Gender.Male )
const authorIII = new Person('Jeff Kinney', new Date('1971-02-19T00:00:00'), Gender.Male)
const authorIV = new Person('Stanford Pines', new Date('1965-03-15T00:00:00'), Gender.Male)

const livroI = new Book(9788525436283, 1, 2, 'Habitantes da Escuridão e Outros Contos', 'e o medo do desconhecido', 1923, authorI)
const livroII = new Book(9788563219022, 1, 1, 'Querido John', ' ', 2007, authorII)
const livroIII = new Book(9788576834847, 6, 7, 'Diário de um banana', 'segurando vela', 2013, authorIII)
const livroIV = new Book(3, 1 , 3, 'O diário 3', ' ', 2016, authorIV)

const periodicoI = new Periodical(1234, 1, 123456, 'Medo Clássico', ' ', 1920, authorI)
const periodicoII = new Periodical(32442, 2, 827377, 'Romance', ' ', 2007, authorII)
const periodicoIII = new Periodical(646464, 1, 647664, 'Diário de um banana', ' ', 2006, authorIII)
const periodicoIV = new Periodical(99876, 1, 47, 'Os diários perdidos', ' ', 2016, authorIV) 


const autores = [authorI, authorII, authorIII, authorIV]
console.log(autores)
const livros = [livroI, livroII, livroIII, livroIV]
console.log(livros)
const periodicos = [periodicoI, periodicoII, periodicoIII, periodicoIV]
console.log(periodicos)

