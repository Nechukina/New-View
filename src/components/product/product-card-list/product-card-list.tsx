import { useCallback, useState } from 'react';
import { Camera, Cameras } from '../../../types/camera';
import ProductCard from '../product-card/product-card';
import ModalCatalogAddItem from '../../modals/modal-catalog-add-item/modal-catalog-add-item';

type ProductCardListProps = {
  cameras: Cameras;
}


function ProductCardList({cameras}: ProductCardListProps):JSX.Element {

  const [isBuyModalOpened, setBuyModalOpened] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Camera>(cameras[0]);


  const handleBuyModalShow = useCallback(() => {

    setBuyModalOpened(!isBuyModalOpened);
  }, [isBuyModalOpened]);

  return (
    <>
      <div className="cards catalog__cards" data-testid="product-card-list">
        {cameras.map((camera) =>(
          <ProductCard
            key={camera.id}
            camera={camera}
            setBuyModalOpened={setBuyModalOpened}
            setCurrentCamera={setCurrentProduct}
          />)
        )}
      </div>
      <ModalCatalogAddItem
        isOpened={isBuyModalOpened}
        onCloseButtonClick={handleBuyModalShow}
        product={currentProduct}
      />
    </>
  );
}

export default ProductCardList;
