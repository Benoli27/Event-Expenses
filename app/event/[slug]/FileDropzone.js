'use client';

import { useRef, useState } from 'react';
import { Icon } from '@/design-system/components/brand/Icon.jsx';
import { Button } from '@/design-system/components/core/Button.jsx';

export function FileDropzone({ name = 'files', accept, multiple = true, error }) {
  const inputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [fileNames, setFileNames] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  function setFilesFromList(fileList) {
    if (inputRef.current) inputRef.current.files = fileList;
    setFileNames(Array.from(fileList).map((f) => f.name));
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) setFilesFromList(e.dataTransfer.files);
  }

  function handleChange(e) {
    setFileNames(Array.from(e.target.files || []).map((f) => f.name));
  }

  function handleCameraCapture(e) {
    /* This input has its own separate FileList — mirror it into the real
       "files" input so the form only ever submits from one source. */
    if (e.target.files?.length) setFilesFromList(e.target.files);
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{
          border: `var(--border-width-thick) dashed ${
            error ? 'var(--scout-red)' : dragOver ? 'var(--scout-purple)' : 'var(--ink-200)'
          }`,
          borderRadius: 'var(--radius-sm)',
          background: dragOver ? 'var(--purple-05)' : 'var(--surface-subtle)',
          padding: 'var(--space-6) var(--space-4)',
          textAlign: 'center',
          cursor: 'pointer',
          transition:
            'background var(--duration-base) var(--ease-standard), border-color var(--duration-base) var(--ease-standard)',
        }}
      >
        <Icon
          name="upload"
          size={28}
          style={{ margin: '0 auto var(--space-2)', display: 'block' }}
        />
        <div style={{ fontWeight: 'var(--weight-bold)', fontSize: 15, color: 'var(--text-heading)' }}>
          Drag and drop a receipt here, or tap to browse files
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
          Photos or PDFs — you can add more than one
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => cameraInputRef.current?.click()}
        style={{ display: 'flex', margin: 'var(--space-3) auto 0' }}
      >
        Or take a photo
      </Button>

      <input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          opacity: 0,
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
        }}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCameraCapture}
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          opacity: 0,
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
        }}
      />

      {fileNames.length > 0 ? (
        <ul style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-body)', fontWeight: 'var(--weight-bold)', color: 'var(--text-body)', paddingLeft: 18 }}>
          {fileNames.map((n, i) => (
            <li key={`${n}-${i}`}>{n}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
