'use client';

import type { FC } from 'react';

import { Copy, Server } from 'lucide-react';

import { copyToClipboard } from '@/lib/utils';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import type { BadgeProps } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ApiAlertProps {
  title: string;
  description: string;
  variant: 'public' | 'admin';
}

const textMap: Record<ApiAlertProps['variant'], string> = {
  public: 'Public',
  admin: 'Admin'
};

const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
  public: 'secondary',
  admin: 'destructive'
};

const ApiAlert: FC<ApiAlertProps> = ({
  title,
  description,
  variant = 'public'
}) => {
  return (
    <Alert>
      <Server className='h-4 w-4' />

      <AlertTitle className='flex items-center gap-x-2'>
        {title} <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>

      <AlertDescription className='mt-4 flex-between'>
        <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
          {description}
        </code>

        <Button
          variant='outline'
          size='icon'
          onClick={() => copyToClipboard(description, 'API Route')}
        >
          <Copy className='h-4 w-4' />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
