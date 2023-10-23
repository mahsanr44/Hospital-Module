'use client'
import { useState } from 'react';

type CheckboxProps = {
    name: string;
}

function Checkbox({ name }: CheckboxProps) {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = async () => {
    setChecked(!checked);

    try {
      await fetch('/api/rooms', {
        method: 'POST',
        body: JSON.stringify({ name, checked: !checked }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error saving checkbox state:', error);
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      {name}
      <div>{checked}</div>
    </div>
  );
}

export default Checkbox;
