import styles from './styles.module.css';

const LoaderProducts = () => {

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
    </div>
  )
}

export default LoaderProducts