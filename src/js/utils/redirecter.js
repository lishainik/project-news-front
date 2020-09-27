export default function redirecter(api, adress) {
  api.getMe()
    .then((res) => {
      if (res.ok) {
        return res;
      }
      return Promise.reject();
    })
    .catch((err) => {
      window.location.replace(adress);
      return err;
    });
}
