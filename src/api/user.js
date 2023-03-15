import axios from ".";

/**
 * SAMPLE FUNCTION: Create a new user on the database
 * @param {any} user User to be added to API's database
 * @returns { Promise<{user: any, error: string | null}> } user
 */
export const createProfile = async (user) => {
  try {
    const { data } = await axios.get("URL-TO-API", {
      data: user,
    });
    return Promise.resolve({
      user: data,
      error: null,
    });
  } catch (e) {
    return Promise.reject({
      error: e.message,
      user: null,
    });
  }
};
