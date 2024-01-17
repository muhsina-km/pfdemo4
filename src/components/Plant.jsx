import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './Main.css';
import { Button, Card, Form, Input, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const { Option } = Select;

const Plant = () => {

  const [form] = Form.useForm();
  
  var [inputs, setInputs] = useState({
    "plantid": '', "plantname": '', "planttype": '', "color": '', "size": '',
    "price": '', "description": '', "stock": '', "status": 'ACTIVE'
  })

  var [planttype, setPlanttype] = useState([]);
  var [selectedimage, setSelectedimage] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(inputs)
    axios.get ('http://localhost:3005/pview')
      .then(response => {
        console.log(response.data)
        setPlanttype(response.data)
      })
      .catch(err => console.log(err))
  }, [])

  const inputHandler = (event) => {
    const { name, value } = event.target
    setInputs((inputs) => ({ ...inputs, [name]: value }))
    console.log(inputs)
  }

  const handleImage = (info) => {
    console.log(info.file);
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
    setSelectedimage(info.file);
  };
  

  const savedata = (blabla) => {
    console.log(blabla)
    const formdata = new FormData();
    formdata.append('plantid', inputs.plantid);
    formdata.append('plantname', inputs.plantname);
    formdata.append('planttype', inputs.planttype);
    formdata.append('color', inputs.color);
    formdata.append('size', inputs.size);
    formdata.append('price', inputs.price);
    formdata.append('description', inputs.description);
    formdata.append('stock', inputs.stock);
    formdata.append('status', inputs.status);
  
    // Append the file properly
    if (selectedimage) {
      formdata.append('plantphoto', selectedimage);
    }
  
    console.log(formdata);
  
    fetch('http://localhost:3005/pnew', {
      method: 'post',
      body: formdata,
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Record Saved');
      })
      .catch((err) => {
        console.log(err);
      });
    navigate('/plantdetailsview');
  };
  

  return (

    <div className='background-4'>

      <Navbar/>
      <Sidebar/>

      <h1 style={{ textAlign: 'center', marginTop: '12px', marginLeft: '220px' }}>
        Plant Details
      </h1>

      <Card 
      className='background-4'
      bordered={true}
      style={{ 
        width: 500 ,
        height: 800,
        marginTop: "-5%",
        marginBottom: "2%",
        marginLeft: "40%",
        }}>

        <Form
          form={form}
          onFinish={savedata}
          initialValues={inputs}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 22 }}
          colon={false}
        >
          <Form.Item 
          label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
          Plant Code </span>}
          name="plantid">
            <Input 
            value={inputs.plantid}
            onChange={inputHandler} />
          </Form.Item>

          <Form.Item
          label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
          Plant Name </span>} 
          name="plantname">
            <Input 
            value={inputs.plantname}
            onChange={inputHandler} />
          </Form.Item>

          <Form.Item
          label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
          Plant Type </span>}
          name="planttype">
            <Select 
             value={inputs.planttype}
             onChange={(value) => setInputs((prevInputs) => ({ ...prevInputs, planttype: value }))}>
              {planttype.map((value) => (
                <Option key={value._id} value={value._id}>
                  {value.Pname}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item 
          label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
          Color </span>}
          name="color">
            <Input 
            value={inputs.color}
            onChange={inputHandler} />
          </Form.Item>

          <Form.Item
          label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
          Size </span>}
          name="size">
            <Input 
            value={inputs.size}
            onChange={inputHandler} />
          </Form.Item>

          <Form.Item 
          label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
          Price </span>}
          name="price">
            <Input type="number" 
            value={inputs.price}
            onChange={inputHandler} />
          </Form.Item>

          <Form.Item 
          label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
          Description </span>}
          name="description">
            <Input.TextArea rows={4} 
            value={inputs.description}
            onChange={inputHandler} />
          </Form.Item>

          <Form.Item
          label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
          Stock </span>}
          name="stock">
            <Input type="number" 
            value={inputs.stock}
            onChange={inputHandler} />
          </Form.Item>

          <Form.Item
          label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
          Image </span>}
          name="plantphoto">
            <Upload
            name='plantphoto'
              customRequest={() => {}} // You need to implement the file upload logic here
              onChange={handleImage}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item
          label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
          Status </span>}
          name="status">
            <Select 
            value={inputs.status}
            onChange={(value) => setInputs((prevInputs) => ({ ...prevInputs, status: value }))}>
              <Option value="ACTIVE">ACTIVE</Option>
              <Option value="INACTIVE">INACTIVE</Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
            <Button htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Plant