const UpdateDevice = (
  apiPost: string,
  serialNumber: string,
  deviceName: string,
  machineName: string,
  plant: string,
  description: string,
  uid: string
) => {

  const deviceData = {
    device_controller_id: serialNumber,
    device_controller_type: deviceName,
    name: machineName,
    manufacture: plant,
    ip_address: description,
    id: uid,
  };

  console.log("ini dia sijali jali", deviceData)
  const requestOptions = {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deviceData),
  };


  return fetch(apiPost, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log("Response dari server", data.message);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default UpdateDevice;
