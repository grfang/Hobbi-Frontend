export const saveUserData = async (
  id: string,
  firstName: string,
  lastName: string,
  email: string
) => {
  try {
    // /signup
    const data = {
      user_id: id,
      first: firstName,
      last: lastName,
      email: email,
    };

    fetch("http://127.0.0.1:5000/signup", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((response_data) => {
        console.log(response_data);
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  } catch (error) {
    console.log(error);
    throw error;
  }
};
