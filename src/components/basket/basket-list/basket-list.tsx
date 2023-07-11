import { useState } from 'react';
import { useAppSelector } from '../../../hooks';
import { getBasketCameras } from '../../../store/basket/basket.selectors';
import BasketItem from '../basket-item/basket-item';
import BasketListEmpty from '../basket-list-empty/basket-list-empty';
import { Camera } from '../../../types/camera';
import ModalBasketRemoveItem from '../../modals/modal-basket-remove-item/modal-basket-remove-item';

function BasketList(): JSX.Element {
  const basketCameras = useAppSelector(getBasketCameras);

  const [openedRemoveModal, setOpenedRemoveModal] = useState(false);
  const [currentCamera, setCurrentCamera] = useState<Camera>({} as Camera);

  const handleRemoveModalCloseClick = () => {
    setOpenedRemoveModal(false);
  };

  return (
    <>
      <ul className="basket__list" data-testid='basket-list'>
        {!basketCameras.length
          ? <BasketListEmpty/>
          : basketCameras.map((camera) => (
            <BasketItem
              camera={camera}
              setOpenedRemoveModal={setOpenedRemoveModal}
              setCurrentCamera={setCurrentCamera}
              key={camera.id}
            />
          ))}
      </ul>
      <ModalBasketRemoveItem
        camera={currentCamera}
        isOpen={openedRemoveModal}
        onCloseCLick={handleRemoveModalCloseClick}
      />
    </>
  );
}

export default BasketList;
