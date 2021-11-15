import Nav from './Nav';
import Meta from './Meta';
import Header from './Header';
import styles from '../styles/Layout.module.css'

const Layout = ({ children }) => {
    return (
        <>
            <Meta/>
            <Nav />
            <div className={styles.container}>
                <main className={styles.main}>
                    <Header />
                    {/* Children is the children of the layout component in app.js which is where the pages output */}
                    {children}
                </main>
            </div>
        </>
    )
};

export default Layout;