import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import fetchImages from './api';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

export interface Image {
  id: string;
  likes: number;
  alt_description: string;
  urls: {
      regular: string;
  };
}

interface FetchResult {
  images: Image[];
  totalHits: number;
}

function App() {
  const [images, setImage] = useState<Image[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(15);
  const [isLoad, setLoader] = useState<boolean>(false);
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false); 
  const [imgTarget, setImgTarget] = useState<string>('');
  
  const onSearch = async (): Promise<void> => {
    setImage([]);
    setLoader(true); 
    setShowBtn(false); 
    setIsError(false);

    const newPage: number = 1; 
    setPage(newPage);

    try {
      const data: FetchResult = await fetchImages(query, newPage, 12);
      setImage(data.images); 

      const totalPages: number = Math.ceil(data.totalHits / itemsPerPage);

      if (!data || !data.images || data.images.length === 0) {
        toast.error("No results found. Try a different query.", {
            position: "top-right",
        });
        return;
    }

      if(newPage >= totalPages){
        toast("You've reached the end of the results", {
          position: "top-right",
      });
      
      }
      setShowBtn(true);
      setIsError(false);
    } catch {
      setIsError(true)
      
    } finally {
      setLoader(false); 
      
    }
  }

  const handleLoadMore = async (): Promise<void> => {
    setLoader(true);
    setShowBtn(false); 
    setIsError(false);
    const newPage: number = page + 1;
    setPage(newPage);
    try {
      const data: FetchResult = await fetchImages(query, newPage, 12); 
      setImage((prevImages) => [...prevImages, ...data.images]); 
      
      const totalPages: number = Math.ceil(data.totalHits / itemsPerPage); 
      if (newPage >= totalPages) {
        toast("You've reached the end of the results", {
          position: "top-right",
        });
        return;
      }

      setShowBtn(true);

    } catch (error) {
      setShowBtn(false);
      setIsError(true);
      return;
    } finally {

      window.scrollBy({
        top: 500,
        behavior: 'smooth'
    });

      setLoader(false); 
    }
  };
  
  useEffect(() => {
    if (images.length > 0 && !isLoad) {
      window.scrollBy({
        top: 500, 
        behavior: 'smooth',
      });
    }
  }, [images, isLoad]);
  
  const openModalImg = (ev: React.MouseEvent<HTMLImageElement>) => {
    const img: HTMLImageElement = ev.currentTarget;
    if (!isOpen) {  
      setImgTarget(img.src);
      setIsOpen(true);
    }
    
  };

  return (
    <>
      <SearchBar onSearch={onSearch}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} />
      <Toaster position="top-right" reverseOrder={false} />
      <ImageGallery openModal={openModalImg} images={images} />
      {isLoad && <Loader />}
      {showBtn && <LoadMoreBtn handleClick={handleLoadMore} />}
      {isOpen && <ImageModal image={imgTarget} isOpen={isOpen} onClose={() => setIsOpen(false)} />}
      {isError && <ErrorMessage />}
    </>
  );
}

export default App;