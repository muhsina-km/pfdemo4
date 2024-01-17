import axios from 'axios';
import { useEffect, useState } from 'react'
import Plantdetailsedit from './Plantdetailsedit';
import {Buffer} from 'buffer'
import React from 'react';
import { Table, Popconfirm, Space, Button ,Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Navbar from './Navbar';
import Sidebar from './Sidebar';


const { Column } = Table;

const Plantdetailsview = () => {
    
    var [Plantdetailsview, setPlantdetailsview] = useState([])
    var [selected, setSelected] = useState();
    var [update, setUpdate] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3005/pview/')
          .then(response => {
            console.log(response.data);
            setPlantdetailsview(response.data);
          })
          .catch(err => console.log(err));
      }, []);
    
      const deletevalues = (id) => {
  console.log("Deleting", id);
  axios.put(`http://localhost:3005/updatestatus/${id}`)
    .then(() => {
      console.log("Deleted successfully");
      alert("DELETED");
      setPlantdetailsview(prevDetails =>
        prevDetails.map(item =>
          item._id === id ? { ...item, status: "INACTIVE" } : item
        )
      );
    })
    .catch(error => {
      console.error("Error deleting record:", error);
      alert("Error deleting record. Please check console for details.");
    });
};
    
      const updatevalues = (value) => {
        console.log("Updating", value);
        setSelected(value);
        setUpdate(true);
      };

    var result=

    <div className='background-3'>
 
      <Navbar/>

      <h1 style={{ textAlign: 'center', marginTop: '100px', marginLeft: '100px' }}>
        Plant Details View
      </h1>

    <Card 
      className='background-2'
      bordered={true}
      style={{ 
        marginTop: "-0.1%",
        marginBottom: "2%",
        }}>

    <Table dataSource={Plantdetailsview} bordered>
      <Column title="Plant ID" dataIndex="plantid" key="plantid" />
      <Column title="Plant Name" dataIndex="plantname" key="plantname" />
      <Column title="Plant Type" dataIndex="planttype" key="planttype" />
      <Column title="Color" dataIndex="color" key="color" />
      <Column title="Size" dataIndex="size" key="size" />
      <Column title="Price" dataIndex="price" key="price" />
      <Column title="Description" dataIndex="description" key="description" />
      <Column title="Stock" dataIndex="stock" key="stock" />
      <Column
          title="Image"
          dataIndex="plantphoto"
          key="plantphoto"
          render={(text, record) => (
            <img
              src={`data:image/jpeg;base64, ${Buffer.from(record.plantphoto.data).toString('base64')}`}
              alt="Error"
              width="50"
              height="50"
            />
          )}
        />
        <Column title="Status" dataIndex="status" key="status" />
        <Column
          title="Actions"
          key="actions"
          render={(text, record) => (
            <Space size="middle">
              <Button type="primary" icon={<EditOutlined />} onClick={() => updatevalues(record)}>
                Edit
              </Button>
              <Popconfirm
                title="Are you sure to delete this plant?"
                onConfirm={() => deletevalues(record._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger icon={<DeleteOutlined />}>
                Delete
                </Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
      </Card>
    </div>

if(update){
    result=<Plantdetailsedit data={selected} method='put'/>
}

return (result)
}

 

export default Plantdetailsview