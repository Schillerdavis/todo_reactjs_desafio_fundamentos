import styles from './Header.module.css'
import toDoLogo from '../Assets/toDo-logo.svg';

export function Header() {
    return (
        <header className={styles.header}>
            <img src={toDoLogo} alt="Logotipo do ToDo" />
        </header>
    );
}