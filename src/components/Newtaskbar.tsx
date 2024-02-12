import { ClipboardText, PlusCircle } from 'phosphor-react';
import styles from './Newtaskbar.module.css';
import { Task } from './Task';
import { ChangeEvent, FormEvent, InvalidEvent, KeyboardEvent, useState } from 'react';

export function Newtaskbar () {
    
    const [task, setTask] = useState<string[]>([]);

    const [newTaskText, setNewTaskText] = useState<string>('');

    const [selectionCount, setSelectionCount] = useState(0);

    function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewTaskText(event.target.value);
    }

    function selectionChange(count: number) {
        const newCount = Math.max(0, Math.min(task.length, selectionCount + count));
        setSelectionCount(newCount);
    }

    function deleteTask(taskToDelete: string) {
        const tasksWithoutDeleteOne = task.filter(task => {
            return task !== taskToDelete;
        });
        setTask(tasksWithoutDeleteOne);
    }

    function handleNewInvalidTask(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Por favor, insira uma tarefa!');
    }

    function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
        const keyboardEvent = event as KeyboardEvent;
        if (event.key === 'Enter' && !keyboardEvent.shiftKey) {
            event.preventDefault();
            if (newTaskText.trim() !== '') {
                handleCreateNewTask();
            }
        }
    }
        
    function handleCreateNewTask(event?: FormEvent<Element>) {
        if (event) {
            event.preventDefault();
        }
        setTask([...task, newTaskText]);
        setNewTaskText('');
    }

    const isNewTaskEmpty = newTaskText.length === 0;

    return (
        <div className={styles.taskWindown}>
            <form onSubmit={handleCreateNewTask} className={styles.newTaskBar}>
                <textarea 
                    name="coment"
                    className={styles.textArea}
                    placeholder='Adicione uma nova tarefa'
                    value={newTaskText}
                    onChange={handleNewTaskChange}
                    onKeyDown={handleKeyDown}
                    onInvalid={handleNewInvalidTask}
                    required
                />
                <button disabled={isNewTaskEmpty} type="submit">
                    Criar <PlusCircle className={styles.iconePlus} />
                </button>
            </form>
            <form className={styles.progressCreatedForm}>
                <p className={styles.progressCreatedTask}>
                    Tarefas Criadas
                    <span className={styles.progressCreatedTaskNumber}>{task.length}</span>
                </p>

                <p className={styles.progressCompletedTask}>
                    Concluídas
                    <span className={styles.progressCompletedTaskNumber}>{selectionCount} de {task.length}</span>
                </p>
            </form>
            {task.length === 0 && (
                <div className={styles.emptyTasksArticle}>
                    <ClipboardText className={styles.emptyTasksIcon} alt="Icone de uma prancheta" />
                    <strong>Você ainda não tem tarefas cadastradas</strong>
                    <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
            )}
            

            {task.map(task=> {
                return (
                    <Task
                        key={task}
                        content={task}
                        onDeleteTask={deleteTask}
                        onSelectionChange={selectionChange}
                    />
                )
            })}
        </div>
    );
}