import { useState } from 'react';
import { Trash, Check } from 'phosphor-react';
import styles from './Task.module.css';

interface TaskProps {
    content: string;
    onSelectionChange: (isSelected: number) => void;
    onDeleteTask: (task: string) => void;
} 

export function Task({ content, onSelectionChange, onDeleteTask }: TaskProps) {
    const [isSelected, setIsSelected] = useState(false);

    function handleSelectClick() {
        setIsSelected(!isSelected);
        onSelectionChange(isSelected ? -1 : 1);
    }

    function handleDeleteTask() {
        onDeleteTask(content);
        if (isSelected) {
            onSelectionChange(-1);
        }
    }

    const buttonIsSelected = [
        `${styles.task} ${isSelected ? styles.selectedForm : ''}`, // [0]
        `${styles.taskSelect} ${isSelected ? styles.selected : ''}`, // [1]
        `${styles.taskText} ${isSelected ? styles.selectedText : ''}`, // [2]
    ]

    return (
        <section className={buttonIsSelected[0]}>
            <button 
                onClick={handleSelectClick}
                className={buttonIsSelected[1]}
                title="Selecionar"
            >
                {isSelected && <Check weight="bold" />}
            </button>
            <p className={buttonIsSelected[2]}>{content}</p>
            <button onClick={handleDeleteTask} className={styles.taskTrash} title="Deletar tarefa"><Trash /></button>
        </section>
    );
}

