import ArticleItem from './ArticleItem';
import articleStyles from '../styles/Article.module.css';

function ArticleList({ articles }) {
    return (
        <div className={articleStyles.grid}>
            {articles.map((el) => (
                <ArticleItem article={el} key={Math.random}/>
            ))}
        </div>
    );
}

export default ArticleList;
