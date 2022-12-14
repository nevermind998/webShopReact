import { AppLayout } from 'components/Layouts'
import ProductView from 'components/ProductsOverview/ProductsOverview';
import FilterSideBar from 'components/FilterSideBar';
import styles from "./styles.module.css";

const Home = () => {
  return (
    <AppLayout>
      <div className={styles.main}>
        <div className={styles.column}>
        <FilterSideBar/>
        </div>
        <div className={styles.column}>
        <ProductView/>   
        </div> 
      </div>
    </AppLayout>
  )
}

export default Home