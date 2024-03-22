import React, { useState, useEffect } from 'react';
import DeviceModal from './deviceModal';
import UpdateDevice from '../deviceApi/updateDevice';
import { deleteDeviceApi } from '../deviceApi/deleteDevice';

interface EditModalProps {
  apiUrl: string;
  apiPost: string;
  apiDelete: string;
  show: boolean;
  handleClose: () => void;
  serialNumberSelected,
  isDelete: boolean;
  deviceData: {
    serialNumber: string;
    deviceName: string;
    machineName: string;
    plant: string;
    description: string;
    uid: string;
  };
  setDeviceData: React.Dispatch<React.SetStateAction<{
    serialNumber: string;
    deviceName: string;
    machineName: string;
    plant: string;
    description: string;
    uid: string;
  }>>;
  showDeleteButton: boolean;
}

const DeviceEditModal: React.FC<EditModalProps> = ({
  apiUrl,
  apiPost,
  apiDelete,
  show,
  handleClose,
  deviceData,
  setDeviceData,
}) => {
  const isDelete = '';
  const handleConfirmation = (confirmed: boolean, isDelete) => {
    if (confirmed && isDelete === false) {
      deleteDeviceApi(apiDelete, deviceData.uid)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating device:', error);
      });
    } else if (confirmed) {
      UpdateDevice(apiPost + deviceData.uid, deviceData.serialNumber, deviceData.deviceName, deviceData.machineName, deviceData.plant, deviceData.description, deviceData.uid)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating device:', error);
      });
    } else {
      console.log('Update operation canceled.');
    }
  };

  return (
    <DeviceModal
      title="Edit Controller"
      titleButton='Update'
      apiUrl={apiUrl}
      apiPost={apiPost}
      apiDelete={apiDelete}
      show={show}
      handleClose={handleClose}
      handleConfirmation={handleConfirmation}
      deviceData={deviceData}
      setDeviceData={setDeviceData}
      showDeleteButton={true}
      isEdit={true}
      isDelete={isDelete}
    />

  );
};

export default DeviceEditModal;
