import React, { useState } from 'react';

function FileUploaderAndDownloader() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDownload = () => {
    if (!file) {
      alert("No file selected!");
      return;
    }

    const fileURL = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(fileURL);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Upload and Download File</h2>
      <input type="file" onChange={handleFileChange} />
      <br />
      <button
        onClick={handleDownload}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Download File
      </button>
    </div>
  );
}

export default FileUploaderAndDownloader;