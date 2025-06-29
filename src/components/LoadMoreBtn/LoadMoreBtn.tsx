import css from './LoadMoreBtn.module.css';

interface Props {
    handleClick: () => Promise<void>;
}

export default function LoadMoreBtn({handleClick}: Props) {
    return (
        <button className={css.btnLoad} type="button" onClick={handleClick}>Load More</button>
    )
}