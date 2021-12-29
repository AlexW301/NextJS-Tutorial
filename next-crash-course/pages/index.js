import {server} from '../config';
import ArticleList from '../components/ArticleList';
import {useState} from "react";
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import { promises as fs } from 'fs'
import path from 'path'

import useSWR from 'swr';

export default function Home({articles, files}) {

  // useSWR for client side data fetching
  const fetcher = (url) => fetch(url).then((res) => res.json())

  const { data:pokemon, error } = useSWR('https://pokeapi.co/api/v2/pokemon/ditto', fetcher)

  console.log(pokemon.species.name)
  //

  const test = async () => {
      const res = await fetch(`https://api.monday.com/v2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjEzNzUyNjY2NiwidWlkIjoyNjU4MzE4NywiaWFkIjoiMjAyMS0xMi0xNlQxNToyMjoxOC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTA2Njg3NjAsInJnbiI6InVzZTEifQ.6qBUaos_gkzlwVj8jp0YuMESs5TPXGynj6k7c4SOpIk"
        },
        body: JSON.stringify({
          query: "query {\r\n  boards (ids:2035044194) {\r\n    name\r\n    items (newest_first: false) {\r\n      id\r\n      name\r\n      column_values {\r\n        title\r\n        value\r\n      }\r\n    }\r\n  }\r\n}",
          variables: {}
        })
      })
      const data = await res.json()
      setBoardItems(data.data.boards[0].items)
      console.log(boardItems)
  }

  const [boardItems, setBoardItems] = useState(null)



  return (
    <div>
      <ArticleList articles={articles}/>
      {files.map(file => (
        <div key={file.filename}>
        <h3>{file.filename}</h3>
        <p>{file.content}</p>
        </div>
      ))}
      <button onClick={test}>Get Test Board</button>
      {boardItems && (
        boardItems.map((item) => (
          <p style={{fontSize: '20px'}} key={Math.random()}>Name: {item.name}  Comments: {item.column_values[3].value} </p>
      ))
      )}
    </div>
  )
}

// export const getStaticProps = async () => {
//   const res = await fetch(`${server}/api/articles`);
//   const articles = await res.json();

//   return {
//     props: {
//       articles: articles
//     }
//   }
// }

export const getStaticProps = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`);
  const articles = await res.json();

  const filesDirectory = path.join(process.cwd(), 'files-folder')
  const filenames = await fs.readdir(filesDirectory)

  const files = filenames.map(async (filename) => {
    const filePath = path.join(filesDirectory, filename)
    const fileContents = await fs.readFile(filePath, 'utf8')

    // Generally you would parse/transform the contents
    // For example you can transform markdown to HTML here

    return {
      filename,
      content: fileContents
    }
  })

  return {
    props: {
      articles: articles,
      files: await Promise.all(files)
    }
  }
}
