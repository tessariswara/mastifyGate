const apiUrl = "http://178.128.107.238:8000/apiv1/control/allcontrollers";

export let cachedData: any;

export const fetchData = async (): Promise<any> => {
  if (cachedData) {
    return cachedData;
  }

  const deviceData = {
    // filter: {
    //   set_device_controller_id: true,
    //   device_controller_id: "901e8f81-bd07-4c2e-848f-b662597af4e9",
    //   set_reader_no: false,
    //   reader_no: "",
    //   set_reader_id: false,
    //   reader_id: "",
    //   id: "",
    // },
    // limit: 10,
    // page: 1,
    // order: "created_at",
    // sort: "DESC"

    
      filter: {
        set_device_id: false,
        device_id: "",
        set_device_type: false,
        device_type: "",
        set_name: false,
        name: "",
        set_manufacture: false,
        manufacture: "",
        set_ip_address: false,
        ip_address: ""
      },
      limit: 10,
      page: 1,
      order: "created_at",
      sort: "DESC"
    
};

  try {
    const response = await fetch(apiUrl,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deviceData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

    const data = await response.json();
    cachedData = data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
