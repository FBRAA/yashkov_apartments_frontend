import Form from 'antd/lib/form/Form';
import styled from 'styled-components';

export default styled(Form)`
  align-content: center;
  width: 100%;
  height: auto;
  justify-content: center;
  flex-wrap: nowrap;
  .ant-input {
      width: 3rem;
      text-align: center;
      &.price-input {
        width: 5.5rem;
      }
    }
  .ant-form-item {
    margin-bottom: 0px;
  }
  /* Стилизация по выборочным стилям основана
  на недостаточной специфичности правил,
  указанных в родительских компонентах с селекторами.
  Библиотека компонентов предусматривает настройку
  цветовой схемы, она требует работы в
  листах стилей, что отходит от концепции "CSS-in-JS" и
  что в моменте казалось избыточным и долгим. */
  ::selection {
    background: black;
  }
  .ant-radio-button-wrapper:hover {
    color: black;
  }
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    color: black;
    border-color: black;
  }
  .ant-radio-button-wrapper-checked:not([class*=' ant-radio-button-wrapper-disabled']).ant-radio-button-wrapper:first-child {
    border-color: black;
  }
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover::before {
    background-color: black;
  }
  .ant-input:hover {
    border-color: black;
  }
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)::before {
    background-color: black;
  }
  .ant-btn:hover, .ant-btn:focus {
    color: black;
    border-color: black;
  }

  @media (max-width: 815px) {
    flex-flow: row wrap;

    .ant-form-item-control {
      flex-direction: row;
    }
    .ant-btn {
      height: 3rem;
      padding: 0rem 1rem 0rem 1rem;
    }
    .ant-form-item {
      margin-bottom: 0px;
      flex-wrap: nowrap;
      margin-right: 0;
    }
    .ant-input {
      width: 11rem;
      margin-bottom: 1rem;
      &.price-input {
        width: 11rem;
      }
    }
    .ant-radio-button-wrapper {
      text-align:center;
      width: 5.5rem;
      margin-bottom: 1rem;
      justify-content: center;
    }
    .search-button {
      margin-right: 1.5rem;
    }
  } 
  `;
