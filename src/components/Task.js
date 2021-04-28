import { useRef, useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd'

const Task = ({
  task,
  columnId,
  index,
  onEdit,
  onDelete,
  ...props
}) => {
  const inputRef = useRef();
  const [isEditing, setEditing] = useState(task.isEdit || false);
  const [text, setText] = useState(task.content);

  useEffect(() => {
    if (inputRef.current && isEditing === true) {
      inputRef.current.focus();
    }
  }, [isEditing, inputRef]);

  const handleKeyDown = event => {
    const { key } = event;
    const keys = ['Escape'];

    if (keys.indexOf(key) > -1) {
      setEditing(false);
    }
  };

  const handleSave = () => {
    const { 'isEdit': _, ...newTask } = task;
    onEdit({ ...newTask, content: text }, columnId);
    setEditing(false);
  };

  const handleDelete = () => {
    onDelete(columnId, task);
    setEditing(false);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="ui card Task"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="content">
            {isEditing ? (
              <div
                onKeyDown={e => handleKeyDown(e)}
              >
                <textarea
                  value={text}
                  className="edit-content"
                  ref={inputRef}
                  onChange={e => setText(e.target.value)}
                ></textarea>
                <div
                  className="ui primary button tiny"
                  onClick={() => handleSave()}
                >
                  Save
                </div>
                <div
                  className="ui negative button tiny"
                  onClick={() => handleDelete()}
                >
                  Delete
                </div>
              </div>
            ) : (
              <div>
                <i
                  className="edit-pencil pencil alternate icon small"
                  onClick={() => setEditing(true)}
                ></i>
                {text}
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Task;
