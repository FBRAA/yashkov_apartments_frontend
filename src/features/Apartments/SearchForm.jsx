/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import {
  Form, Input, Button, Radio,
} from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import StyledForm from './StyledForm';

const FormItemGroup = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-content: center;
  @media (max-width: 815px) {
    width: 100%;
    &.buttons{
      justify-content: space-between;
    }
  }
`
const Label = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  height: 100%;
  padding-right: 0.5rem ;
  @media (max-width: 815px) {
    margin-right: auto;
  }
`

const SearchForm = ({ setQueryParams, setPageState }) => {
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setQueryParams(values)
    setPageState({
      page: 1,
      pageSize: 8,
    })
  };

  return (
    <StyledForm
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
      layout="inline"
    >
      <FormItemGroup>
        <Label>Этаж:
        </Label>
        <Form.Item
          name="floorMin"
        >
          <Input
            placeholder="От"
          />
        </Form.Item>
        <Form.Item
          name="floorMax"
        >
          <Input
            placeholder="До"
          />

        </Form.Item>
      </FormItemGroup>
      <FormItemGroup>
        <Label>Комнатность:
        </Label>
        <Form.Item
          name="rooms"
        >
          <Radio.Group>
            <Radio.Button value="1">1</Radio.Button>
            <Radio.Button value="2">2</Radio.Button>
            <Radio.Button value="3">3</Radio.Button>
            <Radio.Button value="4">4</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </FormItemGroup>

      {expand && (
        <>
          <FormItemGroup>
            <Label>Стоимость, ₽:
            </Label>
            <Form.Item
              name="priceMin"
            >
              <Input
                className='price-input'
                placeholder="От"
              />
            </Form.Item>
            <Form.Item
              name="priceMax"
            >
              <Input
                className='price-input'
                placeholder="До"
              />
            </Form.Item>
          </FormItemGroup>
          <FormItemGroup>
            <Label>Общая площадь, м²:
            </Label>
            <Form.Item
              name="area_totalMin"
            >
              <Input
                placeholder="От"
              />
            </Form.Item>
            <Form.Item
              name="area_totalMax"
            >
              <Input
                placeholder="До"
              />
            </Form.Item>
          </FormItemGroup>
        </>
      )}
      <FormItemGroup
        className='buttons'
      >
        <Button
          className='search-button'
          type="primary"
          htmlType="submit"
          style={{
            borderColor: 'grey',
            background: 'grey',
            width: 'auto',
          }}
        >
          Поиск
        </Button>
        <Button
          style={{
            margin: '0 8px',
            width: 'auto',
          }}
          onClick={() => {
            form.resetFields();
            onFinish()
          }}
        >
          Сброс
        </Button>
        <Button
          style={{
            fontSize: 12,
          }}
          onClick={() => {
            setExpand(!expand);
          }}
        >
          {expand ? <LeftOutlined /> : <RightOutlined />} Доп. фильтры
        </Button>
      </FormItemGroup>
    </StyledForm>
  );
};

export default SearchForm
