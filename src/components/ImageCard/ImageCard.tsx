import css from '../ImageGallery/ImageGallery.module.css'
import { IoIosHeartEmpty } from "react-icons/io";

interface Props {
    openModal: (ev: React.MouseEvent<HTMLImageElement>) => void;
    likes: number;
    raw: string;
    alt_description: string;
}

const ImageCard = ({ openModal, likes, raw, alt_description }: Props) => {
    return (
        <div className={css.listItem}>
            <img onClick={openModal} className={css.listImg} src={raw} alt={alt_description} />
            <div className={css.infoContent}>
                <p className={css.listParagraph}>Likes: {likes} <IoIosHeartEmpty className={css.heartIcon} /></p>
            </div>
            
        </div>
    );
};

export default ImageCard;