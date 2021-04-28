import Task from './Task';
import EditableTitle from './EditableTitle';
import { Droppable } from 'react-beautiful-dnd';
import { uniqueId } from 'lodash';

const TaskList = ({
  tasks,
  column,
  onAddTask,
  onEditTask,
  onDeleteTask,
  ...props
}) => {
  const handleAddTask = (e, columnId) => {
    e.preventDefault();
    const newTask = { id: uniqueId('task-added-'), content: '', isEdit: true };
    onAddTask(newTask, columnId);
  };

  return (
    <div className="column">
      <div className="ui card Task-list">
        <div className="content">
          <EditableTitle title={column.title} />
          <Droppable droppableId={column.id} type='task'>
            {(provided) => (
              <div
                className="drag-space"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    columnId={column.id}
                    index={index}
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className="extra content">
          <a onClick={e => handleAddTask(e, column.id)} href="/#">+ Add another card</a>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
