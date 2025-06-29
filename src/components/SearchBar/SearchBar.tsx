import { useRef } from 'react';
import css from './SearchBar.module.css';
import { toast } from "react-hot-toast";

interface Props {
    onSearch: (val: string) => Promise<void>;
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({onSearch, onChange} : Props) {

    const inputRef = useRef<HTMLInputElement>(null);
    
    const hendleSubmit = (ev: React.FormEvent<HTMLFormElement>): void => {
        ev.preventDefault();
        
        const form: HTMLFormElement = ev.currentTarget;
        const value = inputRef.current?.value.trim();

        if (!value || value === "") {
            toast.error("Input cannot be empty!", {
                position: "top-right",
            });
            
            return;
        }
        onSearch(value);
        form.reset();
    }

    return(
        <header>
            <form className={css.form} onSubmit={hendleSubmit}>
            <input className={css.input}
                ref={inputRef}
                autoComplete="off"
                name="img"
                id="img"
                autoFocus
                type="text"
                onChange={onChange}
                placeholder="Search images and photos"/>
            <button className={css.btnSearch} type="submit" > Search</button>
        </form>
        </header>
        
        
    )
}