import Modal from 'react-modal';
import css from './ImageModal.module.css'
Modal.setAppElement('#root'); 

interface Props{
  image: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageModal({ image, isOpen, onClose }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true} 
      shouldCloseOnEsc={true}
      className={css.content}
      overlayClassName={css.overlay}

      contentLabel="Image Modal"
    ><img src={image} alt="Large view" className={css.modalImage} />
    </Modal>
  );
}