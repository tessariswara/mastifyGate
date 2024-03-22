const tenantUrl = "http://178.128.107.238:8000/apiv1/reader/allreaders";

export let tenantData: any;

export const fetchTenant = async (): Promise<any> => {
  if (tenantData) {
    return tenantData;
  }

  const tenanData = {
    filter: {
      set_device_controller_id: true,
      device_controller_id: "901e8f81-bd07-4c2e-848f-b662597af4e9",
      set_reader_no: false,
      reader_no: "",
      set_reader_id: false,
      reader_id: ""
    },
    limit: 10,
    page: 1,
    order: "created_at",
    sort: "DESC"
  };

  try {
    const response = await fetch(tenantUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tenanData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    tenantData = data.data;
    console.log("reader:", tenantData)
    return tenantData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
