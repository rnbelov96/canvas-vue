import axios from 'axios';
import getApiUrl from '../utils/get-api-url';

export default {
  async sendFormData(form) {
    const formData = new FormData(form);

    // for (const data of formData) {
    //   console.log(data)
    // }

    try {
      await axios({
        method: 'post',
        url: `${getApiUrl()}/ajax/send.php`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return true;
    } catch (error) {
      return false;
    }
  },
};
