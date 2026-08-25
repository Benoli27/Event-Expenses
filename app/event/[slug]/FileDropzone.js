'use client';

import { useRef, useState } from 'react';
import { Icon } from '@/design-system/components/brand/Icon.jsx';

export function FileDropzone({ name = 'files', accept, multiple = true, error }) {
  const inputRef = useRef(null);
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
          Drag and drop a receipt here, or tap to upload
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
          Photos or PDFs — you can add more than one
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        capture="environment"
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
      {fileNames.length > 0 ? (
        <ul style={{ marginTop: 'var(--space-2)', fontSize: 13, color: 'var(--text-body)', paddingLeft: 18 }}>
          {fileNames.map((n, i) => (
            <li key={`${n}-${i}`}>{n}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
