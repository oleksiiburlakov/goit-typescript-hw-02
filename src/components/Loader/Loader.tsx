import css from './Loader.module.css'

export default function Loader(){
    return(
        <div className={css.loaderContainer}>
            <div className={css.loader}></div>
        </div>
        
    )
}