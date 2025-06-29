import axios from "axios";
import {Image} from './App'

const ACCESS_KEY: string = 'qwSgt6k88pzW9ui9f2pvFVfJP_7PtW_vb9Plg1sZ7yQ';

interface ImageObject {
    images: Image[];
    totalHits: number;
}

export default async function fetchImages (img: string, page: number, itemsPerPage: number): Promise<ImageObject> {
    
    const resp = await axios.get(`https://api.unsplash.com/search/photos/?client_id=${ACCESS_KEY}&query=${img}&per_page=${itemsPerPage}&page=${page}`);
    
    return {
        images: resp.data.results, 
        totalHits: resp.data.total,
    };
}