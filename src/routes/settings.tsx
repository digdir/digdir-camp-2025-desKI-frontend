import type { ActionFunction } from 'react-router-dom';

export const clientAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const colorMode = formData.get('colorMode')?.toString();
  
  if (colorMode) {
    localStorage.setItem('settings', JSON.stringify({ colorMode }));
  }
};

