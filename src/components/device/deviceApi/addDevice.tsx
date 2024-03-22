const AddDevice = (
  apiPost: string,
  serialNumber: string,
  deviceName: string,
  machineName: string,
  plant: string,
  description: string,
  readerID: string,
  uid: string,
  ) => {
    const deviceData = {
      device_controller_id: serialNumber,
      device_controller_type: deviceName,
      name: machineName,
      manufacture: plant,
      ip_address: description,
      reader: readerID,
      id: uid,
    };
  
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([deviceData]),
    };
  
    return fetch(apiPost, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Response dari server setelah POST:", data.message);
        console.log(deviceData)
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log(deviceData)
      });
  };
  
  export default AddDevice;
  