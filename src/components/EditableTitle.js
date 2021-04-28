import { useRef, useState, useEffect } from 'react';

const EditableTitle = ({
  title,
  ...props
}) => {
  const inputRef = useRef();
  const [isEditing, setEditing] = useState(false);
  const [text, setText] = useState(title);

  useEffect(() => {
    if (inputRef.current && isEditing === true) {
      inputRef.current.focus();
    }
  }, [isEditing, inputRef]);

  const handleKeyDown = (event) => {
    const { key } = event;
    const keys = ['Escape', 'Tab'];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey];

    if (allKeys.indexOf(key) > -1) {
      setEditing(false);
    }
  };

  return (
    <div className="header">
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={e => handleKeyDown(e)}
        >
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>
      ) : (
        <span
          onClick={() => setEditing(true)}
        >
          {text}
        </span>
      )}
    </div>
  );
};

export default EditableTitle;
