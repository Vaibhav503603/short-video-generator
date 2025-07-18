"use client"
import React, { useState } from 'react'
import Topic from './_components/Topic'

function CreateNewVideo() {
  const [formData, setFormData] = useState({}); // ✅ Initialize as an empty object

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
    console.log(formData);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Create New Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 p-7 border rounded-xl">
          {/* Topic & Script */}
          <Topic onHandleInputChange={onHandleInputChange} />

          {/* Video Image Style */}
          {/* Add your components later */}

          {/* Voice */}
          {/* Add your components later */}

          {/* Captions */}
          {/* Add your components later */}
        </div>

        <div className="col-span-1">
          {/* Optional: Preview or Summary based on formData */}
        </div>
      </div>
    </div>
  );
}

export default CreateNewVideo;
