import styles from './styles.module.css';

const Loader = () => {

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
    </div>
  )
}

export default Loader