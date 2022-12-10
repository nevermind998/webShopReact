import { AppLayout } from 'components/Layouts'
import Headline from 'components/Headline';
import ProductView from 'components/ProductsOverview/ProductsOverview';
import FilterSideBar from 'components/FilterSideBar';
import styles from "./styles.module.css";

const Home = () => {
  return (
    <AppLayout>
      <Headline title='Shop' />
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