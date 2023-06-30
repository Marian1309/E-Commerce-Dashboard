'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import { ImagePlus, Trash } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

import { Button } from './button';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onImageUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className='mb-4 flex items-center gap-4'>
        {value.map((url) => (
          <div
            key={url}
            className='relative h-[200px] w-[200px] overflow-hidden rounded-md'
          >
            <div className='absolute right-2 top-2 z-10'>
              <Button
                className=''
                onClick={() => onRemove(url)}
                variant='destructive'
                size='icon'
              >
                <Trash className='h-4 w-4' />
              </Button>
            </div>

            <Image fill className='object-cover' alt='image' src={url} />
          </div>
        ))}
      </div>

      <CldUploadWidget onUpload={onImageUpload} uploadPreset='iowm6eug'>
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button disabled={disabled} variant='secondary' onClick={onClick}>
              <ImagePlus className='mr-2 h-4 w-4' />
            </Button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default ImageUpload;
