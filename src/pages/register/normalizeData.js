const normalizeData = (inputsValue, isAdmin) => {
  return {
    name: {
      first: inputsValue.first,
      middle: inputsValue.middle,
      last: inputsValue.last,
    },
    phone: inputsValue.phone,
    email: inputsValue.email,
    password: inputsValue.password,
    image: {
      url: inputsValue.url,
      alt: inputsValue.alt,
    },
    address: {
      state: inputsValue.state,
      country: inputsValue.country,
      city: inputsValue.city,
      street: inputsValue.street,
      houseNumber: inputsValue.houseNumber,
      zip: +inputsValue.zip,
    },
    isBusiness: inputsValue.isBusiness,
    isAdmin: isAdmin,
    email: inputsValue.email,
  };
};
export { normalizeData };
