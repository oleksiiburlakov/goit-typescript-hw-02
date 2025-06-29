import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css'
import {Image} from '../../App';


interface Props {
    openModal: (ev: React.MouseEvent<HTMLImageElement>) => void;
    images: Image[]; 
}

export default function ImageGallery({ openModal, images }: Props) {
    return (
        <ul className={css.list}>
            {images.map(({ id, likes, urls, alt_description }) => {
                
                return (
                    <li key={id}>
                        <ImageCard 
                            openModal={openModal}
                            likes={likes} 
                            raw={urls.regular} 
                            alt_description={alt_description} 
                        />
                    </li>
                );
            })}
        </ul>
    );
}