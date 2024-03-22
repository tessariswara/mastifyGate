import React, { useState, useEffect } from 'react';
import DeviceModalConfirm from './deviceModalConfirm';
import Select from 'react-select';
import '../../../styles/device.css';
import { deleteDeviceApi } from '../deviceApi/deleteDevice';
import "../../../styles/device.css"
import DeviceEditModal from './deviceEditModal';
import { mappedData, MappedDataItem } from '../deviceTable';
import { tenData, TenDataItem } from '../../device/deviceTable';


interface ModalProps {
  title: string;
  titleButton: string;
  apiUrl: string;
  apiPost: string;
  apiDelete: string;
  show: boolean;
  showDeleteButton: boolean;
  handleClose: () => void;
  handleConfirmation: (confirmed: boolean) => void;
  isEdit,
  deviceData: {
    serialNumber: string;
    deviceName: string;
    machineName: string;
    plant: string;
    description: string;
  };
  setDeviceData: React.Dispatch<React.SetStateAction<{
    serialNumber: string;
    deviceName: string;
    machineName: string;
    plant: string;
    description: string;
  }>>;
}

const DeviceModal: React.FC<ModalProps> = ({
  title,
  titleButton,
  apiUrl,
  apiPost,
  apiDelete,
  show,
  showDeleteButton,
  handleClose,
  handleConfirmation: propHandleConfirmation,
  deviceData,
  setDeviceData,
  isEdit,
}) => {
  const [isDelete, setIsDelete] = useState(true);
  const [serialNumberSelected, setSerialNumberSelected] = useState(false);
  const [resetData, setResetData] = useState(false);
  const [serialNumber, setSerialNumber] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [uid, setUid] = useState(''); 
  const [machineName, setMachineName] = useState('');
  const [plant, setPlant] = useState('');
  const [description, setDescription] = useState('');
  // const [readerID, setReaderID] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [error, setError] = useState<string>('');
  const [options, setOptions] = useState([]);
  const [plantOptions, setPlantOptions] = useState<string[]>([]);
  const [forceUpdateKey, setForceUpdateKey] = useState(0);

  const [readers, setReaders] = useState([]);
  const [readerID, setReaderID] = useState('');

  const handleAddReader = () => {
    if (readerID.trim() !== '') {
      const newReader = {
        reader_no: (readers.length + 1).toString(),
        reader_id: readerID
      };
      setReaders([...readers, newReader]);
      setReaderID('');

      console.log("ini readers", readers);
      console.log("ini read", readerID);
    }
  };

  const selectStyle = {
    control: (provided: any, state: { isDisabled: boolean }) => ({
      ...provided,
      fontSize: '16px',
      padding: '0 0 0 15px',
      border: 0,
      borderRadius: '10px',
      backgroundColor: state.isDisabled ? 'lightgray' : 'white',
      height: '62.33px',
    }),
    option: (provided: any) => ({
      ...provided,
    }),
  };


  useEffect(() => {
    const damn = async () => {
      try {
        const filteredLagi: MappedDataItem[] = (mappedData || []).map((item) =>  ({
          ...item,
          value: item.device_controller_id,
          label: item.device_controller_id,
        }));
        setDeviceData(filteredLagi);
      } catch (error) {
        console.error('Gagal menerima informasi : ', error);
      }
    };

    damn();
  }, [mappedData,resetData]);


  const handleCombinedChange = selectedOption => {
    handleSelectChange(selectedOption);
  };

  const dataFiltered = deviceData && deviceData.length > 0 ? deviceData.filter((item, index, self) =>
  index === self.findIndex((t) => (
    t.value === item.value && t.label === item.label
  ))
) : [];

  const handleSelectChange = (selectDevice) => {
    const deviceID = selectDevice.value;
    const deviceSelected = deviceData.find((item) => item.device_controller_id === deviceID);

    if (deviceSelected) {
      setSerialNumberSelected(true);
      setSerialNumber(deviceID);
      setDeviceName(deviceSelected.device_controller_type || '');
      setMachineName(deviceSelected.name || '');
      setPlant(deviceSelected.manufacture || '');
      setUid(deviceSelected.id || '');
      setReaderID(deviceSelected.reader_id || '');
      setDescription(deviceSelected.ip_address || '');
    }
  };

  const forceUpdate = () => {
    setForceUpdateKey((prevKey) => prevKey + 1);
  };

  const handleSave = () => {
    if (serialNumber && deviceName && machineName && plant && description) {
      setDeviceData({
        serialNumber,
        deviceName,
        machineName,
        plant,
        description,
        readerID,
        uid,
      });
      setShowConfirmationModal(true);
      setError('');
    } else {
      setError('**Please fill all input forms');
    }
  };

  const handleDelete = async () => {
    if (serialNumber && deviceName && machineName && plant && description) {
      setDeviceData({
        serialNumber,
        deviceName,
        machineName,
        plant,
        description,
        readerID,
        uid,
      });
      setIsDelete(false)
      setShowConfirmationModal(true);
    } else {
      setError('**Please fill all input forms');
    }
  };

  const handleConfirmation = (confirmed: boolean, isDelete) => {
    setShowConfirmationModal(false);
    setResetData(!resetData);
    if (confirmed) {
      console.log('Data saved successfully!');
      propHandleConfirmation(true,isDelete);
    } else {
      console.log('Save operation canceled.');
      propHandleConfirmation(false);
    }
    setIsDelete(true);
  };

  const resetForm = () => {
    setSerialNumber('');
    setDeviceName('');
    setMachineName('');
    setPlant('');
    setDescription('');
    setError('');
    setReaderID('');
    setUid('');
    setSerialNumberSelected(false);
  };

  useEffect(() => {
    if (show) {
      resetForm();
    }
  }, [show]);

  return (
    <div key={forceUpdateKey}>
      <div className={`modal ${show ? 'visible' : 'hidden'} scrollable-modal`}>
        <div className="modal-content">
          <div className="modal-header">
            <h1>{title}</h1>
          </div>

          <div className="modal-colmn">
            <label>Device Controller ID</label>
            {isEdit ? (
                <Select
                styles={selectStyle}
                placeholder="Select Device Controller ID..."
                value={serialNumber !== '' ? { value: serialNumber, label: serialNumber } : null}
                onChange={handleCombinedChange}
                options={dataFiltered}
              />
            ) : (
                <input
                className='joss'
                type="text"
                placeholder="Enter Device Controller ID"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
              />
            )}
          </div>

          <div className="modal-column">
            <label>ID</label>
            <input
              type="text"
              placeholder="ID"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              disabled={isEdit && !serialNumberSelected}
            />
          </div>

          <div className="modal-column">
            <label>Device Controller Type</label>
            <input
              type="text"
              placeholder="Device Controller Type"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              disabled={isEdit && !serialNumberSelected}
            />
          </div>

          <div className="modal-column">
            <label>Controller Name</label>
            <input
              type="text"
              placeholder="Enter Controller Name"
              value={machineName}
              onChange={(e) => setMachineName(e.target.value)}
              disabled={isEdit && !serialNumberSelected}
            />
          </div>

        <div className="modal-column">
            <label>Manufacture</label>
            <input
              type="text"
              placeholder="Enter Manufacture"
              value={plant}
              onChange={(e) => setPlant(e.target.value)}
              disabled={isEdit && !serialNumberSelected}
            />
          </div>

          <div className="modal-column">
            <label>IP Address</label>
            <input
              type="text"
              placeholder="Enter IP Address"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isEdit && !serialNumberSelected}
            />
            {error && <p className='error'>{error}</p>}
          </div>

          <div>
            <div className="modal-column">
              <label>Reader ID</label>
              <input
                type="text"
                placeholder="Reader ID"
                value={readerID}
                onChange={(e) => setReaderID(e.target.value)}
              />
            </div>
            <button onClick={handleAddReader}>Add Reader</button>
            {readers.map((reader, index) => (
              <div key={index}>
                <p>Reader No: {reader.reader_no}</p>
                <p>Reader ID: {reader.reader_id}</p>
              </div>
            ))}
            <button onClick={() => setReaderID(readers)}>Save Readers</button>
          </div>

          <div className="modal-cta">
            <button className="button cancel" onClick={handleClose}>
              Cancel
            </button>
            <button className="button" onClick={handleSave}>
              {titleButton}
            </button>
            {showDeleteButton && (
              <button className="button delete" onClick={handleDelete}>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      <DeviceModalConfirm
        show={showConfirmationModal}
        handleConfirmation={handleConfirmation}
        isDelete={isDelete}
      />

    </div>
  );
};
export default DeviceModal;
