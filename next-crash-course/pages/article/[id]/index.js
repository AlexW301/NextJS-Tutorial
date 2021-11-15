import {server} from '../../../config';
import Link from 'next/link';
import {useRouter} from 'next/router'
import Meta from '../../../components/Meta';

const article = ({article}) => {
    // const router = useRouter();
    // const {id} = router.query

    return (
        <>
        <Meta title={article.title} description={article.excerpt}/>
            <h1>{article.title}</h1>
            <p>{article.body}</p>
            <br />
            <Link href="/">Go Back</Link>
        </>
    )
}

// "context allows us to grab the params from the url"
export const getStaticProps = async (context) => {
    const res = await fetch(`${server}/api/articles/${context.params.id}`);
    const article = await res.json();

    return {
        props: {
            article: article
        }
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(`${server}/api/articles`);
    const articles = await res.json();

    const ids = articles.map(article => article.id)
    const paths = ids.map(id => ({params: {id: id.toString()}}))

    return {
        paths,
        fallback: false
    }
}


// // "context allows us to grab the params from the url"
// export const getStaticProps = async (context) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`);
//     const article = await res.json();

//     return {
//         props: {
//             article: article
//         }
//     }
// }

// export const getStaticPaths = async () => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
//     const articles = await res.json();

//     const ids = articles.map(article => article.id)
//     const paths = ids.map(id => ({params: {id: id.toString()}}))

//     return {
//         paths,
//         fallback: false
//     }
// }



//Get serverside props fetches the data whenever the data is requested

// "context allows us to grab the params from the url"
// export const getServerSideProps = async (context) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`);
//     const article = await res.json();

//     return {
//         props: {
//             article: article
//         }
//     }
// }

export default article