import React, {ChangeEvent, useCallback, useRef} from 'react';

import './UploadPhotoField.styles.scss';

interface IUploadPhotoFieldProps {
  name: string;
  value: File | null;
  onChange: (file: File) => void;
  hint?: string;
  error?: string;
}

export default function UploadPhotoField({name, value, onChange, hint, error}: IUploadPhotoFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, [])

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.currentTarget.files?.[0];
    if (fileUploaded) {
      onChange(fileUploaded);
    }
  }, [])

  return (
    <div className="uploadPhotoField">
      <div className="uploadPhotoFieldWrapper">
        <button onClick={handleClick}>
          Upload
        </button>

        <label htmlFor={name}>
          <input
            id={name}
            type="file"
            name={name}
            onChange={handleChange}
            ref={inputRef}
            accept="image/png, image/jpeg"
          />
          <div className={value?.name ? "selectedFile" : "selectedFile withPlaceholder"}>
            {value?.name || "Upload your photo"}
          </div>
        </label>
      </div>

      {hint && <p className="hint">{hint}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
