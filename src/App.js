import React, { useState } from 'react';
import mgtData from './data/mgtData';
import './App.css';
import './components/TaskList';
import TaskList from './components/TaskList';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function App() {
  const [data, setData] = useState(mgtData);

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) { return }

    if (destination.droppableId === source.droppableId && destination.index === source.index) { return }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }
      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn
        }
      }
      setData(newState)
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }

    setData(newState)
  }

  const handleAddTask = (newTask, columnId) => {
    const newTasks = { ...data.tasks, [newTask.id]: newTask };
    const newColumn = { ...data.columns[columnId] };
    newColumn.taskIds = [...newColumn.taskIds, newTask.id];

    setData({
      ...data,
      tasks: newTasks,
      columns: {
        ...data.columns,
        [columnId]: newColumn
      }
    });
  };

  const handleEditTask = (newTask) => {
    const newTasks = { ...data.tasks, [newTask.id]: newTask };

    setData({
      ...data,
      tasks: newTasks
    });
  };

  const handleDeleteTask = (columnId, task) => {
    const newColumn = { ...data.columns[columnId] };
    const newTaskIds = newColumn.taskIds;
    const taskIdIndex = newTaskIds.findIndex(item => item === task.id);
    newTaskIds.splice(taskIdIndex, 1);

    const { [task.id]: _, ...newTasks } = data.tasks;
    setData({
      ...data,
      tasks: newTasks,
      columns: {
        ...data.columns,
        [columnId]: newColumn
      }
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="ui container">
        <Droppable droppableId='all-columns' direction='horizontal' type='column'>
          {(provided) => (
            <div className="App" {...provided.droppableProps} ref={provided.innerRef}>
              {data.columnOrder.map((id, index) => {
                const column = data.columns[id];
                const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

                return (
                  <TaskList
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    index={index}
                    onAddTask={handleAddTask}
                    onEditTask={handleEditTask}
                    onDeleteTask={handleDeleteTask} />
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
