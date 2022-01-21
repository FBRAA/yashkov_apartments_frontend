/* eslint-disable consistent-return */
import { message } from 'antd';
import { BASE_URL } from '../utils/constants';

const fetchData = async (url) => {
  try {
    const response = await fetch(url || BASE_URL, {
      mode: 'cors',
      method: 'GET',
    });
    if (!response.ok) message.error(`Ошибка в ответе от сервера: ${response.status}  ${response.statusText}`)
    if (response.ok) {
      const data = await response.json();
      return data
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    message.error(error)
  }
};

export default fetchData
