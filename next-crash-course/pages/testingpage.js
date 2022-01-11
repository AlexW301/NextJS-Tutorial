import styles from '../styles/TestingPage.module.scss'
// import styles, { button, body } from "./../styles/styles";

const TestingPage = () => {
  let color = "purple";

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>What up!</h1>  
      <p>Hello!!<span> click here</span></p>
      <button>styled-jsx</button>
      {/* <style jsx>{button}</style> */}
    </div>
  );
};

export default TestingPage;
