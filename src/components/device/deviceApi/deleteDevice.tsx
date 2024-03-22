export const deleteDeviceApi = async (apiDelete: string, uid: string) => {
    const query = `${uid}`;
    const url = `${apiDelete}${query}`;

    try {
      const response = await fetch(url, { method: 'DELETE' });
  
      if (!response.ok) {
        throw new Error(`Error deleting device: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error deleting device: ${error.message}`);
    }
  };