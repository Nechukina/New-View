import { useCallback, useMemo, useState } from 'react';
import { Camera, Cameras } from '../../../types/camera';
import ProductCard from '../product-card/product-card';
import ModalCatalogAddItem from '../../modals/modal-catalog-add-item/modal-catalog-add-item';
import ModalCatalogAddItemSuccess from '../../modals/modal-catalog-add-item-success/modal-catalog-add-item-success';

type ProductCardListProps = {
  cameras: Cameras;
}


function ProductCardList({cameras}: ProductCardListProps):JSX.Element {

  const [isBuyModalOpened, setBuyModalOpened] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Camera>(cameras[0]);
  const [isAddToCartModalSuccess, setAddToCartModalSuccess] = useState(false);


  const handleAddToCartModalHide = useCallback(() => {
    setAddToCartModalSuccess(false);
  },[]);

  const handleBuyModalHide = useCallback(() => {
    setBuyModalOpened(false);
  },[]);

  return (
    <>
      <div className="cards catalog__cards" data-testid="product-card-list">
        {useMemo(() => (cameras.map((camera) =>(
          <ProductCard
            key={camera.id}
            camera={camera}
            setBuyModalOpened={setBuyModalOpened}
            setCurrentCamera={setCurrentProduct}
          />)
        )), [cameras])}
      </div>
      <ModalCatalogAddItem
        isOpened={isBuyModalOpened}
        onCloseButtonClick={handleBuyModalHide}
        product={currentProduct}
        setAddToCartModalSuccess={setAddToCartModalSuccess}
      />
      <ModalCatalogAddItemSuccess
        isOpened={isAddToCartModalSuccess}
        onClose={handleAddToCartModalHide}
      />
    </>
  );
}

export default ProductCardList;
