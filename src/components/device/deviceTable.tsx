import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { fetchData, cachedData } from "./deviceApi/hitApi";
import DeviceModal from "./deviceModal/deviceModal";


interface DeviceTableProps {
  apiUrl: string;
  searchText: string;
}
export interface MappedDataItem {
  id: string;
}

export let mappedData: MappedDataItem[] | undefined;

const DeviceTable: React.FC<DeviceTableProps> = ({searchText }) => {
  const [deviceData, setDeviceData] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const main = async () => {
    try {
      await fetchData();
      mappedData = [];
      cachedData.forEach(item => {
        if (item.reader && item.reader.length > 0) {
          item.reader.forEach(reader => {
            mappedData.push({
              ...item,
              did: item.id,
              reader_id: reader.reader_id
            });
          });
        } else {
          mappedData.push({
            ...item,
            did: item.id,
            reader_id: null
          });
        }
      });
      setDeviceData(mappedData);
    } catch (error) {
      console.error('Gagal menerima informasi : ', error);
    }
  }

  useEffect(() => {
    return () => main();
  }, []);

  const filteredData = deviceData.filter((row) =>
    Object.values(row).some(
      (value) => value && value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "No.",
      flex: 0.15,
    },
    {
      field: "device_controller_id",
      headerName: "Controller",
      flex: 0.45,
    },
    {
      field: "reader_id",
      headerName: "Reader",
      flex: 0.5,
    },
    {
      field: "did",
      headerName: "Device ID",
      flex: 0.5,
    },
  ];


    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: '1', justifyContent: "center", width: '100%'}}>
        {error ? (
          <div style={{display: 'flex', justifyContent: "center"}}>
            <p>{error}</p>
          </div>
        ) : (
          filteredData.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1  }}>
              <DataGrid
                rows={filteredData.map((row, index) => ({ ...row, id: index }))}
                columns={columns}
                pageSize={15}
              />
            </div>
          ) : (
            <div style={{display: 'flex', justifyContent: "center"}}>
              <p>Data tidak ditemukan</p>
            </div>
        )
      )}
        <DeviceModal
          mappedData={mappedData} 
        />
    </div>
    
  );
};

export default DeviceTable;
