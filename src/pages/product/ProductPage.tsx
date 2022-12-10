import { AppLayout } from 'components/Layouts'
import Headline from 'components/Headline';
import { useParams } from 'react-router-dom';
import ProductDetails from 'components/ProductDetails/ProductDetails';

const ProductPage = () => {
  const { id } = useParams();

  return (
    <AppLayout>
      <Headline title='Product details' />
        <div>
            { id ? 
        <ProductDetails id={id}/> : <p/> }
        </div> 
    </AppLayout>
  )
}

export default ProductPage